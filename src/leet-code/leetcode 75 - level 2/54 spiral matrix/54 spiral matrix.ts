function spiralOrder(matrix: number[][]): number[] {
  type Position = { row: number; column: number };
  const right = (position: Position) => ({
    row: position.row,
    column: position.column + 1,
  });
  const left = (position: Position) => ({
    row: position.row,
    column: position.column - 1,
  });
  const top = (position: Position) => ({
    row: position.row - 1,
    column: position.column,
  });
  const bottom = (position: Position) => ({
    row: position.row + 1,
    column: position.column,
  });

  let currentPosition = { row: 0, column: -1 };
  const result: number[] = [];
  let remainingRows = matrix.length;
  let remainingColumns = matrix[0].length;
  const visit = (position: Position) => {
    console.log('visiting', position);
    result.push(matrix[position.row][position.column]);
  };

  while (remainingColumns > 0 && remainingColumns > 0) {
    console.log('right');
    console.log({ remainingColumns, remainingRows, result });
    // right
    if (remainingColumns <= 0) break;
    for (let i = 0; i < remainingColumns; i++) {
      currentPosition = right(currentPosition);
      visit(currentPosition);
    }
    remainingRows -= 1;
    console.log('bottom');
    console.log({ remainingColumns, remainingRows, result });
    // bottom
    if (remainingRows <= 0) break;
    for (let i = 0; i < remainingRows; i++) {
      currentPosition = bottom(currentPosition);
      visit(currentPosition);
    }
    remainingColumns -= 1;
    console.log('left');
    console.log({ remainingColumns, remainingRows, result });
    // left
    if (remainingColumns <= 0) break;
    for (let i = 0; i < remainingColumns; i++) {
      currentPosition = left(currentPosition);
      visit(currentPosition);
    }
    remainingRows -= 1;
    console.log('top');
    console.log({ remainingColumns, remainingRows, result });
    // top
    if (remainingRows <= 0) break;
    for (let i = 0; i < remainingRows; i++) {
      currentPosition = top(currentPosition);
      visit(currentPosition);
    }
    remainingColumns -= 1;
  }

  return result;
}

export default spiralOrder;
