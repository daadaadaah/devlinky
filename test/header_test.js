Feature('Header');

const logoImagePath = '../assets/images/logo-small.png';

Scenario('로고가 보인다.', (I) => {
  I.amOnPage('/');

  I.waitForVisible({ xpath: `//img[@src='${logoImagePath}']` });
});
