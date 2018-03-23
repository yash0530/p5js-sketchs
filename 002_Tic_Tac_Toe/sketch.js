board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
circle = true;
enterActive = false;
mouseActive = true;
var size;

function setup() {
    // ensuring that the maximum possible square is our game board
    size = windowHeight > windowWidth ? windowWidth : windowHeight;
    createCanvas(size, size);
    background(51);
    drawBoard();
}

function windowResized() {
    size = windowHeight > windowWidth ? windowWidth : windowHeight;
    createCanvas(size, size);
    background(51);
    drawBoard();
}

function drawBoard() {
    
    // printing the borders
    stroke(255);
    line((size / 3), 0, (size / 3), size);
    line(((2 * size) / 3), 0, ((2 * size) / 3), size);
    line(0, (size / 3), size, (size / 3));
    line(0, ((2 * size) / 3), size, ((2 * size) / 3));

    for (var i = 0; i < 9; i++) {

        // getting x and y ( centers of blocks )
        if ((i + 1) % 3 === 1) {
            x = (size / 6);
            y = (size / 6) + (((i + 1) % 3) - 1 + (int)((i + 1) / 3)) * (size / 3);
        }
        else if ((i + 1) % 3 === 2) {
            x = (size / 2);
            y = (size / 6) + (((i + 1) % 3) - 2 + (int)((i + 1) / 3)) * (size / 3);
        }
        else {
            x = ((5 * size) / 6);
            y = (size / 6) + (((i + 1) % 3) - 1 + (int)((i + 1) / 3)) * (size / 3);
        }

        // printing symbols
        if (board[i] === 0) {
            ellipse( x, y, (size / 6), (size / 6));
        }
        else if (board[i] === 1) {
            strokeWeight(size / 50);
            line( x - (size / 12), y - (size / 12), x + (size / 12), y + (size / 12));
            line(x + (size / 12), y - (size / 12), x - (size / 12), y + (size / 12));
            strokeWeight(1);
        }
        else {}
    }
}

function updateBoard(n) {
    if (board[n] === -1) {
        if(circle) {
            board[n] = 0;
            circle = false;
            drawBoard();
            if (hasWon(0)) {
                reset(0);
            }
            else if (over()) {
                reset(-1);
            }
        }
        else {
            board[n] = 1;
            circle = true;
            drawBoard();
            if (hasWon(1)) {
                reset(1);
            }
            else if (over()) {
                reset(-1);
            }
        }
    }
}

function mousePressed() {
    if (mouseActive) {
        console.log(mouseX, mouseY);

        // getting the block number when mouse is pressed
        var n;
        if (mouseX < (size / 3)) {
            if (mouseY < (size / 3)) {
                n = 0;
            }
            else if (mouseY < ((2 * size) / 3)) {
                n = 3;
            }
            else if (mouseY < size) {
                n = 6;
            }
        }
        else if (mouseX < ((2 * size) / 3)) {
            if (mouseY < (size / 3)) {
                n = 1;
            }
            else if (mouseY < ((2 * size) / 3)) {
                n = 4;
            }
            else if (mouseY < size) {
                n = 7;
            }
        }
        else if (mouseX < size) {
            if (mouseY < (size / 3)) {
                n = 2;
            }
            else if (mouseY < ((2 * size) / 3)) {
                n = 5;
            }
            else if (mouseY < size) {
                n = 8;
            }
        }

        updateBoard(n);
        console.log(n);
    }
}

function hasWon(player) {
    if (board[0] == player && board[1] == player && board[2] == player) {
        return true;
    }
    else if (board[3] == player && board[4] == player && board[5] == player) {
        return true;
    }
    else if (board[6] == player && board[7] == player && board[8] == player) {
        return true;
    }
    else if (board[0] == player && board[3] == player && board[6] == player) {
        return true;
    }
    else if (board[1] == player && board[4] == player && board[7] == player) {
        return true;
    }
    else if (board[2] == player && board[5] == player && board[8] == player) {
        return true;
    }
    else if (board[0] == player && board[4] == player && board[8] == player) {
        return true;
    }
    else if (board[2] == player && board[4] == player && board[6] == player) {
        return true;
    }
    return false;
}

function reset(player) {
    board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    createCanvas(size, size);
    background(51);

    fill(255);
    textSize(size / 18.75);
    if (player === 0) {
        text("Player O has Won. !!\n\n\n\t\t\tPress Enter", (size / 4), (size / 2));
        console.log("Player O Won");
    }
    else if (player === 1) {
        text("Player X has Won. !!\n\n\n\t\t\tPress Enter", (size / 4), (size / 2));
        console.log("Player X Won");
    }
    else if (player == -1) {
        text("____ No result ____\n\n\n\t\t\tPress Enter", (size / 4), (size / 2));
        console.log("Draw");
    }

    enterActive = true;
    mouseActive = false;
}

function keyPressed() {
    if (enterActive && keyCode === ENTER) {
        enterActive = false;
        mouseActive = true;
        createCanvas(size, size);
        background(51);
        drawBoard();
    }
}

function over() {
    for (var i = 0; i < 9; i++) {
        if (board[i] == -1) {
            return false;
        }
    }
    return true;
}