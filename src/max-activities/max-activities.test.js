import maxActivities from './max-activities';

describe('maxActivities', () => {
  it('should count 4 on this 3 by 3 map', () => {
    const map = [
      [1, 0, 0],
      [0, 1, 1],
      [0, 1, 1],
    ];
    expect(maxActivities(map)).toBe(4);
  });
  it('should count 6 on this 5 by 5 map', () => {
    const map = [
      [1, 0, 0, 0, 1],
      [0, 1, 1, 0, 1],
      [0, 1, 1, 0, 1],
      [1, 0, 0, 1, 1],
      [1, 1, 0, 0, 1],
    ];
    expect(maxActivities(map)).toBe(6);
  });
});
