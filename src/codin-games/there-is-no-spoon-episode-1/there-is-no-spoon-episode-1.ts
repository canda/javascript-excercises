/**
 * Don't let the machines win. You are humanity's last hope...
 **/

const noSpoonSolution = () => {
  const width: number = parseInt(readline()); // the number of cells on the X axis
  const height: number = parseInt(readline()); // the number of cells on the Y axis

  const rows: string[] = [];
  for (let i = 0; i < height; i++) {
    rows.push(readline()); // width characters, each either 0 or .
  }

  console.error({ width, height, rows });

  for (let row = 0; row < height; row++) {
    for (let column = 0; column < width; column++) {
      console.error('cheking', column, row);
      if (rows[row].split('')[column] === '.') {
        continue;
      }

      let rightNeighbour = null;
      let bottomNeighbour = null;

      for (
        let neighbourColumn = column + 1;
        neighbourColumn < width;
        neighbourColumn++
      ) {
        if (rows[row].split('')[neighbourColumn] === '0') {
          rightNeighbour = neighbourColumn;
          break;
        }
      }

      for (let neighbourRow = row + 1; neighbourRow < height; neighbourRow++) {
        if (rows[neighbourRow].split('')[column] === '0') {
          bottomNeighbour = neighbourRow;
          break;
        }
      }

      console.error({ rightNeighbour, bottomNeighbour });

      // Three coordinates: a node, its right neighbor, its bottom neighbor
      console.log(
        `${column} ${row} ${rightNeighbour ? rightNeighbour : -1} ${
          rightNeighbour ? row : -1
        } ${bottomNeighbour ? column : -1} ${
          bottomNeighbour ? bottomNeighbour : -1
        }`,
      );
    }
  }
};

noSpoonSolution();
