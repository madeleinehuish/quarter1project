$('#button').click(function(){
event.preventDefault();
var dateValue = $('#dateEntered').val();
var $xhr = $.getJSON('https://api.nasa.gov/planetary/apod?api_key=RC2ZEmLVWlfYOkOYT5MHXkOq82VWb85ejudwxtPm&date=' + dateValue +'');

$xhr.done(function(data) {
    if ($xhr.status !== 200) {
        return;
    }
    console.log(data);
    console.log(data.hdurl);

    var imageTitle = data.title;
    var image = data.hdurl;
    var description = data.explanation;
    $('#titleGoesHere').html('<p>"' + imageTitle + '"</p>');
    $('#photoGoesHere').html('<img src="' + image + '" alt="Space!" height="400" >');
    $('#descriptionGoesHere').html('<p>' + description + '"</p>');


$xhr.fail(function(err) {
console.log(err);
});


})
})

$('#marsButton').click(function(){
event.preventDefault();
var dateValue = $('#dateEntered').val();
var $xhr = $.getJSON('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1001&api_key=RC2ZEmLVWlfYOkOYT5MHXkOq82VWb85ejudwxtPm');

$xhr.done(function(data2) {
    if ($xhr.status !== 200) {
        return;
    }
    console.log(data2);
    // console.log(data2.photos[0].img_src);

    var imageTitle2 = data2.photos[0].camera.full_name;
    // var image2 = data2.photos.img_src;
    // var description = data.explanation;
    $('#title2GoesHere').html('<p>"Opportunity - ' + imageTitle2 + '"</p>');
    var image2=[];
    for (var i = 0; i < 20; i++){
        // var image2 = data2.photos[i].img_src;
        console.log(data2.photos[i].img_src);
        $('#photo2GoesHere').append('<img src="' + data2.photos[i].img_src + '" alt="Space!" height="400" >');
    }

    // $('#description2GoesHere').html('<p>' + description + '"</p>');


$xhr.fail(function(err) {
console.log(err);
});


})
})
 $(".button-collapse").sideNav();
