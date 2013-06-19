function checkTweetPosted(jobId) {
  return function(response) {
    $.get('/status/'+jobId, function(serverResponse) {
      if (serverResponse.status === true) {
        window.clearInterval(intervalID);
         $('#tweet').append('<h2>Successfully posted</h2>');
         window.setTimeout(function(){
           $('#tweet h2').remove() }, 3000 );
      };
    });
  };
};

$(document).ready(function() {
  $("#tweet").on('submit', function(event){   
    event.preventDefault();
    var tweet_text = $('#tweet').serialize();

    $.ajax({
      url: '/tweet',
      type: 'post',
      data: tweet_text,
      beforeSend:  function(){
        $('#tweet').append('<h2>Submitting!!</h2>');
        $('#tweet input[type=submit]').prop('disabled', true);
        $('input[type=text]').val("");
      },
      success: function(jobIdResponse){
        $('#tweet h2').remove();
        $('#tweet input[type=submit]').prop('disabled', false);
        var jobId = jobIdResponse;
        
        intervalID = window.setInterval(checkTweetPosted(jobId), 1000);
      }
    })
 });

});


// tests we did to debug 
  // Object {status: true} application.js:4 // server response
  // true application.js:5   // serverResponse.status
  // 2 application.js:6  // intervalID
  // true application.js:7 // boolean
  // true application.js:8 // boolean
  // false application.js:9 // string
  // false application.js:10 // string
