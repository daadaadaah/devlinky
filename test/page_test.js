Feature('Page');

Scenario('프로젝트 이름이 보인다.', (I) => {
  I.amOnPage('/');

  I.see('devlinky-chorome-extension');
});
