const nextStep = (n: number) => {
  const digits = n
    .toString()
    .split('')
    .map((x) => parseInt(x));
  let result = 0;
  for (const digit of digits) {
    result += digit * digit;
  }
  return result;
};

function isHappy(input: number): boolean {
  let visittedNumbers: Record<number, true> = {};
  let currentNumber = input;
  while (!visittedNumbers[currentNumber] && currentNumber !== 1) {
    visittedNumbers[currentNumber] = true;
    currentNumber = nextStep(currentNumber);
  }
  const isHappy = currentNumber === 1;
  return isHappy;
}
