var _ = require('underscore');

displaySolutions = false;
nQueensSize = 0;

if(process.argv.length >= 3) {
    nQueensSize = process.argv[2];

    if((process.argv.length == 4) && (process.argv[3] === "-d")) {
        displaySolutions = true;
    }

}
else {
    console.log("usage: node javascript_n_queens_solver.js BOARD_SIZE [-d]");
    process.exit();
}

function displayQueens(solution) {
    for(var row=0; row < solution.length; row++) {
        var line = "";
        for(var col=0; col < solution.length; col++) {
            var elementOut = "_ ";
            _.each(solution, function(coordinate) {
                if((coordinate[0] == col) && (coordinate[1] == row)) {
                    elementOut = "Q ";
                }
            });
            line+=elementOut;
        }
        console.log(line);
    }
}


function isValidPosition(nQueenPositions, newPosition) {

    var isValid = true;
    _.each(nQueenPositions, function(existingPosition) {
        if((existingPosition[1] == newPosition[1]) || (existingPosition[0] == newPosition[0])) {
            isValid = false;
        }

        rowDifference = Math.abs(newPosition[1]-existingPosition[1]);
        columnDifference = Math.abs(newPosition[0]-existingPosition[0]);

        //console.log(rowDifference, columnDifference);

        if(rowDifference == columnDifference) {
            isValid = false;
        }
    });

    return isValid;
}

function solve(nQueensSize, nQueenPositions, currentColumn) {
    if((currentColumn == nQueensSize) && (nQueenPositions.length == nQueensSize)) {
        return [nQueenPositions];
    }

    var solutions = [];

    for(var row = 0; row < nQueensSize; row++) {
        var newPosition = [currentColumn, row];

        if(isValidPosition(nQueenPositions,newPosition)) {
            var newNQueenPositions = nQueenPositions.slice(0);
            newNQueenPositions.push(newPosition);

            solution = solve(nQueensSize, newNQueenPositions, currentColumn+1);
            if(solution.length != 0) {
                Array.prototype.push.apply(solutions,solution);
            }
        }
    }

    return solutions;
}

var startTime = new Date();
var solutions = solve(nQueensSize, [], 0);
var endTime = new Date();

var elapsedTime = endTime.getTime()-startTime.getTime();

console.log("N-Queens Found " + solutions.length + " Solutions in " + elapsedTime +"ms on a " + nQueensSize + "x" + nQueensSize + " board.");


if(displaySolutions) {
    var counter = 1;
    _.each(solutions, function(solution) {
        console.log("Solution: " + counter);
        displayQueens(solution);
        counter++;
    });
}
