export const currentUser = {
  uid: 'Uid1',
  githubId: 'daadaadaah',
  githubProfile: 'https://avatars1.githubusercontent.com/u/60481383?s=460&v=4',
  accessToken: {
    github: 'GITHUB_ACCESS_TOKEN',
    firebase: 'FIREBASE_ACCESS_TOKEN',
  },
};

export const devlink = {
  url: 'https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html',
  title: '프론트엔드 개발환경의 이해: 웹팩(기본)',
  thumbnail: 'https://jeonghwan-kim.github.io/assets/imgs/me.jpg',
};

export const initialState = {
  currentUser: null,
  url: null,
  preview: null,
};

export const { url } = devlink;

export const preview = {
  url: devlink.url,
  title: devlink.title,
  thumbnail: devlink.thumbnail,
};
