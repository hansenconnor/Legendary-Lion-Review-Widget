$(document).ready(function(){


function getJSONConfig( callback ) {
    var fullname = "default";
    $.getJSON('config.json', function (jsonData) {
        posURL = jsonData[0].settings.generalSettings.positiveFeedbackUrl;
        negURL = jsonData[0].settings.generalSettings.negativeFeedbackUrl;
        numStars = jsonData[0].settings.generalSettings.numStarsForPositiveFeedback;
        callback(posURL, negURL, numStars);
    });
}

var positiveFeedbackUrl;
var negativeFeedbackUrl;
var numberOfStarsForPositiveFeedback;

getJSONConfig( function( positiveURL, negativeURL, numberOfStars ) {
	var configArray = [];
	positiveFeedbackUrl = positiveURL;
	negativeFeedbackUrl = negativeURL;
	numberOfStarsForPositiveFeedback = numberOfStars;
	console.log(numberOfStars);
});


  /* 1. Visualizing things on Hover - See next part for action on click */
  $('#stars li').on('mouseover', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
   
    // Now highlight all the stars that's not after the current hovered star
    $(this).parent().children('li.star').each(function(e){
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });
    
  }).on('mouseout', function(){
    $(this).parent().children('li.star').each(function(e){
      $(this).removeClass('hover');
    });
  });
  
  
  /* 2. Action to perform on click */
  $('#stars li').on('click', function(){
    var onStar = parseInt($(this).data('value'), 10); // The star currently selected
    var stars = $(this).parent().children('li.star');
    
    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }
    
    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
    
    // JUST RESPONSE (Not needed)
    var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
    var msg = "";

    // Redirect based on number of stars set in JSON config file
    if ( ratingValue >= numberOfStarsForPositiveFeedback ) {
    	// Redirect to positive url
    	// Additionally, select random value from array of positive urls - diversification
    	window.open(positiveFeedbackUrl, '_blank');
        msg = "Thanks! You rated this " + ratingValue + " stars.";
    }
    else {
        msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
    }
    responseMessage(msg);
    
  });
  
  
});


function responseMessage(msg) {
  $('.success-box').fadeIn(200);  
  $('.success-box div.text-message').html("<span>" + msg + "</span>");
}

