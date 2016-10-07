import { t } from '../../frameworks/test/index';

declare var browser: any, element: any, by: any;

t.describe('About', function() {

  t.be(function () {
    browser.get('/about');
  });

  t.it('should have correct feature heading', function() {
    let el = element(by.css('sd-about h2'));
    t.e(el.getText()).toEqual('Features');
  });
});
