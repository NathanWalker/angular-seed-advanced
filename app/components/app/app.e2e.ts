import {t} from '../../frameworks/test.framework/_providers';
import {selectDropdownByText} from '../../frameworks/test.framework/e2e/dropdowns';

t.describe('App', function() {

  t.be(function() {
    browser.get('/dist/dev');
  });

  t.it('should have a title', function() {
    t.e(browser.getTitle()).toEqual('My Angular2 App');
  });

  t.it('should have <section>', function() {
    t.e(element(by.css('app section')).isPresent()).toEqual(true);
  });

  t.it('should have <nav>', function() {
    t.e(element(by.css('app section nav')).isPresent()).toEqual(true);
  });

  t.it('should have correct nav text for Home', function() {
    t.e(element(by.css('app section nav a:first-child')).getText()).toEqual('Home');
  });

  t.it('should have correct nav text for About', function() {
    t.e(element(by.css('app section nav a:last-child')).getText()).toEqual('About');
  });

  t.it('should have correct h1', function() {
    t.e(element(by.css('app section h1')).getText()).toEqual('Howdy!');
  });

  t.it('should contain a language switcher', function() {
    t.e(element(by.css('app section lang-switcher')).isPresent()).toEqual(true);
    t.e(element.all(by.css('app section lang-switcher option')).count()).toEqual(3);
  });

  t.it('language switcher should change language', function() {
    t.e(element(by.css('app section home h2')).getText()).toEqual('I love technology');
    selectDropdownByText(element(by.css('app section lang-switcher select')), 'French', 500);
    t.e(element(by.css('app section home h2')).getText()).toEqual('Je adore la technologie');
    t.e(element(by.css('app section h1')).getText()).toEqual('Bonjour!');
  });

});
