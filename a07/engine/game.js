/*
Add your code for Game here
 */

export default class Game{
    constructor(size) {
        this.size = size;
        this.score = 0;
        this.moveL = [];
        this.winL = [];
        this.loseL = [];
        this.won = false;
        this.over = false;
        this.listen = true;
        this.newGameBoard(size);

    }

   setupNewGame() {
        this.newGameBoard(this.size);
        this.score = 0;
        this.won = false;
        this.over = false;
        this.listen = true;
        this.moveL = [];
        this.winL = [];
        this.loseL = [];
    }

    newGameBoard(size){
        this.board = new Array(size*size).fill(0);
        let rand1 = Math.floor(Math.random()*this.board.length);
        let rand2 = Math.floor(Math.random()*this.board.length);
        let probability = [2,2,2,2,2,2,2,2,2,4];
        let rand3 = Math.floor(Math.random()*probability.length);
        let rand4 = Math.floor(Math.random()*probability.length);
        if(rand1 == rand2){
            if(rand1 == this.board.length - 1){
                rand1--;
            }else{
                rand1++;
            }
        }
        
        this.board[rand1] = probability[rand3];
        this.board[rand2] = probability[rand4];
    }

    loadGame(gameState){
        this.board = gameState.board;
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;
        this.listen = true;
    }

    boardChanged(original, test){
        for(let i = 0; i < original.length; i++){
            if(original[i] != test[i]){
                return true;
            }
        }
        return false;
    }

    move(direction){
        let curScore = this.score;
        let curBoard = this.board.slice(0);
        let join = function(a){
            let previous = {
                num: -1,
                ind: -1
            };
            let curInd = 0;
            let curNum = -1
            while(curInd < a.length){
                curNum = a[curInd];
                if(curNum == previous.num){
                    curScore += (previous.num*2);
                    a[previous.ind] = previous.num * 2;
                    a[curInd] = 0;
                    previous.num = -1;
                    previous.ind = -1
                } else if(curNum != 0){
                    previous.num = curNum;
                    previous.ind = curInd;
                }
                curInd++;
            }
            return a;
        }
        let joinRight = function(a){
            return join(a.reverse()).reverse();
        }
        let shift = function(a){
            let temp = [];
            a.forEach(element => {
                if(element != 0){
                    temp.push(element);
                }
            })
            while(temp.length < a.length){
                temp.push(0);
            }
            return temp;
        }
        let shiftRight = function(a){
            return shift(a.reverse()).reverse();
        }

        let makeArray_row = function(a){
            let createBoard = [];
            a.forEach(element => {
                element.forEach(element2 =>{
                    createBoard.push(element2);
                    });
                });
            return createBoard;
        }

        let makeArray_col = function(a){
            let createBoard = [];
            let h = 0;
            while(h < a.length){
                a.forEach(element => {
                        createBoard.push(element[h]);
                });
            h++;
            }
            return createBoard;
        }

        let postMove = [];
        let info = [];
        let d1ind = 0;
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                info.push({
                    row: i,
                    col: j,
                    ind: d1ind,
                    val: curBoard[d1ind]
                });
                d1ind++;
            }
        }

        if(direction == "left" || direction == "right"){
            let row = 0;
            while(row < this.size){
                let curRow = [];
                let rowIndMatch = info.filter(h=>h.row==row);
                rowIndMatch.forEach(element => curRow.push(element.val));
                if(direction == "left"){
                    curRow = join(curRow);
                    curRow = shift(curRow);
                }else{
                    curRow = joinRight(curRow);
                    curRow = shiftRight(curRow);
                }
                postMove.push(curRow);
                row++;

            }

            this.board = makeArray_row(postMove);

        }else{
            let col = 0;
            while(col < this.size){
                let curCol = [];
                let colIndMatch = info.filter(h=>h.col==col);
                colIndMatch.forEach(element => curCol.push(element.val));
                if(direction == "up"){
                    curCol = join(curCol);
                    curCol = shift(curCol);
                }else{
                    curCol = joinRight(curCol);
                    curCol = shiftRight(curCol);
                }
                col++;
                postMove.push(curCol);
            }
            

            this.board = makeArray_col(postMove);
            
        }
        if(this.boardChanged(curBoard, this.board)){
            this.addTile();
        } 
        this.score = curScore;
        if(this.listen){
            this.gameOver();
            if(!this.movesPossible(this.board)){
                this.moveL.forEach(element => element(this.getGameState()));
        }
    }

    }

    didWin(board){
        for(let i = 0; i < this.board.length; i++){
                if(board[i] == 2048){
                    return true;
                }
            }
        return false;
    }

    movesPossible(board){
        for(let i = 0; i < this.board.length; i++){
            if(board[i] == 0){
                return false;
            }
        }
        this.listen = false;
        let original = this.board.slice(0);
        let originalScore = this.score;

        this.move("up");
        let up = this.board.slice(0);
        this.board = original.slice(0);
        this.move("down");
        let down = this.board.slice(0);
        this.board = original.slice(0);
        this.move("left");
        let left = this.board.slice(0);
        this.board = original.slice(0);
        this.move("right");
        let right = this.board.slice(0);
        this.board = original.slice(0);

        if(this.boardChanged(original, up)){
            this.score = originalScore;
            this.listen = true;
            return false;
        } else if(this.boardChanged(original, down)){
            this.score = originalScore;
            this.listen = true;
            return false;
        } else if(this.boardChanged(original, left)){
            this.score = originalScore;
            this.listen = true;
            return false;
        }else if(this.boardChanged(original, right)){
            this.score = originalScore;
            this.listen = true;
            return false;
        } else {
            this.score = originalScore;
            this.listen = true;
            return true;
        }
    }

    gameOver(){
        if(this.didWin(this.board)){
            this.won = true;
        } 
        if(this.movesPossible(this.board)){
            this.over = true;
        }
        if(this.over){
            this.loseL.forEach(element => element(this.getGameState()));
        }
        if(this.won){
            this.winL.forEach(element => element(this.getGameState()));
        }
        return(this.won || this.over);
    }

    addTile(){
        let empty = false;
        let rand1 = Math.floor(Math.random()*this.board.length);
        let probability = [2,2,2,2,2,2,2,2,2,4];
        let rand3 = Math.floor(Math.random()*probability.length);
        if(this.board[rand1] == 0){
            this.board[rand1] = probability[rand3]
        } else {
            while(!empty){
                rand1 = Math.floor(Math.random()*this.board.length);
                if(this.board[rand1] == 0){
                    this.board[rand1] = probability[rand3];
                    empty = true;
                }
            }
        }  
    }



    toString(){
        let boardString = "";
        let i = 0;
        this.board.forEach(element => {
            boardString += ("[" + element + "]");
            i++;
            if(i % this.size == 0){
                boardString += "\n";
            } else {
                boardString += " ";
            }
        });
        return boardString;
    }

    onMove(callback){
        this.moveL.push(callback);
    }

    onWin(callback){
        this.winL.push(callback);
    }

    onLose(callback){
        this.loseL.push(callback);
    }
    
    getGameState(){
       return {
           board: this.board,
           score: this.score,
           won: this.won,
           over: this.over
       }
    }
}