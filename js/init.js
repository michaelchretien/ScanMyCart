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
  $("#analyse").hide();
  $('#carboneEstimated').hide();
  $('body').bind('touchmove', function(e){e.preventDefault()})
  
    $('[data-toggle="tooltip"]').tooltip();   
});

 $(document).ready(function () {
        // Add smooth scrolling to all links in navbar + footer link
        $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
          // Make sure this.hash has a value before overriding default behavior
          if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 900, function () {

              // Add hash (#) to URL when done scrolling (default click behavior)
              window.location.hash = hash;
            });
          } // End if
        });

        $(window).scroll(function () {
          $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
              $(this).addClass("slide");
            }
          });
        });
      })