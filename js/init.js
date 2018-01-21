/*  Hackatown 2018 - ScanMyCart
*	Authors : Michael Chretien, Antoine Gaulin, Jean-Sebastien Lemaire
*	Brief : Hide some part of the app on start
*	Uses : OpenFoodFacts database and https://github.com/liip/barcode.js
*/


$( document ).ready(function() {
  
  $("#warning").hide();
  $("#error").hide();
  $("#data").hide();
  $("#wait").hide();
  $('body').bind('touchmove', function(e){e.preventDefault()})
});