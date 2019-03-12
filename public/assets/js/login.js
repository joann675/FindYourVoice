
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
    $.post("/api/login", {
      username: name,
      password: password,
    }).then(function (data) {
      localStorage.setItem("userId", data.id);
      localStorage.setItem("platform", data.platform);
      window.location.href = "/main";
    }).fail(function () {
      alert("error invalid user name or password");
    })
  }

});




