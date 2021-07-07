/* eslint-disable react/no-array-index-key */
import React from 'react';

import {
  useHistory, MemoryRouter, Route, Link, Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import useCurrentUser from '../hooks/useCurrentUser';

import {
  fetchPreview, loadUrl, setUrl, setComment, setTags, loadAutoCompleteTags, resetAutoCompleteTags,
} from '../redux/slice';

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

  const comment = useSelector(get('comment'));

  const handleChangeComment = (e) => {
    dispatch(setComment(e.target.value));
  };

  const tags = useSelector(get('tags'));
  const autoCompleteTags = useSelector(get('autoCompleteTags'));

  const handleChangeTag = (e) => {
    const newTag = e.target.value.toUpperCase().trim();

    if (isEmpty(newTag)) {
      dispatch(resetAutoCompleteTags());
    } else {
      dispatch(loadAutoCompleteTags(newTag));
    }
  };

  const handleKeyDownEnter = (e) => {
    const newTag = e.target.value.trim();
    const ENTER = 13;

    if (e.keyCode === ENTER) {
      if (newTag && tags.indexOf(newTag) === -1) {
        dispatch(resetAutoCompleteTags());
        dispatch(setTags([...tags, newTag]));
        e.target.value = '';
      }
    }
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
                  <label htmlFor="devlink-comment">
                    comment
                  </label>
                  <input
                    type="text"
                    id="devlink-comment"
                    aria-label="devlink-comment"
                    placeholder="Comment를 입력해주세요"
                    name="comment"
                    value={comment || ''}
                    onChange={handleChangeComment}
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="devlink-tags">
                    tags
                  </label>
                  <TagInputWrapper>
                    <Tags>
                      {!isEmpty(tags) && tags.map((tag, index) => (
                        <TagText key={index}>
                          <span>{`#${tag}`}</span>
                          <span>[X]</span>
                        </TagText>
                      ))}
                      <TagInput>
                        <input
                          type="text"
                          id="devlink-tags"
                          aria-label="devlink-tags"
                          placeholder="tag 입력 후 enter를 입력해주세요"
                          name="tags"
                          autoComplete="off"
                          onChange={handleChangeTag}
                          onKeyDown={handleKeyDownEnter}
                        />
                      </TagInput>
                    </Tags>
                  </TagInputWrapper>
                  <AutoCompleteTagsWrapper>
                    <ul>
                      {!isEmpty(autoCompleteTags)
                      && autoCompleteTags.map((autoCompleteTag, index) => (
                        <li key={index}>
                          {`[v]${autoCompleteTag.name}`}
                        </li>
                      ))}
                    </ul>
                  </AutoCompleteTagsWrapper>
                </fieldset>
                <button type="button" id="btn-save">save a contents</button>
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

const AutoCompleteTagsWrapper = styled.div`
  ul {
    display: flex;
    flex-direction: row;
    background: white;
    li {
      list-style: none;
    }
  }
`;

const TagInputWrapper = styled.div`
  background: white;
  border: 1px solid #d6d6d6;
  border-radius: 2px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px 5px 0;

  input {
    border: none;
    width: 100%;
  }
`;

const Tags = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;

  li {
    align-items: center;
    border-radius: 2px;
    color: white;
    display: flex;
    font-weight: 300;
    list-style: none;
    margin-bottom: 1px;
    margin-right: 1px;
    padding: 1px 2px;
  }
`;

const TagText = styled.li`
  background: #85A3BF;
`;

const TagInput = styled.li`
  flex-grow: 1;
  padding: 0;
`;
