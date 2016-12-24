const fs = require('fs-extra');
const loaderUtils = require("loader-utils");;

const htmlCssRegexp = /\.component\.(html|css)/;
const htmlCssReplaceStr = '.component.tns.\$1';
const componentRegexp = /\.component\.(ts|js)/;
const componentFactoryRegexp = /\.component\.ngfactory\.(ts|js)/;

const templateUrlRegex = /templateUrl *:(.*)$/gm;
const stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
const stringRegex = /(['"])((?:[^\\]\\\1|.)*?)\1/g;
const moduleIdRegex = /(moduleId *: *module\.id,)$/gm;

function replaceStringsWithRequires(string) {
  return string.replace(stringRegex, function (match, quote, url) {
    if (url.charAt(0) !== ".") {
      url = "./" + url;
    }

    const tnsPath = url.replace(htmlCssRegexp, htmlCssReplaceStr);
    return "require('" + tnsPath + "')";
  });
}

module.exports = function tnsLoader(source) {
  if (this.resourcePath.match(htmlCssRegexp)) {
    const tnsPath = this.resourcePath.replace(htmlCssRegexp, htmlCssReplaceStr);
    if (fs.existsSync(tnsPath)) {
      const tnsSource = fs.readFileSync(tnsPath, 'UTF-8');
      source = 'module.exports = ' + JSON.stringify(tnsSource);
    }
  } else if (this.resourcePath.match(componentRegexp)) {
    const styleProperty = 'styles';
    const templateProperty = 'template';

    // console.log(source);
    source = source.replace(templateUrlRegex, function replaceTemplateUrl(match, url) {
      return templateProperty + ":" + replaceStringsWithRequires(url);
    })
    .replace(stylesRegex, function replaceStyleUrls(match, urls) {
      // replace: stylesUrl: ['./foo.css', "./baz.css", "./index.component.css"]
      // with: styles: [require('./foo.css'), require("./baz.css"), require("./index.component.css")]
      // or: styleUrls: [require('./foo.css'), require("./baz.css"), require("./index.component.css")]
      // if `keepUrl` query parameter is set to true.
      return styleProperty + ":" + replaceStringsWithRequires(urls);
    })
    .replace(moduleIdRegex, function moduleId(match, moduleId) {
      return '/* ' + moduleId + ' */';
    });

    // console.log(source);
  } else if (this.resourcePath.match(componentFactoryRegexp)) {
    // console.log(source);
  }

  return source;
};
