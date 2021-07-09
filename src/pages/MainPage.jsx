/* eslint-disable react/no-array-index-key */
import styled from '@emotion/styled';

import React from 'react';

import {
  useHistory, MemoryRouter, Route, Link, Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import style from '../styles/designSystem';

import { colors, font } from '../styles/commom';

import useCurrentUser from '../hooks/useCurrentUser';

import {
  fetchPreview,
  loadUrl,
  setUrl,
  setComment,
  setTags,
  loadAutoCompleteTags,
  resetAutoCompleteTags,
  submitDevlink,
  setSelectTabMenu,
} from '../redux/slice';

import { isEmpty, get } from '../utils';

export default function MainPage() {
  const history = useHistory();

  const { currentUser } = useCurrentUser();

  if (isEmpty(currentUser)) {
    history.push('/login');
  }

  const dispatch = useDispatch();

  const selectTabMenu = useSelector(get('selectTabMenu'));

  const handleClickTabMenu = (e) => {
    const newSelectTabMenu = e.target.text;
    dispatch(setSelectTabMenu(newSelectTabMenu));
  };

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

  const handleClickSave = () => {
    if (preview && comment && !isEmpty(tags)) {
      dispatch(submitDevlink());
    }
    // TODO : 디자인 시안 나오면, 추가 구현하기 + useRef 공부 후 없는 곳 포커스
  };

  return (
    <>
      <MemoryRouter initialEntries={['/newlink']}>
        <TabMenus selectTabMenu={selectTabMenu}>
          <li>
            <Link to="/newlink" onClick={handleClickTabMenu}>newlink</Link>
          </li>
          <li>
            <Link to="/archive" onClick={handleClickTabMenu}>archive</Link>
          </li>
        </TabMenus>
        <Layout>
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
                <button type="button" id="btn-save" onClick={handleClickSave}>Save a contents</button>
              </form>
            </Route>
            <Route path="/archive">
              <>
                <p>archive tab menu</p>
              </>
            </Route>
          </Switch>
        </Layout>
      </MemoryRouter>
    </>
  );
}

const TabMenus = styled.ul`  
  margin-top: 30px;

  width: 100%;
  height: 38px;

  padding-left: 24px;
  list-style: none; /* 가로 정렬 */
  
  & li {
    float: left; /* 가로 정렬 */

    height: 100%;
    font-size: ${font.size.large};
    font-weight: ${font.weight.bold};
    line-height: 24px;

    & a {
      color: ${style.common.color};
      text-transform: capitalize;
    }
  }

  & li:nth-of-type(2) {
    margin-left: 16px;
  }
  
  & li:nth-of-type(${({ selectTabMenu }) => (selectTabMenu === 'newlink' ? 1 : 2)}) {
    border-bottom: 3px solid ${colors.white}; /* 선택 */
  }

  & li:nth-of-type(${({ selectTabMenu }) => (selectTabMenu === 'newlink' ? 2 : 1)}){
    opacity: 0.5; /* 미 선택 */
  }
`;

const Layout = styled.div`
  padding: ${style.common.interval.small} ${style.common.interval.small} 48px;
`;

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
