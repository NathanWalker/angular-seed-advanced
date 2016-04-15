import {t} from '../../frameworks/test.framework/index';

t.describe('About', function() {

  t.be(function() {
    browser.get('about');
  });

  t.it('should have correct feature heading', function() {
      t.e(element(by.css('sd-app sd-about h2')).getText()).toEqual('Features');
  });
});
