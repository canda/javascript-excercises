const isDivisor = (str: string, divisor: string) => {
  if (!divisor) return false;
  let strLeft = str;
  while (strLeft.length > 0) {
    const chunkToRemove = strLeft.slice(-divisor.length);
    if (chunkToRemove !== divisor) {
      break;
    }
    strLeft = strLeft.slice(0, strLeft.length - divisor.length);
  }
  if (strLeft.length === 0) return true;
  return false;
};

const gcdOfStrings = (str1: string, str2: string): string => {
  for (let i = str2.length; i > 0; i--) {
    const divisor = str2.slice(0, i);
    if (isDivisor(str1, divisor) && isDivisor(str2, divisor)) {
      return divisor;
    }
  }
  return '';
};

export default gcdOfStrings;
