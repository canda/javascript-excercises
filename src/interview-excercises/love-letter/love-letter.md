# Anonymous Love Letter

## Question
You have written an anonymous love letter and you don’t want your handwriting to be recognized. Since you don’t have a printer within reach, you are trying to write this letter by copying and pasting characters from a newspaper.

Given a string L representing the letter and a string N representing the newspaper, return true if the L can be written entirely from N and false otherwise. The letter includes only ascii characters.

## Hints

- This demo question if fairly simple. Ready for our real interview problems? Get Started.
- If your peer is stuck, ask how would you know if you can write L by using the letters in N only. Try to get them to emulate the naive algorithm to this supply & demand problem and then to formalize it.
- If you peer uses a hash table, make sure they understand what hashing means and what it involves. Then ask what can be a little more efficient. If it doesn’t ring a bell, ask what else do we know about these characters that would help us to use something similar to hashing, only more basic and efficient.
- Checking if 256 character counts are 0 after each and every character scanned in N is not a good practice, if your peer does that try to give hints towards a simpler approach instead, like the one showed with charCount.
- Sorting and searching are an overkill and should be avoided when the linear solution is that simple.
Any solution that takes more than linear O(n+m) runtime is not acceptable as complete

## Answer

L can be written by characters from N, if and only if every character in L is included in N at least by the same number of occurrences. To determine that, we should count the number of occurrences for each character in L and determine if we have all of them, at least at the same quantity in N. A good approach to do this is using a hash table. The hash key would be the character, and the hash value would be the number of occurrences counted so far.

Since all characters are ascii we can avoid the hash table and use a simple array of 256 integers, that we’ll name charMap. Every index in charMap will hold the number of occurrences of the character represented by its ascii code. Since N is most likely much longer than L, we start with counting the number of character occurrences in it first. That way, we’ll be able to stop processing N once we find all of L's characters in it, and reduce computational costs.

After counting all character occurrences in L, we scan N and for each character, reduce its count on charMap if it is larger than 0. If all counts in charMap are zero at some point, we return true. Otherwise, if we are done scanning N and at least one count is not 0, we return false.

Pseudocode:
```
function isLoveLetterReproducible(L, M):
   charMap = []
   charCount = 0

   for i from 0 to L.length:
      charCode = int(L.charAt(i)) 
      if (charMap[charCode] == 0):
         charCount++
      charMap[charCode]++

   for i from 0 to N.length:
      charCode = int(N.charAt(i))
      if (charMap[charCode] > 0):
         charMap[charCode]--
         if (charMap[charCode] == 0):
            charCount--
      if (charCount == 0):
         return true

   return false
```
Time Complexity: In the worst case we scan all of L and N linearly. For each character we execute a constant number of operations. Therefore, if m and n are the lengths of L and N, the runtime complexity is linear O(n+m).

Space Complexity: Using the variable charCode is only to make the pseudocode above clearer and can be avoided (by using the value directly). Other than that, since we use an array of constant size (256) and a constant number of variable, the space complexity is O(1).
