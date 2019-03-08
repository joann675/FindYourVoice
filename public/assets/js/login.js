
// Set up of creation of a submit button
$(document).ready(function () {

  var loginForm = $("form.login");
  var nameInput = $("input#name");
  var passwordInput = $("input#password-input");
  

  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: nameInput.val().trim(),
      password: passwordInput.val().trim(),
        };
    logInUser(userData.username, userData.password);
    nameInput.val("");
    passwordInput.val("");
  });

  // Send the POST request.
  function logInUser(name, password) {
    $.post("/api/users", {
      username: name,
      password: password,
         }).then(function (data) {
     res.redirect(307, "/api/main");
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);

  }




});




