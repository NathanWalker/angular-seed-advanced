import { t } from '../index';
t.describe('About', function () {

  t.be(async function () {
    return await browser.get('/about');
  });

  t.it('should have correct feature heading', async function () {
    let el = element(by.css('sd-about h2'));
    t.e(el.getText()).toEqual('Features');
  });
});
