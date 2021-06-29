/* global chrome */
export const fetchUrl = () => {
  let currentTabUrl = 'https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html';
  if (process.env.NODE_ENV === 'production') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      currentTabUrl = tabs[0].url;
    });
  }

  return currentTabUrl;
};

export const temp = () => {};
