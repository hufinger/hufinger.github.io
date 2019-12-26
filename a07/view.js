import Game from "./engine/game.js";

let game = new Game(4);

function renderGame(game){
    $('#tile1').text(game.board[0]);
    $('#tile1').css('background-color', updateBackgroundColor(game.board[0]));
    $('#tile2').text(game.board[1]);
    $('#tile2').css('background-color', updateBackgroundColor(game.board[1]));
    $('#tile3').text(game.board[2]);
    $('#tile3').css('background-color', updateBackgroundColor(game.board[2]));
    $('#tile4').text(game.board[3]);
    $('#tile4').css('background-color', updateBackgroundColor(game.board[3]));
    $('#tile5').text(game.board[4]);
    $('#tile5').css('background-color', updateBackgroundColor(game.board[4]));
    $('#tile6').text(game.board[5]);
    $('#tile6').css('background-color', updateBackgroundColor(game.board[5]));
    $('#tile7').text(game.board[6]);
    $('#tile7').css('background-color', updateBackgroundColor(game.board[6]));
    $('#tile8').text(game.board[7]);
    $('#tile8').css('background-color', updateBackgroundColor(game.board[7]));
    $('#tile9').text(game.board[8]);
    $('#tile9').css('background-color', updateBackgroundColor(game.board[8]));
    $('#tile10').text(game.board[9]);
    $('#tile10').css('background-color', updateBackgroundColor(game.board[9]));
    $('#tile11').text(game.board[10]);
    $('#tile11').css('background-color', updateBackgroundColor(game.board[10]));
    $('#tile12').text(game.board[11]);
    $('#tile12').css('background-color', updateBackgroundColor(game.board[11]));
    $('#tile13').text(game.board[12]);
    $('#tile13').css('background-color', updateBackgroundColor(game.board[12]));
    $('#tile14').text(game.board[13]);
    $('#tile14').css('background-color', updateBackgroundColor(game.board[13]));
    $('#tile15').text(game.board[14]);
    $('#tile15').css('background-color', updateBackgroundColor(game.board[14]));
    $('#tile16').text(game.board[15]);   
    $('#tile16').css('background-color', updateBackgroundColor(game.board[15]));
}

function updateBackgroundColor(num){
    switch (num) {
        case 0: return '#ffffff';
        case 2: return '#13294B';
        case 4: return '#1d3659';
        case 8: return '#284466';
        case 16: return '#325174';
        case 32: return '#3d5f82';
        case 64: return '#476c90';
        case 128: return '#51799d';
        case 256: return '#5c87ab';
        case 512: return '#6694b9';
        case 1024: return '#71a2c6';
        case 2048: return '#7BAFD4';
        case 4096: return '#ffffff';
    }
}

function getScore(game){
    $('#curScore').text("Score: " + game.score);
}

function resetGame(){
    game.setupNewGame();
    renderGame(game);
    getScore(game);
    $('#won').empty();
    $('#lost').empty();
    

}

function gameWonLost(game){
    if(game.won){
        $('#won').text("CONGRAGULATIONS YOU HAVE BEATEN THE GAME! Reset to play again");
    }else if(game.over){
        $('#lost').text("Unfortunately, you need to try again. Press the reset button above.")
    }

}

renderGame(game); 

$(document).keydown(function(event){
    if(event.which == 37){
        game.move('left');
    } else if(event.which == 38){
        game.move('up');
    } else if(event.which == 39){
        game.move('right');
    }else {
        game.move('down');
    }
    getScore(game);
    renderGame(game);
    gameWonLost(game);
});

$("#reset").click(resetGame)


