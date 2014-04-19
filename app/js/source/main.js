(function() {
  'use strict';

  $(document).ready(init);

  var image1 = '<img class="player1" src="./media/team1.png">';
  var image2 = '<img class="player2" src="./media/team2.png">';
  var currentPiece;
  // var jumpCount = 0;

  function init() {
        loadPieces();
        $('#game').on('click', '.playable.current.checker', selectPiece);
        $('#game').on('click', '.possibleMove', movePiece);
      }

  function movePiece(){
    var $checker = $('.selected > img');
    var $newSquare = $(this);

    $newSquare.append($checker).addClass('current checker');
    $('.possibleMove').removeClass('possibleMove');

    // isKing();
    // wasJump();
    //
    // if canJump = true
      // findPossibleJumps();

    // if canJump = false
    $('.selected').removeClass('selected current checker');


    if ($('.possibleMove').length === 0){
      switchPlayer();
    }
  }

  // function isKing() {
  //
  // }

  // function wasJump(jumpCount) {
  //   var x = currentPiece.data('x');
  //   var y = currentPiece.data('y');
  //   var newX = $newSquare.data('x');
  //   var newY = $newSquare.data('y');
  //   var differenceX = Math.abs(x) - Math.abs(newX);
  //   var differenceY = Math.abs(y) - Math.abs(newY);
  //
  //   if ( differenceX === 2 || differenceY === 2){
  //     removeJumped();
  //     jumpCount++;
  //   }
  //   remove jumpCheck class
  // }


  // function removeJumped(){
  //   find jumped piece
  //   if player1, add 1 to player2 pile
  //   if player2, add 1 to player1 pile
  //
  // }

  function switchPlayer() {
    var currentPlayer = $('.current');
    var upNext = $('.checker:not(.current)');

    currentPlayer.removeClass('current');
    upNext.addClass('current');
  }

  function selectPiece(){
    $('.selected').removeClass('selected');
    currentPiece = $(this);
    currentPiece.addClass('selected');

    findPossibleMoves();
  }

  function findPossibleMoves(){
    $('.possibleMove').removeClass('possibleMove');
    var x = currentPiece.data('x');
    var y = currentPiece.data('y');
    var className = $('.selected > img').attr('class');

    //if className = player1king, player2king
    for (var i = -1; i < 2; i+=2){
      for (var j = -1; j < 2; j+=2){
        var $checkPossible = $('td.square[data-x=' + (j + x) + '][data-y=' + (i + y) + ']');
        if (!$checkPossible.hasClass('checker')){
          $checkPossible.addClass('possibleMove');
        } else {
          findPossibleJumps();
        }
      }

    //if player1
    //if player2

    }

    function findPossibleJumps(){

      //if className = player1king, player2king
      $checkPossible.addClass('jumpCheck');
      var comparePieceClass = $('.jumpCheck > img').attr('class');
      if (comparePieceClass !== className){
        var $checkJumpPossible = $('td.square[data-x=' + ((2 * j) + x) + '][data-y=' + ((2 * i) + y) + ']');
        if (!$checkJumpPossible.hasClass('checker')){
          $checkJumpPossible.addClass('possibleMove');
        }
      }

      $('.jumpCheck').removeClass('jumpCheck');

      //if player1
      //if player2
    }


    // var listMoves = $('.possibleMove');
    // var listMovesLength = listMoves.length;
    // console.log(listMoves);
    // console.log(listMovesLength);
  }



  function loadPieces(){
    var $spaces = $('.playable');
    var spaceCount = $spaces.length;
    var countBack = spaceCount - 12;
    var whichSpace;

    for (var i = 0; i < 12; i++){
      whichSpace = $spaces[i];
      $(whichSpace).addClass('current checker').append(image1);
    }
    for (var j = countBack; j < spaceCount ; j++){
      whichSpace = $spaces[j];
      $(whichSpace).addClass('checker').append(image2);
    }

  }

}) ();
