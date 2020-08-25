import canBeWritten from './love-letter';

describe('canBeWritten', () => {
  test('Can write same text', () => {
    expect(canBeWritten('asd', 'asd')).toBe(true);
  });

  test('Can write with more than enough letters', () => {
    expect(canBeWritten('asd', 'asdasd')).toBe(true);
  });

  test('Can not write with less letters', () => {
    expect(canBeWritten('asdasd', 'asd')).toBe(true);
  });

  test('Can not write with no letters', () => {
    expect(canBeWritten('asd', '')).toBe(true);
  });

  test('Should work with spaces', () => {
    expect(
      canBeWritten(
        'some spaces in between words',
        'some spaces in between words',
      ),
    ).toBe(true);
  });
});
