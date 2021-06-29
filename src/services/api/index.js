export const fetchUrlMetaData = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
  });

  const html = await response.text();

  const el = document.createElement('div');
  el.innerHTML = html;

  const title = el.querySelector('meta[property="og:title"]').getAttribute('content');
  const thumbnail = el.querySelector('meta[property="og:image"]').getAttribute('content');

  const preview = {
    url,
    title,
    thumbnail,
  };

  return preview;
};

export const temp = () => {};
