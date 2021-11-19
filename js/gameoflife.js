function seed() {}

function same([x, y], [j, k]) {return (x === j) && (y === k)}

// The game state to search for `cell` is passed as the `this` value of the function.
//The game state is an array of cells that are alive at a given point in time.
function contains(cell) {
    return this.some((c) => c.state === cell.state)
}

const printCell = (cell, gameState) => {
    //Remark: state is an array of cells; each cell is a 2D array of non-negative integers.
    // The gameState is passed as a parameter to the contains.call method because we are 
    //checking that the cell belongs to a particular gameState.
    const alive = this.contains.call(gameState, cell);
    if (alive)
        return '\u25A3';
    else
        return '\u25A2';
};

const corners = (gameState = []) => {
    let topRight = [0, 0] //topRight cell
    let bottomLeft = [0, 0] // bottomLeft cell
    gameState.reduce((topRight, inputCell) => {
        if (inputCell[0] > topRight[0])
            topRight[0] = inputCell[0];
        if (inputCell[1] > topRight[1])
            topRight[1] = inputCell[1];
    });
    gameState.reduce((bottomLeft, inputCell) => {
        if (inputCell[0] < bottomLeft[0])
            bottomLeft[0] = inputCell[0];
        if (inputCell[1] < bottomLeft[1])
            bottomLeft[1] = inputCell[1];
    });
    return {
        bottomLeft, topRight
    };
    
};

const printCells = (gameState) => {
    const { bottomLeft, topRight } = corners(gameState);
    const rowCount = topRight[1] - bottomLeft[1] + 1;
    const columnCount = topRight[0] - bottomLeft[0] + 1;
    const printSpace = () => '\u2000';
    const printNewLine = () => '\n';
    for (rowNumber = rowCount - 1; rowNumber >= 0; rowNumber--) {
        for (columnNumber = 0; columnNumber <= columnCount - 1; columnCount++) {
            const cellToTest = [bottomLeft[1] + rowNumber, bottomRight[0] + columnNumber];
            printSpace();
            printCell(cellToTest, gameState);           
        }
        printNewLine();
    }
        
};

const getNeighborsOf = ([x, y]) => {
    let result = [];
    result.push([x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x, y - 1]);
    return result;
};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;