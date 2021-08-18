/* eslint-disable react/no-array-index-key */
import styled from '@emotion/styled';

import React, { useRef } from 'react';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Url from '../components/Url';
import Preview from '../components/Preview';
import Comment from '../components/Comment';

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

  const isShowUrlValidationMessage = useSelector(get('isShowUrlValidationMessage'));

  const isShowTagsValidationMessage = useSelector(get('isShowTagsValidationMessage'));

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

  const inputTagRef = useRef();

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

  const inputUrlRef = useRef();
  const ulTagsRef = useRef();

  const SCROLL_X_VALUE = 60; // TODO : 얼만큼 이동하는게 UX적으로 좋을지 디자이너와 상의 후 x값 픽스하기

  const MOVE = {
    RIGHT: SCROLL_X_VALUE,
    LEFT: -SCROLL_X_VALUE,
  };

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
      autoXScroll(ulTagsRef, MOVE.RIGHT);
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

  const handleClickAutoCompleteTag = (index) => {
    const newAutoCompleteTag = autoCompleteTags[index].name;

    handleAddTag(newAutoCompleteTag);
  };

  const handleClickRemoveTag = (removeIndex) => {
    dispatch(removeTag(removeIndex));
    dispatch(resetAutoCompleteTags());

    if (isNeedScroll(inputTagRef)) {
      autoXScroll(ulTagsRef, MOVE.LEFT);
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
            <FormField>
              <label htmlFor="devlink-tags">
                tags
              </label>
              <TagInputWrapper>
                <ul ref={ulTagsRef}>
                  {!isEmpty(tags) && tags.map((tag, index) => (
                    <li key={index}>
                      <TagText>{`#${tag}`}</TagText>
                      <button type="button" alt="btn-remove-tag" title="remove-tag" onClick={() => handleClickRemoveTag(index)} />
                    </li>
                  ))}
                  <li>
                    <input
                      type="text"
                      id="devlink-tags"
                      aria-label="devlink-tags"
                      placeholder={isEmpty(tags) ? 'tag 입력 후 enter를 입력해주세요' : undefined}
                      ref={inputTagRef}
                      name="tags"
                      autoComplete="off"
                      onChange={handleChangeTag}
                      onKeyDown={handleKeyDownEnter}
                    />
                  </li>
                </ul>
              </TagInputWrapper>
              <AutoCompleteTagsWrapper showAutoCompleteTags={!isEmpty(autoCompleteTags)}>
                <ul>
                  {!isEmpty(autoCompleteTags)
                      && autoCompleteTags.map((autoCompleteTag, index) => (
                        <li key={index}>
                          <AutoCompleteTagsText onClick={() => handleClickAutoCompleteTag(index)}>{`#${autoCompleteTag.name}`}</AutoCompleteTagsText>
                        </li>
                      ))}
                </ul>
              </AutoCompleteTagsWrapper>
              {isShowTagsValidationMessage && <ValidationMessage>tag 를 입력해주세요</ValidationMessage>}
            </FormField>
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

const FormField = styled.fieldset`
  margin-top: 20px;

  display: flex;
  flex-direction: column;

  & label {
    text-transform: capitalize;
    
    font-size: ${style.font.size.small};;
    font-weight: ${style.font.weight.light};

    opacity: 0.8;
  }

  & label ~ :nth-child(2) {
    margin-top: 4px;

    padding: 0 16px;
    background: ${style.colors.white};
    border-radius: 15px;
  }

  & input {
    height: 30px;

    ::placeholder {
      font-size: ${style.font.size.small};;
      font-family: ${style.font.family.krNum};
      font-weight: ${style.font.weight.light};

      opacity: 0.5;
    }
  }
`;

const TagInputWrapper = styled.div`
  width: 272px; /* 태그가 많아졌을 때, 늘어나는 걸 방지하기 위해 고정값 사용 */

  & ul {
    display: flex;
    flex-wrap: nowrap; /* 1줄로 표시  */
    overflow: scroll;

    align-items: center;

    & li {
      flex: 0 0 auto;

      & span {

      }

      & button {
        margin-left: 2px;
        width: 10px;
        height: 10px;

        background: url('../../assets/images/tag-remove.png');
      }
    }

    & li:not(:first-of-type) {
      margin-left: 10px;
    }

    & li:last-of-type input {
      width: 200px; /* placeholder 보일 정도만 */
    }
  }

  & ul::-webkit-scrollbar { /* Chrome, Safari, Opera*/
    display: none; /* 스크롤 바 안보이게 */
  }
`;

const TagText = styled.span`
  font-size: ${style.font.size.small};
  font-family: ${style.font.family.krNum};
  font-weight: ${style.font.weight.regular};
  color: #383D4B;
  text-transform: uppercase;
`;

const AutoCompleteTagsWrapper = styled.div`
  margin: 0 16px;

  display: ${({ showAutoCompleteTags }) => (showAutoCompleteTags ? 'block' : 'none')};

  height: 32px;
  background: ${style.colors.white};
  border: 0.25px solid ${style.colors.gray.normal};

  ul {
    display: flex;
    flex-direction: row;
    margin: 8px;

    li {
      list-style: none;

      height: 16px;

      background: #8F8ECF;
      border-radius: 40px;
    }

    li:not(:first-of-type) {
      margin-left: 4px;
    }
  }
`;

const AutoCompleteTagsText = styled.span`

  display: flex;
  align-items: center;

  font-weight: ${style.font.weight.bold};
  font-size: 10px;
  line-height: 12px;

  color:  ${style.colors.white};
  background: #8F8ECF;
  margin: 3px 6px;
  text-transform: uppercase;

  cursor: pointer;
`;

const ValidationMessage = styled.p`
  margin-top: 6px;
  margin-left: 16px;

  width: 244px;
  height: 20px;

  font-family: ${style.font.family.krNum};
  font-weight: normal;
  font-size: ${style.font.size.tiny};
  line-height: 13px;

  display: flex;
  align-items: center;

  color: ${style.colors.red};

  mix-blend-mode: normal;
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
