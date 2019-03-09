
// Set up of creation of a submit button
$(document).ready(function () {

  var signinForm = $("form.signup");
  var nameInput = $("input#name");
  var emailInput = $("input#email-input");
  var dobInput = $("input#dob");
  var passwordInput = $("input#password-input");
  var privacyInput = $("select#privacySetting");
  var genreInput = $("select#genreList");
  var platformInput = $("select#platformList");



  signinForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      dob: dobInput.val().trim(),
      password: passwordInput.val().trim(),
      privacySetting: privacyInput.val().trim(),
      genreList: genreInput.val().trim(),
      platform: platformInput.val().trim()
    };
    signInUser(userData.name, userData.email, userData.dob, userData.password,
      userData.privacySetting, userData.genreList, userData.platform);
    nameInput.val("");
    emailInput.val("");
    dobInput.val("");
    passwordInput.val("");
    privacyInput.val("");
    genreInput.val("");
    platformInput.val("");
  });

  // Send the POST request.
  function signInUser(name, email, dob, password, privacySetting, genreList, platform) {
    $.post("/api/users", {
      name: name,
      email: email,
      dob: dob,
      password: password,
      privacySetting: privacySetting,
      genreList: genreList,
      platform: platform
    }).then(function (data) {
      window.location.href="/main";
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);

  }




});




