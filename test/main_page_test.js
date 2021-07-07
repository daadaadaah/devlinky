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

const devlink = {
  url: 'https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html',
  title: '프론트엔드 개발환경의 이해: 웹팩(기본)',
  thumbnail: 'https://jeonghwan-kim.github.io/assets/imgs/me.jpg',
  comment: 'Webpack 기본 지식 잘 나온 링크',
  tags: ['Webpack', '웹', '프론트앤드'],
};

Scenario('이전에 로그인한 기록이 있으면, 메인 페이지가 보인다.', async ({ I }) => {
  I.amOnPage('/');

  await I.executeScript((setCurrentUser) => {
    localStorage.setItem('LAST_LOGIN_USER', JSON.stringify(setCurrentUser));
  }, currentUser);

  I.refreshPage();

  I.see('bookmark');
  I.see('list');
});

Scenario('이전에 로그인한 기록이 없으면, 로그인 페이지가 보인한다.', async ({ I }) => {
  I.amOnPage('/');

  I.see('Github login');
});

Scenario('원하는 메뉴탭을 클릭할 수 있다', async ({ I }) => {
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

    if (menu.title === 'bookmark') {
      const previewDefaultImage = '../../assets/images/preview_default.png';
      I.waitForVisible({ xpath: `//img[@src='${previewDefaultImage}']` });
    }

    menu.contents.forEach((content) => {
      I.see(content);
    });
  });
});

Scenario('북마크 메뉴에서 url을 추가하면, 해당 url에 대한 정보를 미리 볼 수 있다', async ({ I }) => {
  I.amOnPage('/');

  await I.executeScript((setCurrentUser) => {
    localStorage.setItem('LAST_LOGIN_USER', JSON.stringify(setCurrentUser));
  }, currentUser);

  I.refreshPage();

  I.click('bookmark');

  I.see(devlink.url);
  I.see(devlink.title);
  I.waitForVisible({ xpath: `//img[@src='${devlink.thumbnail}']` });
});

Scenario('북마크 메뉴에서 개발링크를 저장할 수 있다', async ({ I }) => {
  I.amOnPage('/');

  await I.executeScript((setCurrentUser) => {
    localStorage.setItem('LAST_LOGIN_USER', JSON.stringify(setCurrentUser));
  }, currentUser);

  I.refreshPage();

  I.click('bookmark');

  I.see(devlink.url);
  I.see(devlink.title);
  I.waitForVisible({ xpath: `//img[@src='${devlink.thumbnail}']` });

  I.fillField('#devlink-comment', devlink.comment);

  devlink.tags.map((tag) => I.fillField('#devlink-tags', tag));

  I.click('#btn-save');
});
