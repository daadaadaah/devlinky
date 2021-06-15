Feature('MainPage');

const currentUser = {
  uid: 'Uid1',
  githubId: 'daadaadaah',
  githubProfile: 'https://avatars1.githubusercontent.com/u/60481383?s=460&v=4',
  accessToken: {
    github: 'GITHUB_ACCESS_TOKEN',
    firebase: 'FIREBASE_ACCESS_TOKEN',
  },
};

Scenario('이전에 로그인한 기록이 있으면, 메인 페이지가 보인다.', async (I) => {
  I.amOnPage('/');

  await I.executeScript((setCurrentUser) => {
    localStorage.setItem('LAST_LOGIN_USER', JSON.stringify(setCurrentUser));
  }, currentUser);

  I.refreshPage();

  I.see('bookmark');
  I.see('list');
});

Scenario('이전에 로그인한 기록이 없으면, 로그인 페이지가 보인한다.', async (I) => {
  I.amOnPage('/');

  I.see('Github login');
});

Scenario('원하는 메뉴탭을 클릭할 수 있다', async (I) => {
  const menus = [
    {
      title: 'bookmark',
      contents: [
        'url',
        'preview',
        'comment',
        'tags',
        'save a contents',
      ],
    },
    {
      title: 'list',
      contents: [ // devlink 아이템 내용으로 수정 필요
        'list tab menu',
      ],
    },
  ];

  I.amOnPage('/');

  await I.executeScript((setCurrentUser) => {
    localStorage.setItem('LAST_LOGIN_USER', JSON.stringify(setCurrentUser));
  }, currentUser);

  I.refreshPage();

  menus.forEach((menu) => {
    I.click(menu.title);

    menu.contents.forEach((content) => {
      I.see(content);
    });
  });
});
