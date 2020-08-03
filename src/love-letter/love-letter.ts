const canBeWritten = (L: string, N: string) => {
  const charactersInNewspaper: Record<string, number> = {};
  N.split('').forEach((char) => {
    charactersInNewspaper[char] = (charactersInNewspaper[char] || 0) + 1;
  });

  L.split('').forEach((char) => {
    if (!charactersInNewspaper[char] || charactersInNewspaper[char] === 0) {
      return false;
    }

    charactersInNewspaper[char] = charactersInNewspaper[char] - 1;
  });

  return true;
};

export default canBeWritten;
