import findBall from './1706-where-will-the-ball-fall';

it('should solve 5x5 box', () => {
  expect(
    findBall([
      [1, 1, 1, -1, -1],
      [1, 1, 1, -1, -1],
      [-1, -1, -1, 1, 1],
      [1, 1, 1, 1, -1],
      [-1, -1, -1, -1, -1],
    ]),
  ).toStrictEqual([1, -1, -1, -1, -1]);
});

it('should solve single square box to the left', () => {
  expect(findBall([[-1]])).toStrictEqual([-1]);
});

it('should solve single square box to the right', () => {
  expect(findBall([[1]])).toStrictEqual([-1]);
});
