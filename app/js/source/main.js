(function() {
  'use strict';

  $(document).ready(init);

  var image1 = '<img class="checker player1" src="./media/team1.png">';
  var image2 = '<img class="checker player2" src="./media/team2.png">';
  var currentPiece;

  function init() {
        // $('#start').click(loadPieces);
        loadPieces();
        $('#game').on('click', '.playable.current.checker', selectPiece);
    // $('.checker').click(movePiece);
      }

  function selectPiece(){
    $('.selected').removeClass('selected');
    currentPiece = $(this);
    currentPiece.addClass('selected');

    findPossibleMoves();

    // movePiece()
    // occupied() if
    // clearPiece()

  }

  function findPossibleMoves(){
    $('.possibleMove').removeClass('possibleMove');
    var x = currentPiece.data('x');
    var y = currentPiece.data('y');

    for (var i = -1; i < 2; i+=2){
      for (var j = -1; j < 2; j+=2){
        var $checkPossible = $('td.square[data-x=' + (j + x) + '][data-y=' + (i + y) + ']');
        if (!$checkPossible.hasClass('checker')){
          $checkPossible.addClass('possibleMove');
        }
      }
    }

    var listMoves = $('.possibleMove');
    var listMovesLength = listMoves.length;
    console.log(listMoves);
    console.log(listMovesLength);
  }



  function loadPieces(){
    var $spaces = $('.playable');
    // $spaces.removeClass('current checker player1 player2');
    var spaceCount = $spaces.length;
    var countBack = spaceCount - 12;
    var whichSpace;


    for (var i = 0; i < 12; i++){
      whichSpace = $spaces[i];
      $(whichSpace).addClass('current checker player1').append(image1);
    }
    for (var j = countBack; j < spaceCount ; j++){
      whichSpace = $spaces[j];
      $(whichSpace).addClass('checker player2').append(image2);
    }

  }

  // function movePiece(){
  //   // checks if occupied
  //   // checks team rules or if king
  // }

}) ();
