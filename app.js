(function() {
  'use strict';

  // Figure out Today's Date for Pic of Day
  var today = (function() {
    var tod = new Date(),
        dd = tod.getDate(),
        mm = tod.getMonth()+1, //January is 0!
        yyyy = tod.getFullYear();

    if(dd < 10) {
        dd='0'+dd
    }
    if(mm < 10) {
        mm='0'+mm
    }
    return tod = yyyy+'-'+mm+'-'+dd;
  }
  )();

  var rovers = {
    '#rbSpirit' : '#spiritBackground',
    '#rbOpportunity' : '#opportunityBackground',
    '#rbCuriosity' : '#curiosityBackground',
  }

  //toTitleCase for titles
  function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  //load picture of the day and set up carousel on extras page
  $(document).ready(function() {
    if (window.location.pathname === '/Users/maddiehuish/Projects/Q1Project/index.html') {
          picOfDay(today);
    } else if (window.location.pathname === '/Users/maddiehuish/Projects/Q1Project/extras.html') {
        $("#posterHolder").owlCarousel({
        items : 2,
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
      });
    }
  });

  // entering pic of day manually
  $('#button').click(function(){
    event.preventDefault();
    picOfDay($('#dateEntered').val());
  });

  function picOfDay(dateValue) {
    var $xhr = $.getJSON('https://api.nasa.gov/planetary/apod?api_key=RC2ZEmLVWlfYOkOYT5MHXkOq82VWb85ejudwxtPm&date=' + dateValue);

    $xhr.done(function(data) {

      var imageTitle = data.title,
          image = data.hdurl,
          description = data.explanation,
          imageEl = '<img src="' + image + '" alt="Space!" class="responsive-img" id="photoMod" height="400">';

      $('#titleGoesHere').html('<p class="desc">"' + imageTitle + '"</p>');
      $('#photoGoesHere').html(imageEl);
      $('#descriptionGoesHere').html('<p class="desc readableText">' + description + '"</p>');

    });
    $xhr.fail(function(err) {
      if ($xhr.status !== 200) {
        Materialize.toast("The date entered does not exist or there is a server error on that date. Please pick another date.", 5000, '#ff5252 red accent-2');
        return;
    };

    return err;
  })

 }

  //cleanup functions
  $('.rb').change(function(event){
    if($(event.target).is(':checked')){
      clearDivs();
      clearRoverBackground(rovers['#' + event.target.id]);
    }
  });

  function clearRoverBackground(showRover) {
    $('.roverBackground').css('display', 'none');
    $(showRover).css('display', 'block');
  }

  function clearDivs(){
    $('#marsInstructions').css('display', 'none');
    $('#backgroundTitle').empty();
    $('#backgroundGoesHere').empty();
    $('#title2GoesHere').empty();
  }

  $('.refresh').click(function() {
    location.reload();
  });

  //Mars background button
  $('.marsBackgroundButton').click(function(){

    event.preventDefault();

    var rover = toTitleCase($('input[name="rover"]:checked').val()),
        $oldHREF = [],
        $valOfoldHREF = [];
    console.log(rover);
      $.ajax({
         type: 'GET',
         url: 'http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page='+rover+'_(rover)&callback=?',
         dataType: 'json',
         success: function (data, textStatus, jqXHR) {
            console.log(data);
             var markup = data.parse.text["*"],
                 blurb = $('<div></div>').html(markup),
                 stringCheck=[],
                 newString = [];
             $('#backgroundTitle').html('<br/><h5>Wikipedia</h5>');
             $('#backgroundGoesHere').html($(blurb).find('p'));
             $oldHREF = $('#backgroundGoesHere').find('a');
             for (var i = 0; i < $oldHREF.length; i++){
               stringCheck[i] = $oldHREF[i].href.includes("file:///wiki/");
                if (stringCheck[i]){
                  $oldHREF[i].href = $oldHREF[i].href.replace('file:///wiki','https://en.wikipedia.org/wiki');
                  $oldHREF[i].target="_blank";
                }
              }
         },
         error: function (errorMessage) {
         }
      });
  })

  //Mars photo Button
  $('#marsButton').click(function() {
    event.preventDefault();
    clearDivs();
    clearRoverBackground();

    var rover = $('input[name="rover"]:checked').val()
    var baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?'
    var  dateValue2 = 'sol=' + $('#dateEntered2').val() + '&'
    var  apiKey = 'api_key=RC2ZEmLVWlfYOkOYT5MHXkOq82VWb85ejudwxtPm&'
    var  pageValue = 'page=' + $('#pageEntered').val()
    var  $xhr = $.getJSON(baseUrl + dateValue2 + apiKey + pageValue);

    $xhr.done(function(data2) {
      $('#title2GoesHere').append('<br />');
      for (var i = 0; i < data2.photos.length; i++) {
        var name = data2.photos[i].rover.name,
            camera = data2.photos[i].camera.full_name,
            earthDate = data2.photos[i].earth_date,
            imgSrc = data2.photos[i].img_src,
            extra = '" alt="Space!" class="responsive-img" height="400" ><br /><br />';
        $('#title2GoesHere').append(`<p>"${name}${camera}${earthDate}"</p><img src="${imgSrc}${extra}"`);

      }
    });

    $xhr.fail(function(err) {
      if ($xhr.status !== 200) {
        Materialize.toast("Either you didn't enter correctly or the date entered doesn't contain any pictures or the server is not responding. Please try again.", 5000, '#81c784 green lighten-2');
        return;
      }
      return err;
    });
  });







})();
