/* eslint-disable react/no-array-index-key */
import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Url from '../components/Url';

import {
  fetchPreview,
  setUrl,
} from '../redux/slice';

import { get } from '../utils';

const useUrl = () => {
  const dispatch = useDispatch();

  const isShowUrlValidationMessage = useSelector(get('isShowUrlValidationMessage'));

  const url = useSelector(get('url'));
  const inputUrlRef = useRef();

  const handleChangeUrl = (e) => {
    dispatch(setUrl(e.target.value));
  };

  const handleSearchUrl = () => {
    dispatch(fetchPreview());
  };

  const renderUrl = () => (
    <Url
      url={url}
      inputUrlRef={inputUrlRef}
      isShowUrlValidationMessage={isShowUrlValidationMessage}
      onChangeUrl={handleChangeUrl}
      onSeatchUrl={handleSearchUrl}
    />
  );

  return [url, inputUrlRef, renderUrl];
};

export default useUrl;
