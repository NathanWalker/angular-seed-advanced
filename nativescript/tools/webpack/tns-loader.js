const fs = require('fs-extra');
const loaderUtils = require('loader-utils');;
const _ = require('lodash');
const template = _.template;

const htmlCssRegexp = /\.component\.(html|css)/;
const htmlCssReplaceStr = '.component.tns.\$1';
const componentRegexp = /\.component\.(ts|js)/;
const componentFactoryRegexp = /\.component\.ngfactory\.(ts|js)/;

const ng2TemplateUrlRegex = /templateUrl *:(.*)$/gm;
const ng2StyleUrlsRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
const ng2StringReplaceRegexp = /(['"])((?:[^\\]\\\1|.)*?)\1/g;
const ng2ModuleIdRegexp = /(moduleId *: *module\.id,)$/gm;

function replaceStringsWithRequires(string) {
  return string.replace(ng2StringReplaceRegexp, function (match, quote, url) {
    if (url.charAt(0) !== '.') {
      url = './' + url;
    }

    const tnsPath = url.replace(htmlCssRegexp, htmlCssReplaceStr);
    if (fs.existsSync(tnsPath)) {
      return 'require(\'' + tnsPath + '\')';
    }

    return 'require(\'' + url + '\')';
  });
}

function injectTemplateVariables(loaderContext, source) {
  // Inject template variables via lodash.template
  // Note: We only support the '<?= varname ?>' syntax (default matches and breaks on es6 string literals).
  const query = loaderUtils.getOptions(loaderContext);

  const tpl = template(source, {
    interpolate: /<%=([\s\S]+?)%>/g,
  });

  return tpl(query.data);
}

module.exports = function tnsLoader(source) {
  if (this.resourcePath.match(htmlCssRegexp)) {
    // If a tns-version of the html/css file exists, replace the source with the content of that file.
    const tnsPath = this.resourcePath.replace(htmlCssRegexp, htmlCssReplaceStr);
    if (fs.existsSync(tnsPath)) {
      const tnsSource = fs.readFileSync(tnsPath, 'UTF-8');
      source = 'module.exports = ' + JSON.stringify(tnsSource);
    }
  } else if (this.resourcePath.match(componentRegexp)) {
    // For ng2 components cnnvert:
    //  styleUrls = ['file1', ..., fileN] => styles = [require('file1'), ..., require('fileN')]
    //  templateUrl: 'file' => template: require('file')
    //
    // Removes moduleId
    const styleProperty = 'styles';
    const templateProperty = 'template';

    source = source.replace(ng2TemplateUrlRegex, function replaceTemplateUrl(match, url) {
      return templateProperty + ':' + replaceStringsWithRequires(url);
    })
    .replace(ng2StyleUrlsRegex, function replaceStyleUrls(match, urls) {
      return styleProperty + ':' + replaceStringsWithRequires(urls);
    })
    .replace(ng2ModuleIdRegexp, function moduleId(match, moduleId) {
      return '/* ' + moduleId + ' */';
    });
  } else if (this.resourcePath.match(componentFactoryRegexp)) {
    // TODO: should/could we do something with the NgFactory files?
  }

  return injectTemplateVariables(this, source);
};
