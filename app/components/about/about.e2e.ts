import {t} from '../../frameworks/test.framework/_providers';

t.describe('About', function() {

  t.be(function() {
    browser.get('/dist/dev/#/about');
  });

  t.it('should have an input', function() {
    t.e(element(by.css('app section about form input')).isPresent()).toEqual(true);
  });

  t.it('should have a list of computer scientists', function() {
    t.e(element(by.css('app section about ul')).getText()).toEqual('Dijkstra\nKnuth\nTuring\nHopper');
  });

  t.it('should add a name to the list using the form', function() {
    element(by.css('app section about form input')).sendKeys('Tim Berners-Lee');
    element(by.css('app section about form button')).click();
    t.e(element(by.css('app section about ul')).getText()).toEqual('Dijkstra\nKnuth\nTuring\nHopper\nTim Berners-Lee');
  });
  
  t.it('should contain a language switcher', function() {
    t.e(element(by.css('app section lang-switcher')).isPresent()).toEqual(true);
    t.e(element.all(by.css('app section lang-switcher option')).count()).toEqual(3);
  });
});
