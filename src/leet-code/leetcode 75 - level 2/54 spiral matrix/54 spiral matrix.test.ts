import spiralOrder from './54 spiral matrix';

it('should spiral through 3x3 square', () => {
  expect(
    spiralOrder([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]),
  ).toStrictEqual([1, 2, 3, 6, 9, 8, 7, 4, 5]);
});

it('should spiral through 3x4 rectangle', () => {
  expect(
    spiralOrder([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ]),
  ).toStrictEqual([1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]);
});

it('should spiral through 4x3 rectangle', () => {
  expect(
    spiralOrder([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
    ]),
  ).toStrictEqual([1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8]);
});
