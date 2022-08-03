import multiply, {
  sumDigits,
  addDigitToNumberPosition,
  sumNumbers,
} from './43-multiply-strings';

describe('sumDigits', () => {
  it('should add 1 + 2', () => {
    expect(sumDigits('1', '2').result).toEqual('3');
    expect(sumDigits('1', '2').rest).toEqual('0');
  });
  it('should add 5 + 5', () => {
    expect(sumDigits('5', '5').result).toEqual('0');
    expect(sumDigits('5', '5').rest).toEqual('1');
  });
  it('should add 8 + 9', () => {
    expect(sumDigits('8', '9').result).toEqual('7');
    expect(sumDigits('8', '9').rest).toEqual('1');
  });
});

describe('addDigitToNumberPosition', () => {
  it('should add 1 + 2', () => {
    expect(addDigitToNumberPosition('1', 0, ['1'])).toEqual(['2']);
  });
  it('should add 5 + 5', () => {
    expect(addDigitToNumberPosition('5', 0, ['5'])).toEqual(['1', '0']);
  });
  it('should add 9 + 99', () => {
    expect(addDigitToNumberPosition('9', 1, ['9', '9'])).toEqual([
      '1',
      '0',
      '8',
    ]);
  });
  it('should add 90 + 99', () => {
    expect(addDigitToNumberPosition('9', 0, ['9', '9'])).toEqual([
      '1',
      '8',
      '9',
    ]);
  });

  it('should add 10 + 99', () => {
    expect(addDigitToNumberPosition('1', 0, ['9', '9'])).toEqual([
      '1',
      '0',
      '9',
    ]);
  });

  it('should add 9 + 10', () => {
    expect(addDigitToNumberPosition('9', 1, ['1', '0'])).toEqual(['1', '9']);
  });
});

describe('sumNumbers', () => {
  it('should add 1 + 2', () => {
    expect(sumNumbers(['1'], ['2'])).toEqual(['3']);
  });

  it('should add 9 + 9', () => {
    expect(sumNumbers(['9'], ['9'])).toEqual(['1', '8']);
  });

  it('should add 100 + 100', () => {
    expect(sumNumbers(['1', '0', '0'], ['1', '0', '0'])).toEqual([
      '2',
      '0',
      '0',
    ]);
  });

  it('should add 9 + 10', () => {
    expect(sumNumbers(['9'], ['1', '0'])).toEqual(['1', '9']);
  });

  it('should add 10 + 9', () => {
    expect(sumNumbers(['1', '0'], ['9'])).toEqual(['1', '9']);
  });

  it('should add 99 + 10', () => {
    expect(sumNumbers(['9', '9'], ['1', '0'])).toEqual(['1', '0', '9']);
  });

  it('should add 99 + 99', () => {
    expect(sumNumbers(['9', '9'], ['9', '9'])).toEqual(['1', '9', '8']);
  });
});

describe('multiply', () => {
  it('should multiply 5x9', () => {
    expect(multiply('5', '9')).toEqual((5 * 9).toString());
  });

  it('should multiply 3x3', () => {
    expect(multiply('3', '3')).toEqual('9');
  });

  it('should multiply 12x2', () => {
    expect(multiply('12', '2')).toEqual('24');
  });

  it('should multiply 12x10', () => {
    expect(multiply('12', '10')).toEqual('120');
  });

  it('should multiply 123x1', () => {
    expect(multiply('123', '1')).toEqual('123');
  });

  it('should multiply 1x123', () => {
    expect(multiply('1', '123')).toEqual('123');
  });

  it('should multiply 123x11', () => {
    expect(multiply('123', '11')).toEqual('1353');
  });

  it('should multiply 100x100', () => {
    expect(multiply('100', '100')).toEqual('10000');
  });

  it('should multiply 123x100', () => {
    expect(multiply('123', '100')).toEqual('12300');
  });

  it('should multiply 100x123', () => {
    expect(multiply('100', '123')).toEqual('12300');
  });

  it('should multiply 123x321', () => {
    expect(multiply('123', '321')).toEqual('39483');
  });

  it('should multiply 1234x4321', () => {
    expect(multiply('1234', '4321')).toEqual('5332114');
  });

  it('should multiply long numbers', () => {
    expect(multiply('123456789', '987654321')).toEqual('121932631112635269');
  });

  it('should multiply really long numbers', () => {
    expect(
      multiply(
        '14992561453667515041174576364495007455793',
        '71852359466035794333134891563860065492369184753318',
      ),
    ).toEqual(
      '1077250914885550443524655360967382374708267263352100135988164631681568517376365509495071174',
    );
  });

  it('should remove left zeroes', () => {
    expect(multiply('123456789', '0')).toEqual('0');
  });
});
