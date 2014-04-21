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

  var x;
  var y;
  var newX;
  var newY;
  var differenceX;
  var differenceY;

  var team1count = 12;
  var team2count = 12;

  var $team1spoils = $('#team1spoils');
  var $team2spoils = $('#team2spoils');

  var jumpCount = 0;

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
    x = currentPiece.data('x');
    y = currentPiece.data('y');

    $newSquare.append($checker).addClass('current checker');
    $('.possibleMove').removeClass('possibleMove');

    isKing();
    wasJump();

    // while ( jumpCount < 0 ){
    //   findMultJumps();
    //   wasJump();
    // }

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

  function wasJump() {
    differenceX = newX - x;
    differenceY = newY - y;

    if ( Math.abs(differenceX) === 2 || Math.abs(differenceY) === 2){
      removeJumped();
    }
  }

  function removeJumped(){
    var $jumpedPiece;

    if (differenceY === 2){
      if (differenceX === 2){
        $jumpedPiece = $('td.square[data-x=' + (x + 1) + '][data-y=' + (y + 1) + ']');
      } else {
        $jumpedPiece = $('td.square[data-x=' + (x - 1) + '][data-y=' + (y + 1) + ']');
      }
    } else {
      if (differenceX === 2){
        $jumpedPiece = $('td.square[data-x=' + (x + 1) + '][data-y=' + (y - 1) + ']');
      } else {
        $jumpedPiece = $('td.square[data-x=' + (x - 1) + '][data-y=' + (y - 1) + ']');
      }
    }

    $jumpedPiece.addClass('jumped');
    var $spoils = $('.jumped > img');
    var jumpedClass = $spoils.attr('class');


    if ( jumpedClass === 'player1' || jumpedClass === 'player1king') {
      team1count--;
      $team2spoils.append($spoils);
      console.log(team1count);
    } else if ( jumpedClass === 'player2' || jumpedClass === 'player2king') {
      team2count--;
      $team1spoils.append($spoils);
    }

    $('.jumped').removeClass('checker');
    $('.jumped').removeClass('jumped');
    jumpCount++;
  }

  function switchPlayer() {
    var currentPlayer = $('.current');
    var $upNext = $('.checker:not(.current)');


    if ( team1count !== 0 && team2count !== 0) {
      currentPlayer.removeClass('current');
      $upNext.addClass('current');
    } else {
      if ( team1count === 0 ){
        alert ('Player 2 wins!');
      } else {
        alert ('Player 1 wins!');
      }
    }
  }

  function selectPiece(){
    $('.selected').removeClass('selected');
    currentPiece = $(this);
    currentPiece.addClass('selected');

    findPossibleMoves();
  }

  function findPossibleMoves(){
    $('.possibleMove').removeClass('possibleMove');
    x = currentPiece.data('x');
    y = currentPiece.data('y');
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
        if (className === 'player1king' && comparePieceClass !== 'player1') {
          $checkJumpPossible = $('td.square[data-x=' + ((2 * l) + x) + '][data-y=' + ((2 * k) + y) + ']');
          if (!$checkJumpPossible.hasClass('checker')){
            $checkJumpPossible.addClass('possibleMove');
          }
        } else if (className === 'player2king' && comparePieceClass !== 'player2') {
          $checkJumpPossible = $('td.square[data-x=' + ((2 * l) + x) + '][data-y=' + ((2 * k) + y) + ']');
          if (!$checkJumpPossible.hasClass('checker')){
            $checkJumpPossible.addClass('possibleMove');
          }
        } else if (className === 'player1' && comparePieceClass !== 'player1king'){
          $checkJumpPossible = $('td.square[data-x=' + ((2 * i) + x) + '][data-y=' + (2 + y) + ']');
          if (!$checkJumpPossible.hasClass('checker')){
            $checkJumpPossible.addClass('possibleMove');
          }
        } else if (className === 'player2' && comparePieceClass !== 'player2king') {
          $checkJumpPossible = $('td.square[data-x=' + ((2 * j) + x) + '][data-y=' + (y - 2) + ']');
          if (!$checkJumpPossible.hasClass('checker')){
            $checkJumpPossible.addClass('possibleMove');
          }
        }
      }

      $('.jumpCheck').removeClass('jumpCheck');
    }

    // function findMultJumps(){
    //     $checkPossible.addClass('jumpCheck');
    //     var comparePieceClass = $('.jumpCheck > img').attr('class');
    //     var $checkJumpPossible;
    //
    //     if (comparePieceClass !== className){
    //       if (className === 'player1king' && comparePieceClass !== 'player1') {
    //         $checkJumpPossible = $('td.square[data-x=' + ((2 * l) + x) + '][data-y=' + ((2 * k) + y) + ']');
    //         if (!$checkJumpPossible.hasClass('checker')){
    //           $checkJumpPossible.addClass('possibleMove');
    //         }
    //       } else if (className === 'player2king' && comparePieceClass !== 'player2') {
    //         $checkJumpPossible = $('td.square[data-x=' + ((2 * l) + x) + '][data-y=' + ((2 * k) + y) + ']');
    //         if (!$checkJumpPossible.hasClass('checker')){
    //           $checkJumpPossible.addClass('possibleMove');
    //         }
    //       } else if (className === 'player1' && comparePieceClass !== 'player1king'){
    //         $checkJumpPossible = $('td.square[data-x=' + ((2 * i) + x) + '][data-y=' + (2 + y) + ']');
    //         if (!$checkJumpPossible.hasClass('checker')){
    //           $checkJumpPossible.addClass('possibleMove');
    //         }
    //       } else if (className === 'player2' && comparePieceClass !== 'player2king') {
    //         $checkJumpPossible = $('td.square[data-x=' + ((2 * j) + x) + '][data-y=' + (y - 2) + ']');
    //         if (!$checkJumpPossible.hasClass('checker')){
    //           $checkJumpPossible.addClass('possibleMove');
    //         }
    //       }
    //     }
    //
    //     $('.jumpCheck').removeClass('jumpCheck');
    // }
    //
    //   jumpCount = 0;
    // }
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
