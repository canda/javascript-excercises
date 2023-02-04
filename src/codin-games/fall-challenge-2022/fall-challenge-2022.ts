/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const fallChallengeGame = () => {
  const randomIntFromInterval = (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const randomItem = <T>(array: Array<T>): T =>
    array[Math.floor(Math.random() * array.length)];

  var inputs: string[] = readline().split(' ');
  const width: number = parseInt(inputs[0]);
  const height: number = parseInt(inputs[1]);
  type Position = { x: number; y: number };
  enum Owner {
    me,
    foe,
    neutral,
  }

  // game loop
  while (true) {
    var inputs: string[] = readline().split(' ');
    const myMatter: number = parseInt(inputs[0]);
    const oppMatter: number = parseInt(inputs[1]);
    const myUnits: Position[] = [];
    const myPositions: Position[] = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        var inputs: string[] = readline().split(' ');
        const scrapAmount: number = parseInt(inputs[0]);
        const owner: Owner =
          parseInt(inputs[1]) === 1
            ? Owner.me
            : parseInt(inputs[1]) === 0
            ? Owner.foe
            : Owner.neutral; // 1 = me, 0 = foe, -1 = neutral
        const units: number = parseInt(inputs[2]);
        const recycler: number = parseInt(inputs[3]);
        const canBuild: number = parseInt(inputs[4]);
        const canSpawn: number = parseInt(inputs[5]);
        const inRangeOfRecycler: number = parseInt(inputs[6]);

        if (owner === Owner.me) {
          for (let i = 0; i < units; i++) {
            myUnits.push({ x, y });
          }
          myPositions.push({ x, y });
        }
      }
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    const moves = myUnits.map((position) => ({
      initial: position,
      target: {
        x: randomIntFromInterval(0, width),
        y: randomIntFromInterval(0, height),
      },
    }));

    console.log(
      moves
        .map(
          (move) =>
            `MOVE 1 ${move.initial.x} ${move.initial.y} ${move.target.x} ${move.target.y}`,
        )
        .join(';'),
    );
  }
};

fallChallengeGame();
