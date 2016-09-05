(function() {
  'use strict';

  $('#button').click(function() {

    event.preventDefault();

    var dateValue = $('#dateEntered').val();
    var $xhr = $.getJSON('https://api.nasa.gov/planetary/apod?api_key=RC2ZEmLVWlfYOkOYT5MHXkOq82VWb85ejudwxtPm&date=' + dateValue);

    $xhr.done(function(data) {
      if ($xhr.status !== 200) {
        return;
      }

      var imageTitle = data.title;
      var image = data.hdurl;
      var description = data.explanation;
      var imageEl = '<img src="' + image + '" alt="Space!" id="photoMod" height="400">';

      $('#titleGoesHere').html('<p class="desc">"' + imageTitle + '"</p>');
      $('#photoGoesHere').html(imageEl);
      $('#descriptionGoesHere').html('<p class="desc readableText">' + description + '"</p>');

      $xhr.fail(function(err) {
        return err;
      });
    });
  });

  $('#rbSpirit').change(function(){
  if($(this).is(':checked')){
    $('#marsInstructions').css('display','none');
    $('#opportunityBackground').css('display','none');
    $('#curiosityBackground').css('display','none');
    $('#spiritBackground').css('display','block');

  }
  });

  $('#rbOpportunity').change(function(){
  if($(this).is(':checked')){
    $('#marsInstructions').css('display','none');
    $('#curiosityBackground').css('display','none');
    $('#spiritBackground').css('display','none');
    $('#opportunityBackground').css('display','block');
  }
  });

  $('#rbCuriosity').change(function(){
  if($(this).is(':checked')){
    $('#marsInstructions').css('display','none');
    $('#opportunityBackground').css('display','none');
    $('#spiritBackground').css('display','none');
    $('#curiosityBackground').css('display','block');
  }
  });

  $('.marsBackgroundButton').click(function(){

    event.preventDefault();
    // $('#marsInstructions').hide();
    // $('#spiritBackground').hide();
    // $('#opportunityBackground').hide();
    // $('#curiosityBackground').hide();

    var rover = $('input[name="rover"]:checked').val();
    rover = toTitleCase(rover);
    var $oldHREF = [];
    var $valOfoldHREF = [];

      $.ajax({
         type: "GET",
         url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=" + rover +"_(rover)&callback=?",
        //  contentType: "application/json; charset=utf-8",
        //  async: false,
         dataType: "json",
         success: function (data, textStatus, jqXHR) {
             console.log(data);
             var markup = data.parse.text["*"];
             var blurb = $('<div></div>').html(markup);
             $('#backgroundTitle').html('<br/><h5>Wikipedia</h5>');
             $('#backgroundGoesHere').html($(blurb).find('p'));
             var stringCheck=[];
             var newString = [];
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


  $('#marsButton').click(function() {

    event.preventDefault();
    $('#marsInstructions').hide();

    var rover = $('input[name="rover"]:checked').val();
    var baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?';
    var dateValue2 = 'sol=' + $('#dateEntered2').val() + '&';
    var apiKey = 'api_key=RC2ZEmLVWlfYOkOYT5MHXkOq82VWb85ejudwxtPm&';
    var pageValue = 'page=' + $('#pageEntered').val();

    var $xhr = $.getJSON(baseUrl + dateValue2 + apiKey + pageValue);

    $xhr.done(function(data2) {
      if ($xhr.status !== 200) {
        return;
      }
      console.log(data2);
      $('#title2GoesHere').append('<br />');
      for (var i = 0; i < 25; i++) {
        $('#title2GoesHere').append('<p>"'+ data2.photos[i].rover.name + ' ' + data2.photos[i].camera.full_name + ' ' + data2.photos[i].earth_date +'"</p><img src="' + data2.photos[i].img_src + '" alt="Space!" height="400" ><br /><br />');
      }

      $xhr.fail(function(err) {
        return err;
      });
    });
  });

  $('#reload').click(function() {
    location.reload();
  });

  // $('.carousel').carousel();
  $('.carousel.carousel-slider').carousel({full_width: true});

  function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  $('.button-collapse').sideNav();

  var slider = document.getElementById('test5');
  var sliderMax;


  $('#test5').max = sliderMax;
  if ($('#dateEntered2').val()==="spirit"){
    sliderMax = 2208;
  } else if ($('#dateEntered2').val()==="opportunity") {
    sliderMax = 4483;
  } else {
    sliderMax = 1451;
  }

  noUiSlider.create(slider, {
   start: [80],
   connect: true,
   step: 1,
   range: {
     'min': 1,
     'max': sliderMax
   },
   format: wNumb({
     decimals: 0
   })
  });
})();
