import { TrieNode } from './trie';

const terminator = () => new TrieNode(null);

//          *
//
//    M     L     A
//   A Y    I     *
//  N   *   E
// Y *      *
// *
const sampleTrie = () => {
  const root = new TrieNode(null);

  // A
  const a = new TrieNode('a');
  root.childNodes['a'] = a;

  // LIE
  const l = new TrieNode('l');
  const i = new TrieNode('i');
  const e = new TrieNode('e');
  e.childNodes[''] = terminator();
  i.childNodes['e'] = e;
  l.childNodes['i'] = i;
  root.childNodes['l'] = l;

  // MANY
  const m = new TrieNode('m');
  const a2 = new TrieNode('a');
  const n = new TrieNode('n');
  const y = new TrieNode('y');
  y.childNodes[''] = terminator();
  n.childNodes['y'] = y;
  a2.childNodes['n'] = n;
  m.childNodes['a'] = a2;
  root.childNodes['m'] = m;

  // MAN
  n.childNodes[''] = terminator();

  // MY
  const y2 = new TrieNode('y');
  y2.childNodes[''] = terminator();
  m.childNodes['y'] = y2;

  return root;
};

describe('TrieNode', () => {
  it('should return many when searching for many', () => {
    const trie = sampleTrie();

    expect(trie.wordsStartingWith('many')).toEqual(['many']);
  });

  it('should return man and many when searching for man', () => {
    const trie = sampleTrie();

    expect(trie.wordsStartingWith('man').sort()).toEqual(
      ['man', 'many'].sort(),
    );
  });
});
