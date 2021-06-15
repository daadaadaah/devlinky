/* global chrome */
import React from 'react';

import {
  useHistory, MemoryRouter, Route, Link, Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import useCurrentUser from '../hooks/useCurrentUser';

import { setUrl } from '../redux/slice';

import { isEmpty, get } from '../utils';

export default function MainPage() {
  const history = useHistory();

  const { currentUser } = useCurrentUser();

  if (isEmpty(currentUser)) {
    history.push('/login');
  }

  const dispatch = useDispatch();

  const url = useSelector(get('url'));

  if (!url) {
    if (process.env.NODE_ENV !== 'production') {
      dispatch(setUrl('https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html'));
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        dispatch(setUrl(tabs[0].url));
      });
    }
  }

  const handleChange = () => {

  };

  const handleClick = () => {

  };

  return (
    <>
      <main>
        <MemoryRouter initialEntries={['/bookmark']}>
          <ul>
            <li>
              <Link to="/bookmark">bookmark</Link>
            </li>
            <li>
              <Link to="/list">list</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/bookmark">
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
                    onChange={handleChange}
                  />
                  <button type="button" aria-label="devlink-url" onClick={handleClick}><i className="fa fa-search" /></button>
                </fieldset>
                <>
                  <h3>preview</h3>
                  <img
                    src="../../assets/images/preview_default.png"
                    alt="preview-default"
                  />
                </>
                <>
                  <h3>comment</h3>
                </>
                <>
                  <h3>tags</h3>
                </>
                <button type="button">save a contents</button>
              </form>
            </Route>
            <Route path="/list">
              <>
                <p>list tab menu</p>
              </>
            </Route>
          </Switch>
        </MemoryRouter>
      </main>
    </>
  );
}
