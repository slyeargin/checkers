(function() {
  'use strict';

  $(document).ready(init);

  var image1 = '<img class="player1" src="./media/team1.png">';
  var image2 = '<img class="player2" src="./media/team2.png">';
  var image1king = '<img class="player1king" src="./media/team1king.png">';
  var image2king = '<img class="player2king" src="./media/team2king.png">';
  var currentPiece;
  var className;
  var $checker;

  // var x;
  // var y;
  var newX;
  var newY;

  // var jumpCount = 0;

  function init() {
        loadPieces();
        $('#game').on('click', '.playable.current.checker', selectPiece);
        $('#game').on('click', '.possibleMove', movePiece);
      }

  function movePiece(){
    $checker = $('.selected > img');
    var $newSquare = $(this);
    newX = $newSquare.data('x');
    newY = $newSquare.data('y');

    $newSquare.append($checker).addClass('current checker');
    $('.possibleMove').removeClass('possibleMove');

    isKing();
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

  function isKing() {
    if (className === 'player1' && newY === 7){
      $checker.replaceWith(image1king);
      $checker.addClass('current');
    } else if (className === 'player2' && newY === 0){
      $checker.replaceWith(image2king);
      $checker.addClass('current');
    }
  }

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
    className = $('.selected > img').attr('class');
    var $checkPossible;

    if (className === 'player1king' || className === 'player2king') {
      for (var k = -1; k < 2; k+=2){
        for (var l = -1; l < 2; l+=2){
          $checkPossible = $('td.square[data-x=' + (l + x) + '][data-y=' + (k + y) + ']');
          if (!$checkPossible.hasClass('checker')){
            $checkPossible.addClass('possibleMove');
          } else {
            findPossibleJumps();
          }
        }
      }
    } else if (className === 'player1'){
      for (var i = -1; i < 2; i+=2){
        $checkPossible = $('td.square[data-x=' + (i + x) + '][data-y=' + (y + 1) + ']');
        if (!$checkPossible.hasClass('checker')){
          $checkPossible.addClass('possibleMove');
        } else {
          findPossibleJumps();
        }
      }
    } else if (className === 'player2'){
      for (var j = -1; j < 2; j+=2){
        $checkPossible = $('td.square[data-x=' + (j + x) + '][data-y=' + (y - 1) + ']');
        if (!$checkPossible.hasClass('checker')){
          $checkPossible.addClass('possibleMove');
        } else {
          findPossibleJumps();
        }
      }
    }



    function findPossibleJumps(){
      $checkPossible.addClass('jumpCheck');
      var comparePieceClass = $('.jumpCheck > img').attr('class');
      var $checkJumpPossible;

      if (comparePieceClass !== className){
        if (className === 'player1king' || className === 'player2king') { //if className = player1king, player2king
          $checkJumpPossible = $('td.square[data-x=' + ((2 * j) + x) + '][data-y=' + ((2 * i) + y) + ']');
        } else if (className === 'player1'){
          $checkJumpPossible = $('td.square[data-x=' + ((2 * i) + x) + '][data-y=' + (2 + y) + ']');
        } else if (className === 'player2') {
          $checkJumpPossible = $('td.square[data-x=' + ((2 * j) + x) + '][data-y=' + (y - 2) + ']');
        }

        if (!$checkJumpPossible.hasClass('checker')){
          $checkJumpPossible.addClass('possibleMove');
        }
      }

      $('.jumpCheck').removeClass('jumpCheck');
    }
  }


    // var listMoves = $('.possibleMove');
    // var listMovesLength = listMoves.length;
    // console.log(listMoves);
    // console.log(listMovesLength);




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
