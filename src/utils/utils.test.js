import { get, isEmpty, getUniqArray } from '.';

test('get', () => {
  const state = {
    name: 'react',
  };

  const getName = get('name');
  const getAge = get('age');

  expect(getName(state)).toBe('react');
  expect(getAge(state)).toBeUndefined();
});

test('isEmpty', () => {
  const array = [];

  expect(isEmpty(array)).toBeTruthy();
  expect(isEmpty(null)).toBeTruthy();
});

test('getUniqArray', () => {
  const array = [1, 2, 3, 4, 4, 4, 4, 2, 2, 2];

  expect(getUniqArray(array)).toStrictEqual([1, 2, 3, 4]);
});
