/* global chrome */
export const fetchUrl = (callback) => {
  if (process.env.NODE_ENV === 'production') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      callback(tabs[0].url);
    });
  } else {
    const currentTabUrl = 'https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html';
    setTimeout(() => {
      callback(currentTabUrl);
    }, 1000);
  }
};

export const temp = () => {};
