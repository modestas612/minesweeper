"use strict";
$(document).ready(function (){

var game = {
        standartSize: [20,14,44],
        boardLength: 20,
        boardHeight: 20,
        bombCount: 40,
        bombList: [],
        cellList: [],           // cia rasom, kuriame lauke kiek aplink bombu
        gameClickCount: 0,
        gameStatus: true
    };

game = resetGame( game );

$('.content').html( renderBoard( game.boardLength, game.boardHeight, game.standartSize ) );

$('.content').on('click', '.cell', function(){
    if ( !game.gameStatus ) {
        return;
    }
    var index = $(this).index(),
        x = index % game.boardLength,
        y = (index - x) / game.boardLength;

    if ( game.gameClickCount === 0 ) {
        if ( game.boardLength > 0 &&
             game.boardHeight > 0 &&
             game.boardLength*game.boardHeight > 1 ) {
            game.bombList = generateBombs( index, game.boardHeight*game.boardLength, game.bombCount );
        } else {
            game.bombList = generateBombs( index, game.standartSize[0]*game.standartSize[1], game.standartSize[2] );
            game.boardLength = game.standartSize[0];
            game.boardHeight = game.standartSize[1];
            game.bombCount = game.standartSize[2];
        }
        // skaiciuojame langeliu vertes, a.k.a kiek aplink bombu
        countBombsAround( x, y, game.bombList, game.boardLength, game.boardHeight );
    } else {
        // sekantys paspaudimai...
        if ( game.bombList.indexOf(index) > -1 ) {
            // mirtis
            game.gameStatus = false;
            $('.status').html('<div class="status-box"><i class="fa fa-frown-o" aria-hidden="true"></i></div>');
            dropTheBombs( game.bombList );
        } else {
            // continue... :)
            countBombsAround( x, y, game.bombList, game.boardLength, game.boardHeight );
        }
    }
    isItWin( game.bombCount, game.boardHeight, game.boardLength );

    
    game.gameClickCount++;
});

$('.status').click(function(){
    game = resetGame( game );
});

$('.content').on('contextmenu', '.cell', function(e){
    e.preventDefault();
    if ( $(this).hasClass('fa-flag') ) {
        $('#counter').text( parseInt($('#counter').text())+1 );
    } else {
        $('#counter').text( parseInt($('#counter').text())-1 );
    }
    $(this).toggleClass('fa fa-flag');

    $('.fa-flag').bind('click','.cell', function(){
        if( $(this).hasClass('fa-flag') ){
            return false;
        }
    });
});

$('.content').on('click', '#langelis', function(){
    $(".cell:not(:empty())").removeClass('hidden');
    $(".cell:contains('0')").text("");

    $('.status').click(function() {
        location.reload();
    });
});

});