/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

type Position = { x: number; y: number };

let currentDirection: Direction = Direction.Left;
const playerPaths: Position[][] = [];

const isPositionFree = (position: Position) => {
  if (position.x > 29) return false;
  if (position.y > 19) return false;
  if (position.x < 0) return false;
  if (position.y < 0) return false;
  if (
    playerPaths.some((path) =>
      path.some(({ x, y }) => x === position.x && y === position.y),
    )
  )
    return false;
  return true;
};

const canGoUp = (currentPosition: Position) =>
  isPositionFree({ x: currentPosition.x, y: currentPosition.y - 1 });

const canGoDown = (currentPosition: Position) =>
  isPositionFree({ x: currentPosition.x, y: currentPosition.y + 1 });

const canGoLeft = (currentPosition: Position) =>
  isPositionFree({ x: currentPosition.x - 1, y: currentPosition.y });

const canGoRight = (currentPosition: Position) =>
  isPositionFree({ x: currentPosition.x + 1, y: currentPosition.y });

// game loop
while (true) {
  var inputs: string[] = readline().split(' ');
  const N: number = parseInt(inputs[0]); // total number of players (2 to 4).
  const P: number = parseInt(inputs[1]); // your player number (0 to 3).
  const playerPositions = [];
  for (let i = 0; i < N; i++) {
    var inputs: string[] = readline().split(' ');
    const x0: number = parseInt(inputs[0]); // starting X coordinate of lightcycle (or -1)
    const y0: number = parseInt(inputs[1]); // starting Y coordinate of lightcycle (or -1)
    const x: number = parseInt(inputs[2]); // starting X coordinate of lightcycle (can be the same as X0 if you play before this player)
    const y: number = parseInt(inputs[3]); // starting Y coordinate of lightcycle (can be the same as Y0 if you play before this player)
    playerPositions.push({ x0, y0, x, y });
    if (!playerPaths[i]) {
      playerPaths[i] = [{ x: x0, y: y0 }];
    }
    playerPaths[i].push({ x, y });
  }

  const me = playerPositions[P];

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');
  console.error({ me });
  // console.error(JSON.stringify({ playerPaths }, null, 2));

  if (canGoRight(me)) {
    currentDirection = Direction.Right;
  } else if (canGoLeft(me)) {
    currentDirection = Direction.Left;
  } else if (canGoUp(me)) {
    currentDirection = Direction.Up;
  } else if (canGoDown(me)) {
    currentDirection = Direction.Down;
  }

  console.log(currentDirection);
}
