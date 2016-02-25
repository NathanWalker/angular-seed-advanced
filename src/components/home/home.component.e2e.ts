import {t, selectDropdownByText} from '../../frameworks/test.framework/index';

t.describe('Home', function() {

  t.be(function() {
    browser.get('');
  });

  t.it('should have correct h2', function() {
      t.e(element(by.css('sd-app sd-home h2')).getText()).toEqual('I love technology');
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
  
  t.it('language switcher should change language', function() {
    t.e(element(by.css('sd-app sd-home h2')).getText()).toEqual('I love technology');
    selectDropdownByText('sd-app sd-toolbar lang-switcher select', 'French', 500);
    t.e(element(by.css('sd-app sd-home h2')).getText()).toEqual('Je adore la technologie');
    t.e(element(by.css('sd-app sd-home p')).getText())
      .toEqual(`Votre déploiement de angulaire 2 Seed avancée a parfaitement fonctionné! Cliquez environ (ci-dessus) pour obtenir votre récompense!`);
  });

});
