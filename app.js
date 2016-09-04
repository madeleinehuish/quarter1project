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
      var imageEl = '<img src="' + image + '" alt="Space!" height="400">';

      $('#titleGoesHere').html('<p class="desc">"' + imageTitle + '"</p>');
      $('#photoGoesHere').html(imageEl);
      $('#descriptionGoesHere').html('<p class="desc readableText">' + description + '"</p>');

      $xhr.fail(function(err) {
        return err;
      });
    });
  });

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

      $('#title2GoesHere').append('<br />');
      for (var i = 0; i < 25; i++) {
        $('#title2GoesHere').append('<br /><br /><p>"'+ data2.photos[i].rover.name + ' ' + data2.photos[i].camera.full_name + ' ' + data2.photos[i].earth_date +'"</p><img src="' + data2.photos[i].img_src + '" alt="Space!" height="400" >');
      }

      $xhr.fail(function(err) {
        return err;
      });
    });
  });

  $('#reload').click(function() {
    location.reload();
  });

  $('.button-collapse').sideNav();
})();
