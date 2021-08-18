/* eslint-disable react/no-array-index-key */
import styled from '@emotion/styled';

import React, { useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Url from '../components/Url';
import Preview from '../components/Preview';
import Comment from '../components/Comment';
import Tags from '../components/Tags';

import style from '../styles/designSystem';

import { colors, font } from '../styles/commom';

import useCurrentUser from '../hooks/useCurrentUser';

import {
  fetchPreview,
  loadUrl,
  setIsShowUrlValidationMessage,
  setIsShowTagsValidationMessage,
  setUrl,
  setComment,
  setTags,
  loadAutoCompleteTags,
  resetAutoCompleteTags,
  submitDevlink,
  setSelectTabMenu,
  removeTag,
} from '../redux/slice';

import { isEmpty, get } from '../utils';

import { isNeedScroll, autoXScroll } from '../helper';

export default function MainPage() {
  const history = useHistory();

  const { currentUser } = useCurrentUser();

  if (isEmpty(currentUser)) {
    history.push('/login');
    return null;
  }

  const dispatch = useDispatch();

  const selectTabMenu = useSelector(get('selectTabMenu'));

  const handleClickTabMenu = (e) => {
    const newSelectTabMenu = e.target.textContent;

    dispatch(setSelectTabMenu(newSelectTabMenu));
  };

  const url = useSelector(get('url'));
  const inputUrlRef = useRef();

  const isShowUrlValidationMessage = useSelector(get('isShowUrlValidationMessage'));

  if (isEmpty(url)) {
    dispatch(loadUrl());
  }

  const handleChangeUrl = (e) => {
    dispatch(setUrl(e.target.value));
  };

  const handleSearchUrl = () => {
    dispatch(fetchPreview());
  };

  const preview = useSelector(get('preview'));

  if (url && isEmpty(preview)) {
    dispatch(fetchPreview());
  }

  const comment = useSelector(get('comment'));

  const handleChangeComment = (e) => {
    dispatch(setComment(e.target.value));
  };

  const tags = useSelector(get('tags'));
  const inputTagRef = useRef();

  const autoCompleteTags = useSelector(get('autoCompleteTags'));
  const ulTagsRef = useRef();

  const isShowTagsValidationMessage = useSelector(get('isShowTagsValidationMessage'));

  const handleChangeTag = (e) => {
    const newTag = e.target.value.toUpperCase().trim();

    if (isEmpty(newTag)) {
      dispatch(resetAutoCompleteTags());
    } else {
      dispatch(loadAutoCompleteTags(newTag));
    }
  };

  const SCROLL_X_VALUE = 60; // TODO : 얼만큼 이동하는게 UX적으로 좋을지 디자이너와 상의 후 x값 픽스하기

  const handleAddTag = (tag) => {
    if (tags.length === 5) {
      window.alert('태그는 최대 5개까지 가능합니다.'); // TODO : UI 디자인 나오면 수정 필요
      return;
    }

    dispatch(setTags([...tags, tag]));
    inputTagRef.current.value = '';
    dispatch(resetAutoCompleteTags());
    // 최대 태그 입력 갯수 정하기
    if (isNeedScroll(inputTagRef)) {
      const MOVE_RIGHT = SCROLL_X_VALUE;

      autoXScroll(ulTagsRef, MOVE_RIGHT);
    }
  };

  const handleKeyDownEnter = (e) => {
    const newTag = e.target.value.trim();
    const ENTER = 13;

    if (e.keyCode === ENTER) {
      if (newTag && tags.indexOf(newTag) === -1) {
        handleAddTag(newTag);
      }
    }
  };

  const handleClickAutoCompleteTag = (index) => () => {
    const newAutoCompleteTag = autoCompleteTags[index].name;

    handleAddTag(newAutoCompleteTag);
  };

  const handleClickRemoveTag = (removeIndex) => () => {
    dispatch(removeTag(removeIndex));
    dispatch(resetAutoCompleteTags());

    if (isNeedScroll(inputTagRef)) {
      const MOVE_LEFT = -SCROLL_X_VALUE;

      autoXScroll(ulTagsRef, MOVE_LEFT);
    }
  };

  const handleClickSave = () => {
    if (isEmpty(url)) {
      dispatch(setIsShowUrlValidationMessage(true));
      inputUrlRef.current.focus();
      return;
    }

    if (isEmpty(tags)) {
      dispatch(setIsShowTagsValidationMessage(true));
      inputTagRef.current.focus();
      return;
    }

    // TODO : 코멘트 필수 입력 논의 후 수정 필요

    dispatch(submitDevlink());
  };

  return (
    <>
      <TabMenus selectTabMenu={selectTabMenu}>
        <li>
          <button type="button" onClick={handleClickTabMenu}>newlink</button>
        </li>
        <li>
          <button type="button" onClick={handleClickTabMenu}>archive</button>
        </li>
      </TabMenus>
      <Layout>
        {selectTabMenu === 'newlink' ? (
          <form>
            <Url
              url={url}
              inputUrlRef={inputUrlRef}
              isShowUrlValidationMessage={isShowUrlValidationMessage}
              onChangeUrl={handleChangeUrl}
              onSeatchUrl={handleSearchUrl}
            />
            <Preview
              preview={preview}
            />
            <Comment
              comment={comment}
              onChangeComment={handleChangeComment}
            />
            <Tags
              ulTagsRef={ulTagsRef}
              tags={tags}
              onClickRemoveTag={handleClickRemoveTag}
              inputTagRef={inputTagRef}
              onChangeTag={handleChangeTag}
              onKeyDownEnter={handleKeyDownEnter}
              autoCompleteTags={autoCompleteTags}
              onClickAutoCompleteTag={handleClickAutoCompleteTag}
              isShowTagsValidationMessage={isShowTagsValidationMessage}
            />
            <SaveButton type="button" id="btn-save" onClick={handleClickSave}>Save a contents</SaveButton>
          </form>
        ) : (
          <>
            <p>archive tab menu</p>
          </>
        )}
      </Layout>
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

    line-height: 24px;

    & button {
        color: ${style.common.color};
        background: transparent;

        font-size: 20px;
        font-weight: ${style.font.weight.bold};

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

const SaveButton = styled.button`
  position: fixed;
  top: 510px;
  margin: 0 20px;

  width: 240px;
  height: 42px;
  background: ${style.button.normal.background};
  border-radius: 63px;

  font-size: ${style.button.font.size};
  font-weight: ${style.font.weight.medium};

  color:  ${style.button.normal.color};

  &:hover {
    background-color:${style.button.hover.background};
  }
`;
