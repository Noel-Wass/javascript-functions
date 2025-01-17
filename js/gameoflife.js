const testCorners = () => {
    console.log(`testCorners...`)
    const test = corners([[1, 2], [4, 1]]);
    console.log(JSON.stringify(test));
    //Should return {bottomLeft: [1,1], topRight:[4, 2]}
}

const testPrintCells = () => {
    console.log('testPrintCells: test')
    console.log(printCells([[3, 2], [2, 3], [3, 3], [3, 4], [4, 4]]));
    
}


function seed() {
    let i = 0; n = arguments.length, a = arguments;
    const argumentsAsArray = [];
    for (i = 0; i < n; i++) {
        argumentsAsArray.push(a[i]);
    }
    return argumentsAsArray;
}

function same([x, y], [j, k]) {return (x === j) && (y === k)}

// The game state to search for `cell` is passed as the `this` value of the function.
//The game state is an array of cells that are alive at a given point in time.
function contains(cell) {
    return this.some((c) => same(c, cell) === true)
}

const printCell = (cell, gameState) => {
    //Remark: state is an array of cells; each cell is a 2D array of non-negative integers.
    // The gameState is passed as a parameter to the contains.call method because we are 
    //checking that the cell belongs to a particular gameState.
    const alive = contains.call(gameState, cell);
    if (alive) {
 
        return '\u25A3';
    }

    else {

        return '\u25A2';
    }
        
};

const corners = (gameState = []) => {

    if (gameState.length === 0)
        return { bottomLeft: [0, 0], topRight: [0, 0]}
    
    const reducerTopRight = (topRight, inputCell) => {
        const x = (inputCell[0] > topRight[0])  ? inputCell[0] : topRight[0];
        const y = (inputCell[1] > topRight[1])  ? inputCell[1] : topRight[1];
        return [x, y];
    };
    const reducerTopRightResult = gameState.reduce(reducerTopRight);

    const reducerBottomLeft = (bottomLeft, inputCell) => {
        const x = (inputCell[0] < bottomLeft[0]) ? inputCell[0] : bottomLeft[0];
        const y = (inputCell[1] < bottomLeft[1]) ? inputCell[1] : bottomLeft[1];
        return [x, y];
    };
    const reducerBottomLeftResult = gameState.reduce(reducerBottomLeft);

    const retVal =  {
        bottomLeft: reducerBottomLeftResult, topRight: reducerTopRightResult
    };
   
    return retVal;
    
};

const printCells = (gameState) => {
    const { bottomLeft, topRight } = corners(gameState);
    const rowCount = topRight[1] - bottomLeft[1] + 1;
    const columnCount = topRight[0] - bottomLeft[0] + 1;
    const printSpace = () => '\u2000';
    const printNewLine = () => '\n';
    const aChar = [];
    for (let rowNumber = rowCount - 1; rowNumber >= 0; rowNumber--) {
        for (let columnNumber = 0; columnNumber <= columnCount - 1; columnNumber++) {            
            const cellToTest = [bottomLeft[0] + columnNumber, bottomLeft[1] + rowNumber];
            aChar.push(printSpace());
            aChar.push(printCell(cellToTest, gameState));           
        }
        aChar.push(printNewLine());
    }
    strRep = aChar.join("");
    return strRep;
        
};

const getNeighborsOf = ([x, y]) => {
    let result = [];
    result.push([x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x, y - 1]);
    return result;
};

const getLivingNeighbors = (cell, gameState) => {
    const neighbours = getNeighborsOf(cell);      
    return neighbours.filter(contains.bind(gameState));
};

const willBeAlive = (cell, gameState) => {
    const livingNeighbours = getLivingNeighbors(cell, gameState);
    const livingNeighboursCount = livingNeighbours.length;
   
    if (livingNeighboursCount === 3)
        return true;
    const isAlive = contains.call(gameState, cell);
    if (isAlive && livingNeighboursCount === 2)
        return true;
    else
        return false;
};

const calculateNext = (gameState) => {
    const { bottomLeft, topRight } = corners(gameState);
    const bottomLeftNew = [bottomLeft[0] - 1, bottomLeft[1] - 1];
    const topRightNew = [topRight[0] + 1, topRight[1] + 1];
    

    const gameStateNew = [];
    const rowCount = topRightNew[1] - bottomLeftNew[1] + 1;
    const columnCount = topRightNew[0] - bottomLeftNew[0] + 1;
    for (let rowNumber = 0; rowNumber <= rowCount - 1; rowNumber++)
        for (let columnNumber = 0; columnNumber <= columnCount - 1; columnNumber++) {          
            const cellToTest = [bottomLeftNew[0] + columnNumber, bottomLeftNew[1] + rowNumber];
            const willBeAlive2 = willBeAlive(cellToTest, gameState);
       
            if (willBeAlive2 === true) {
                 gameStateNew.push(cellToTest);
            }
                
        }
    return gameStateNew;
};

const iterate = (gameState, iterations) => {
    const iterateResult = [];
    iterateResult.push(gameState);
    while (iterations > 0) {
        const nextGameState = calculateNext(gameState);
        iterateResult.push(nextGameState);
        iterations--;
    }
    return iterateResult;
};

const main = (pattern, iterations) => {
    
    
    testCorners();
    testPrintCells();

    console.log('entering main...')

    let startingPattern;
    switch (pattern){
        case 'rpentomino':
            startingPattern = startPatterns.rpentomino;
            break;
        case 'glider':
            startingPattern = startPatterns.glider;
            break;
        case 'square':
            startingPattern = startPatterns.square;
            break;
        default:
            throw new Error('Invalid start state');
            break;
    };
    const printNewLine = () => '\n';
    const iterationsResult = iterate(startingPattern, iterations);
    iterationsResult.forEach((gameState) => {
        const aStr = [];
        aStr.push(printCells(gameState));
        aStr.push(printNewLine());
        const strRep = aStr.join("");
        console.log(strRep);
    })

};

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