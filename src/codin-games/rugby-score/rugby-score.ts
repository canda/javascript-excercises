const score: number = parseInt(readline());

console.error({ score });

type Subscores = 2 | 3 | 5;

const doesSubscoreFit = (remainingScore: number, subscore: Subscores) =>
  remainingScore - subscore >= 0;

const combinations: { 5: number; 2: number; 3: number }[] = [];
const checkIfSubscoreFit = (
  remainingScore: number,
  subscore: Subscores,
  parentSubscores: { 5: number; 2: number; 3: number },
) => {
  const newRemainingScore = remainingScore - subscore;
  const newParentSubscores = {
    ...parentSubscores,
    [subscore]: parentSubscores[subscore] + 1,
  };
  if (newRemainingScore === 0) {
    if (
      !combinations.some(
        (x) =>
          x[2] === newParentSubscores[2] &&
          x[3] === newParentSubscores[3] &&
          x[5] === newParentSubscores[5],
      )
    ) {
      combinations.push(newParentSubscores);
    }
    return;
  }

  if (newRemainingScore > 0) {
    checkIfSubscoreFit(newRemainingScore, 5, newParentSubscores);
    checkIfSubscoreFit(newRemainingScore, 3, newParentSubscores);
    if (subscore === 5) {
      checkIfSubscoreFit(newRemainingScore, 2, newParentSubscores);
    }
  }
};

checkIfSubscoreFit(score, 5, { 2: 0, 3: 0, 5: 0 });
checkIfSubscoreFit(score, 3, { 2: 0, 3: 0, 5: 0 });

combinations.sort((x, y) => {
  if (x[5] === y[5]) {
    if (x[2] === y[2]) {
      // sort by 3
      return x[3] - y[3];
    }
    // sort by 2
    return x[2] - y[2];
  }
  return x[5] - y[5];
});
console.error({ combinations });
console.error(combinations.map((x) => `${x[5]} ${x[2]} ${x[3]}`));

console.log(combinations.map((x) => `${x[5]} ${x[2]} ${x[3]}`).join('\n'));

// Write an answer using console.log()
// To debug: console.error('Debug messages...');
