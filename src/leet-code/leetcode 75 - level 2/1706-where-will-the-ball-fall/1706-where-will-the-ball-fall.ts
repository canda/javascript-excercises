const DIRECTION = {
  LEFT: -1,
  RIGHT: 1,
};

type Position = {
  row: number;
  column: number;
};

function findBall(grid: number[][]): number[] {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const canFall = (position: Position) => {
    // going left
    if (grid[position.row][position.column] === DIRECTION.LEFT) {
      // left wall
      if (position.column === 0) {
        return false;
      }
      // V
      if (grid[position.row][position.column - 1] === DIRECTION.RIGHT) {
        return false;
      }
    }
    // going right
    else {
      // right wall
      if (position.column === gridWidth - 1) {
        return false;
      }
      // V
      if (grid[position.row][position.column + 1] === DIRECTION.LEFT) {
        return false;
      }
    }

    return true;
  };

  const result = [];
  for (let ball = 0; ball < gridWidth; ball++) {
    let position = { row: 0, column: ball };
    let couldFall = true;
    for (let row = 0; row < gridHeight; row++) {
      if (canFall(position)) {
        const nextColumn =
          grid[position.row][position.column] === DIRECTION.LEFT
            ? position.column - 1
            : position.column + 1;

        position = { row: position.row + 1, column: nextColumn };
      } else {
        couldFall = false;
        break;
      }
    }
    if (couldFall) {
      result.push(position.column);
    } else {
      result.push(-1);
    }
  }

  return result;
}

export default findBall;
