
 // Set up of creation of new burger submit button
  $("form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var formData = $(form).serialize();

    // Send the POST request.
    $.ajax("/", {
      type: "POST",
      url: $("form").attr('action'),
      data: formData
    }).then(
      function() {
        console.log("checking submit");
        $(formMessages).removeClass("error");
       $(formMessages).addClass("success");

       $(formMessages).text(response);

       // Clear the form.
       $('#name').val('');
       $('#email').val('');
       $('#message').val('');
      }
    );
  });

