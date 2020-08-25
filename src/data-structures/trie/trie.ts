export class TrieNode {
  char: string | null;
  childNodes: Record<string, TrieNode>;

  constructor(char: string | null) {
    this.char = char;
    this.childNodes = {};
  }

  wordsStartingWith = (prefix: string) => {
    const prefixChars = prefix.split('');
    let startingNode: TrieNode = this;
    for (let char of prefixChars) {
      startingNode = startingNode.childNodes[char];
    }

    return startingNode.allWords(prefix);
  };

  allWords = (prefix: string) => {
    if (this.char === null) {
      return [prefix];
    }

    return [].concat.apply(
      [],
      Object.keys(this.childNodes).map((childChar) =>
        this.childNodes[childChar].allWords(`${prefix}${childChar}`),
      ),
    );
  };
}
