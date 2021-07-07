import React from 'react';

import {
  useHistory, MemoryRouter, Route, Link, Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import useCurrentUser from '../hooks/useCurrentUser';

import { fetchPreview, loadUrl, setUrl } from '../redux/slice';

import { isEmpty, get } from '../utils';

export default function MainPage() {
  const history = useHistory();

  const { currentUser } = useCurrentUser();

  if (isEmpty(currentUser)) {
    history.push('/login');
  }

  const dispatch = useDispatch();

  const url = useSelector(get('url'));

  if (isEmpty(url)) {
    dispatch(loadUrl());
  }

  const preview = useSelector(get('preview'));

  if (url && isEmpty(preview)) {
    dispatch(fetchPreview());
  }

  const handleChangeUrl = (e) => {
    dispatch(setUrl(e.target.value));
  };

  const handleSearchUrl = () => {
    dispatch(fetchPreview());
  };

  return (
    <>
      <main>
        <MemoryRouter initialEntries={['/newlink']}>
          <ul>
            <li>
              <Link to="/newlink">newlink</Link>
            </li>
            <li>
              <Link to="/archive">archive</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/newlink">
              <form>
                <fieldset>
                  <label htmlFor="devlink-url">
                    url
                  </label>
                  <input
                    type="text"
                    id="devlink-url"
                    aria-label="devlink-url"
                    placeholder="URL을 입력해주세요"
                    name="url"
                    value={url || ''}
                    onChange={handleChangeUrl}
                  />
                  <button type="button" id="search-url" aria-label="search-url" onClick={handleSearchUrl}>
                    <i className="fa fa-search" />
                  </button>
                </fieldset>
                <fieldset>
                  <h3>preview</h3>
                  {preview
                    ? (
                      <>
                        <img
                          src={preview && preview.thumbnail}
                          alt="thumbnail"
                        />
                        <p>{preview && preview.title}</p>
                        <p>{preview && preview.url}</p>
                      </>
                    )
                    : (
                      <img
                        src="../../assets/images/preview_default.png"
                        alt="preview-default"
                      />
                    )}
                </fieldset>
                <fieldset>
                  <h3>comment</h3>
                </fieldset>
                <fieldset>
                  <h3>tags</h3>
                </fieldset>
                <button type="button">save a contents</button>
              </form>
            </Route>
            <Route path="/archive">
              <>
                <p>archive tab menu</p>
              </>
            </Route>
          </Switch>
        </MemoryRouter>
      </main>
    </>
  );
}
