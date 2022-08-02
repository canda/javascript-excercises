const multiplyTables: Record<string, Record<string, string>> = {
  '0': {
    '0': '0',
    '1': '0',
    '2': '0',
    '3': '0',
    '4': '0',
    '5': '0',
    '6': '0',
    '7': '0',
    '8': '0',
    '9': '0',
  },
  '1': {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
  },
  '2': {
    '0': '0',
    '1': '2',
    '2': '4',
    '3': '6',
    '4': '8',
    '5': '10',
    '6': '12',
    '7': '14',
    '8': '16',
    '9': '18',
  },
  '3': {
    '0': '0',
    '1': '3',
    '2': '6',
    '3': '6',
    '4': '12',
    '5': '15',
    '6': '18',
    '7': '21',
    '8': '24',
    '9': '27',
  },
  '4': {
    '0': '0',
    '1': '4',
    '2': '8',
    '3': '12',
    '4': '16',
    '5': '20',
    '6': '24',
    '7': '28',
    '8': '32',
    '9': '36',
  },
  '5': {
    '0': '0',
    '1': '5',
    '2': '10',
    '3': '15',
    '4': '20',
    '5': '25',
    '6': '30',
    '7': '35',
    '8': '40',
    '9': '45',
  },
  '6': {
    '0': '0',
    '1': '6',
    '2': '12',
    '3': '18',
    '4': '24',
    '5': '30',
    '6': '36',
    '7': '42',
    '8': '48',
    '9': '54',
  },
  '7': {
    '0': '0',
    '1': '7',
    '2': '14',
    '3': '21',
    '4': '28',
    '5': '35',
    '6': '42',
    '7': '49',
    '8': '56',
    '9': '63',
  },
  '8': {
    '0': '0',
    '1': '8',
    '2': '16',
    '3': '24',
    '4': '32',
    '5': '40',
    '6': '48',
    '7': '56',
    '8': '64',
    '9': '72',
  },
  '9': {
    '0': '0',
    '1': '9',
    '2': '18',
    '3': '27',
    '4': '36',
    '5': '45',
    '6': '54',
    '7': '63',
    '8': '72',
    '9': '81',
  },
};

const sumTables: Record<string, Record<string, string>> = {
  '0': {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
  },
  '1': {
    '0': '1',
    '1': '2',
    '2': '3',
    '3': '4',
    '4': '5',
    '5': '6',
    '6': '7',
    '7': '8',
    '8': '9',
    '9': '10',
  },
  '2': {
    '0': '2',
    '1': '3',
    '2': '4',
    '3': '5',
    '4': '6',
    '5': '7',
    '6': '8',
    '7': '9',
    '8': '10',
    '9': '11',
  },
  '3': {
    '0': '3',
    '1': '4',
    '2': '5',
    '3': '6',
    '4': '7',
    '5': '8',
    '6': '9',
    '7': '10',
    '8': '11',
    '9': '12',
  },
  '4': {
    '0': '4',
    '1': '5',
    '2': '6',
    '3': '7',
    '4': '8',
    '5': '9',
    '6': '10',
    '7': '11',
    '8': '12',
    '9': '13',
  },
  '5': {
    '0': '5',
    '1': '6',
    '2': '7',
    '3': '8',
    '4': '9',
    '5': '10',
    '6': '11',
    '7': '12',
    '8': '13',
    '9': '14',
  },
  '6': {
    '0': '6',
    '1': '7',
    '2': '8',
    '3': '9',
    '4': '10',
    '5': '11',
    '6': '12',
    '7': '13',
    '8': '14',
    '9': '15',
  },
  '7': {
    '0': '7',
    '1': '8',
    '2': '9',
    '3': '10',
    '4': '11',
    '5': '12',
    '6': '13',
    '7': '14',
    '8': '15',
    '9': '16',
  },
  '8': {
    '0': '8',
    '1': '9',
    '2': '10',
    '3': '11',
    '4': '12',
    '5': '13',
    '6': '14',
    '7': '15',
    '8': '16',
    '9': '17',
  },
  '9': {
    '0': '9',
    '1': '10',
    '2': '11',
    '3': '12',
    '4': '13',
    '5': '14',
    '6': '15',
    '7': '16',
    '8': '17',
    '9': '18',
  },
};

const sumCharacters = (char1: string, char2: string) => {
  console.log({ char1, char2 });
  const total = sumTables[char1][char2];
  return {
    result: total[total.length - 1],
    rest: total.length === 1 ? '0' : total[0],
  };
};

const addRest = (charToAdd: string, position: number, restsArray: string[]) => {
  let rest = charToAdd;
  let i = position;
  while (rest !== '0') {
    const currenPositiontRest = restsArray[i] || '0';
    restsArray[position] = sumCharacters(currenPositiontRest, rest).result;

    rest = sumCharacters(currenPositiontRest, rest).rest;
    i++;
  }
};

function multiply(num1: string, num2: string): string {
  const maxLength = Math.max(num1.length, num2.length);
  let resultArray: string[] = [];
  const restsArray: string[] = [];
  for (let i = 0; i < maxLength; i++) {
    const positionMultiplyResult = multiplyTables[num1[i]][num2[i]];
    positionMultiplyResult;
    const multiplyRest =
      positionMultiplyResult.length === 1 ? '0' : positionMultiplyResult[0];
    const multiplyLastDigit =
      positionMultiplyResult[positionMultiplyResult.length - 1];

    addRest(multiplyRest, i + 1, restsArray);

    const currentDigitResult = sumCharacters(
      restsArray[i] || '0',
      multiplyLastDigit,
    ).result;
    addRest(
      sumCharacters(restsArray[i] || '0', multiplyLastDigit).rest,
      i + 1,
      restsArray,
    );

    resultArray[i] = currentDigitResult;
  }

  resultArray = resultArray.concat(restsArray.slice(resultArray.length));

  return resultArray.reverse().join('');
  // return (parseInt(num1) * parseInt(num2)).toString();
}
export default multiply;
