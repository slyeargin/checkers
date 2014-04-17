(function() {
  'use strict';

  $(document).ready(init);

  function init() {
        $('#start').click(loadPieces);
    // $('.checker').click(movePiece);
      }

  function loadPieces(){
    var $spaces = $('.playable');
    var spaceCount = $spaces.length;
    var countBack = spaceCount - 12;
    var whichSpace;
    var image1 = '<img class="checker player1" src="./media/team1.png">';
    var image2 = '<img class="checker player2" src="./media/team2.png">';


    for (var i = 0; i < 12; i++){
      whichSpace = $spaces[i];
      $(whichSpace).addClass('current checker player1').append(image1);
    }

    console.log(spaceCount);
    console.log(countBack);
    for (var j = countBack; j < spaceCount ; j++){
      whichSpace = $spaces[j];
      $(whichSpace).addClass('checker player2').append(image2);
    }
    console.log(spaceCount);
    console.log(whichSpace);

  }

  // function movePiece(){
  //   // checks if occupied
  //   // checks team rules or if king
  // }

}) ();
