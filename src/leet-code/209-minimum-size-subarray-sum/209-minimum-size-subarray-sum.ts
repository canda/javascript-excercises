const arraySum = (nums: number[], startingIndex: number, length: number) =>
  nums
    .slice(startingIndex, startingIndex + length)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

function minSubArrayLen(target: number, nums: number[]): number {
  let result = nums.length + 1;
  let foundResult = false;
  let sum = arraySum(nums, 0, result);
  for (let index = 0; index < nums.length; index++) {
    for (let arrayLength = result; arrayLength > 0; arrayLength--) {
      if (sum >= target) {
        result = arrayLength;
        foundResult = true;
      }
      if (sum < target) {
        break;
      }
      const indexToRemove = index + arrayLength - 1;
      sum =
        sum -
        (indexToRemove >= nums.length ? 0 : nums[index + arrayLength - 1]);
    }
    sum = sum - nums[index] + (nums[index + result] || 0);
  }
  if (!foundResult) {
    return 0;
  }
  return result;
}
