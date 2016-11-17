import { t, selectDropdownByValue } from '../index';

t.describe('Home', function() {

  t.be(async function() {
    return await browser.get('/');
  });

  t.it('should have correct h2', async function() {
    var text = await element(by.css('sd-app sd-home h2')).getText();
    t.e(text).toEqual('I love technology!');
  });

  t.it('should have an input', function() {
    t.e(element(by.css('sd-app sd-home form input')).isPresent()).toEqual(true);
  });

  t.it('should have a list of computer scientists', function() {
    t.e(element(by.css('sd-app sd-home ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper');
  });

  t.it('should add a name to the list using the form', function() {
    element(by.css('sd-app sd-home form input')).sendKeys('Tim Berners-Lee');
    element(by.css('sd-app sd-home form button')).click();
    t.e(element(by.css('sd-app sd-home ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper\nTim Berners-Lee');
  });

  // this works in development, but travis ci has timing issue with it
  // disabled just so travis doesn't complain
  t.it('language switcher should change language', async function() {
    await selectDropdownByValue('sd-app sd-toolbar lang-switcher select', 'fr');

    t.e(element(by.css('sd-app sd-home h2')).getText()).toEqual(`J'adore la technologie !`);
    t.e(element(by.css('sd-app sd-home')).all(by.tagName('p')).first().getText())
      .toEqual(`En récompense, voici une liste de géniaux informaticiens :`);
  });

});
