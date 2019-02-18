"use strict";

function renderBoard( length, height, standart ) {
    var HTML = '';
    if ( length > 0 && height > 0 && length*height > 1 ) {
        var count = length * height;
        for ( var i=0; i<count; i++ ) {
            HTML += '<div id="langelis" class="cell hidden"></div>';
        }
        $('.content').css('width', length*20+'px');
        return HTML;
    } else {
        $('.content').html( renderBoard( standart[0], standart[1], standart ) );

    }
}


function generateBombs( startingPoint, boardSize, bombCount ) {
    var bombList = [],
        skaicius = 0,
        i=0;
    while ( i<bombCount ) {
        skaicius = Math.floor( Math.random()*boardSize );
        if ( bombList.indexOf( skaicius ) === -1 &&
             startingPoint !== skaicius ) {
            bombList.push( skaicius );
            i++;
        }
    }
    return bombList;
}

function dropTheBombs( bombList ) {
    var kiek = bombList.length;
    for( var i=0; i<kiek; i++ ) {
        $('.cell').eq(bombList[i]).removeClass('hidden').addClass('fa fa-bomb');
    }
    return;
}


function resetGame( gameStatus ) {
    gameStatus.bombList = [];
    gameStatus.gameClickCount = 0;
    gameStatus.gameStatus = true;

    $('.cell').removeClass('red fa fa-flag').text('').addClass('hidden');
    $('.status').html('<div class="status-box"><i class="fa fa-smile-o" aria-hidden="true"></i></div>');
    $('#timer').text('000');
    $('#counter').text(gameStatus.bombCount);

    return gameStatus;
    
}

function countBombsAround( x, y, bombList, length, height ) {
    var count = 0,
        index = y*length+x;
        
    
    if ( x < 0 ||
         x >= length ||
         y < 0 ||
         y >= height ||
         $('.cell').eq(index).text() !== '' ) {
        return;
    }

    // kaire virsus
    if ( x-1 >= 0 &&
         y-1 >= 0 &&
         bombList.indexOf( index-length-1 ) > -1 ) {
        count++;
    }
    // centras virsus
    if ( x >= 0 &&
         y-1 >= 0 &&
         bombList.indexOf( index-length ) > -1 ) {
        count++;
    }
    // desine virsus
    if ( x+1 < length &&
         y-1 >= 0 &&
         bombList.indexOf( index-length+1 ) > -1 ) {
        count++;
    }
    // kaire centras
    if ( x-1 >= 0 &&
         y >= 0 &&
         bombList.indexOf( index-1 ) > -1 ) {
        count++;
    }
    // desine centras
    if ( x+1 < length &&
         y >= 0 &&
         bombList.indexOf( index+1 ) > -1 ) {
        count++;
    }
    // kaire apacia
    if ( x-1 >= 0 &&
         y+1 < height &&
         bombList.indexOf( index+length-1 ) > -1 ) {
        count++;
    }
    // centras apacia
    if ( x >= 0 &&
         y+1 < height &&
         bombList.indexOf( index+length ) > -1 ) {
        count++;
    }
    // desine apacia
    if ( x+1 < length &&
         y+1 < height &&
         bombList.indexOf( index+length+1 ) > -1 ) {
        count++;
    }
    $('.cell').eq(index).text(count);

    if ( count === 0 ) {
        countBombsAround( x-1, y-1, bombList, length, height );
        countBombsAround( x, y-1, bombList, length, height );
        countBombsAround( x+1, y-1, bombList, length, height );
        countBombsAround( x-1, y, bombList, length, height );
        countBombsAround( x+1, y, bombList, length, height );
        countBombsAround( x-1, y+1, bombList, length, height );
        countBombsAround( x, y+1, bombList, length, height );
        countBombsAround( x+1, y+1, bombList, length, height );
    }

    return;
}

function isItWin( bomb, height, length ) {
    var board = height * length,
        empty = 0;
    for ( var i=0; i<board; i++ ) {
        if ( $('.cell').eq(i).text() === '' ) {
            empty++;
        }
    }

    for ( var c of $('.cell') ) {
        if ( c.innerText === '' ) {
            empty++;
        }
    }

    if ( empty === bomb ) {
        alert('VICTORY !!!');
    }
    return;
}

