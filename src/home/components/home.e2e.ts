import {t} from '../../frameworks/test.framework/_providers';
import {selectDropdownByText} from '../../frameworks/test.framework/e2e/dropdowns';

t.describe('Home', function() {

  t.be(function() {
    browser.get('/dist/dev');
  });

  t.it('should have correct h2', function() {
      t.e(element(by.css('app section home h2')).getText())
      .toEqual('I love technology');
  });

  t.it('should have correct success msg', function() {
      t.e(element(by.css('app section home p')).getText())
      .toEqual('Your deployment of Angular 2 Seed worked perfectly! Click about (above) to get your reward!');
  });
  
  t.it('language switcher should change language', function() {
    t.e(element(by.css('app section home h2')).getText()).toEqual('I love technology');
    selectDropdownByText(element(by.css('app section lang-switcher select')), 'French', 500);
    t.e(element(by.css('app section home h2')).getText()).toEqual('Je adore la technologie');
    t.e(element(by.css('app section home p')).getText())
      .toEqual(`Votre déploiement de angulaire 2 Seed avancée a parfaitement fonctionné! Cliquez environ (ci-dessus) pour obtenir votre récompense!`);
  });
});
