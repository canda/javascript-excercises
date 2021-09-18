enum Direction {
  U = 'U',
  UR = 'UR',
  R = 'R',
  DR = 'DR',
  D = 'D',
  DL = 'DL',
  L = 'L',
  UL = 'UL',
}

var inputs: string[] = readline().split(' ');
const width: number = parseInt(inputs[0]); // width of the building.
const height: number = parseInt(inputs[1]); // height of the building.
const maxJumps: number = parseInt(readline()); // maximum number of turns before game over.
var inputs: string[] = readline().split(' ');
let x: number = parseInt(inputs[0]);
let y: number = parseInt(inputs[1]);

let minX = 0;
let minY = 0;
let maxX = width;
let maxY = height;

const isToTheRight = (direction: Direction) =>
  [Direction.UR, Direction.R, Direction.DR].includes(direction);

const isToTheLeft = (direction: Direction) =>
  [Direction.UL, Direction.L, Direction.DL].includes(direction);

const isUpwards = (direction: Direction) =>
  [Direction.UL, Direction.U, Direction.UR].includes(direction);

const isDownwards = (direction: Direction) =>
  [Direction.DL, Direction.D, Direction.DR].includes(direction);

// game loop
while (true) {
  const bombDirection: Direction = readline() as Direction; // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  if (isToTheRight(bombDirection)) {
    minX = x;
  } else if (isToTheLeft(bombDirection)) {
    maxX = x;
  } else {
    minX = maxX = x;
  }

  if (isUpwards(bombDirection)) {
    maxY = y;
  } else if (isDownwards(bombDirection)) {
    minY = y;
  } else {
    minY = maxY = y;
  }

  console.error({ minX, maxX, minY, maxY });

  x = Math.floor((maxX + minX) / 2);
  y = Math.floor((maxY + minY) / 2);

  // the location of the next window Batman should jump to.
  console.log(`${x} ${y}`);
}
