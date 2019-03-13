$(document).ready(function () {
  var userId = localStorage.getItem("userId");

  $.get("/api/games/" + userId + "/pastPlayed", function (data) {
    console.log(JSON.stringify(data, null, 2));
    $("#panel1 ol").empty();
    $("#panel1").addClass("is-active");
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].Game.title);
      var listItem = $("<li>");
      listItem.text(data[i].Game.title + ' ' + printStars(data[i].rating));

      listItem.attr("id", data[i].Game.title);
      var playAgain = $("<button>");

      playAgain.addClass("statusChangeButton");

      playAgain.attr("gameId", data[i].Game.id);
      playAgain.attr("rating", data[i].rating);
      playAgain.text("Play Again");

      playAgain.on("click", chgStatusToPresent);

      $(listItem).append(playAgain);
      var rateMe = $("<select>");
      rateMe.addClass("rateSelect");
      rateMe.attr("gameId", data[i].Game.id);
      for (var j = 0; j <= 5; j++) {
        var option = $("<option>");
        option.attr("value", "" + j);
        var textValue = "";
        if (j === 0)
          textValue = "Rate Me";
        else if (j === 1)
        textValue = "1 (Dislike)";
          else if (j === 5)
          textValue = "5 (Loved It)";
        else
          textValue = "" + j;
        option.text(textValue);
        rateMe.on("change", addRating);
        $(rateMe).append(option);
      }


      $(listItem).append(playAgain);
      $(listItem).append(rateMe);
      $("#panel1 ol").append(listItem);
    }
  });

  $.get("/api/games/" + userId + "/playing", function (data) {
    console.log(JSON.stringify(data, null, 2));
    $("#panel2 ol").empty();
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].Game.title);
      var listItem = $("<li>");
      listItem.text(data[i].Game.title + " ");

      listItem.attr("id", data[i].Game.title);
      var finishGame = $("<button>");

      finishGame.addClass("statusChangeButton");


      finishGame.attr("gameId", data[i].Game.id);
      finishGame.attr("rating", data[i].rating);

      finishGame.text("Finish Game");
      finishGame.on("click", chgStatusToPast);

      $(listItem).append(finishGame);
      $("#panel2 ol").append(listItem);


    }
  });

  $.get("/api/games/" + userId + "/futureList", function (data) {
    console.log(JSON.stringify(data, null, 2));
    $("#panel3 ol").empty();
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].Game.title);
      var listItem = $("<li>");
      listItem.text(data[i].Game.title+ " ");

      listItem.attr("id", data[i].Game.title);
      var playNow = $("<button>");

      playNow.addClass("statusChangeButton");

      playNow.attr("gameId", data[i].Game.id);
      playNow.attr("rating", data[i].rating);

      playNow.text("Play Now");
      playNow.on("click", chgStatusToPresent);

      $(listItem).append(playNow);
      $("#panel3 ol").append(listItem);
    }


  });

  $("#sub-button").on("click", function (event) {
    console.log("I am clicked");
    event.preventDefault();
    let search = $("#searched").val().trim();
    $.get("/api/igdbgames/" + search, function (data) {
      console.log(data);
      $('#search-view').empty();
      for (var j = 0; j < 3; j++) {
        var row = $("<div>", {
          class: "row"
        });

       var searchDiv = $("<div>", {
          class: "col-12 col-md-4 views"
        });
        var name = data[j].name;
        var url = data[j].url;
        var id = data[j].id;
        var relDate = moment(data[j].first_release_date).format("YYYY/MM/DD");
        var pSpace = $("<p>").text(" ");
        var link = $("<a href='" + url +"' target='_blank'>"+url+"</a>");
        var playLater = $("<button>");

      playLater.addClass("playLaterButton");
      console.log("this is date" + relDate);

      playLater.attr("gameName", data[j].name);
      playLater.attr("relDate", moment(data[j].first_release_date).format("YYYY/MM/DD"));

      playLater.text("Add to my list");
      playLater.on("click", addGametoList);
      
      searchDiv.append(pSpace);
      searchDiv.append(name);
      searchDiv.append(link);
      searchDiv.append(playLater);
      row.append(searchDiv);
      $('#search-view').append(row);
      }
    });

  });

  $('#state-tabs').on('change.zf.tabs', function (event, tab) {

    console.log("Tab change firing");
    var tabId = tab.attr("id");
    if (tabId == '1panel') {
      console.log("Panel 1 visible")
      $("#panel1").addClass("is-active");
      $("#panel2").removeClass("is-active");
      $("#panel3").removeClass("is-active");
    }
    else if (tabId == '2panel') {
      console.log("Panel 2 visible")
      $("#panel2").addClass("is-active");
      $("#panel1").removeClass("is-active");
      $("#panel3").removeClass("is-active");
    }
    else if (tabId == '3panel') {
      console.log("Panel 3 visible")
      $("#panel3").addClass("is-active");
      $("#panel1").removeClass("is-active");
      $("#panel2").removeClass("is-active");
    }
 
  });


})



function printStars(numStars) {
  var string = "";
  if (numStars === null)
    return string;
  for (var i = 0; i < numStars; i++) {
    string = string + "* ";
  }
  return string;

}

function addRating() {

  console.log("In my rating function");
  var newGameState = {
    gid: $(this).attr("gameId"),
    uid: localStorage.getItem("userId"),
    state: "pastPlayed",
    rating: $(this).val().trim()
  };
  $.ajax("/api/changeGameState", {
    type: "PUT",
    data: newGameState
  }).then(
    function () {
      console.log("Game updated");
 
      location.reload();
    }
  );
 };

function chgStatusToPast() {

  console.log("In my function");
  var newGameState = {
    gid: $(this).attr("gameId"),
    uid: localStorage.getItem("userId"),
    state: "pastPlayed",
    rating: $(this).attr("rating")
  };
  $.ajax("/api/changeGameState", {
    type: "PUT",
    data: newGameState
  }).then(
    function () {
      console.log("Game updated");

      location.reload();
    }
  );
};

function chgStatusToPresent() {

  console.log("In chgStatusToPresent");
  var newGameState = {
    gid: $(this).attr("gameId"),
    uid: localStorage.getItem("userId"),
    state: "playing",
    rating: $(this).attr("rating")
  };
  $.ajax("/api/changeGameState", {
    type: "PUT",
    data: newGameState
  }).then(
    function () {
      console.log("Game updated");

      location.reload();
    }
  );
};

function addGametoList() {

  console.log("In addGametoList");
  var newGame = {
    title: $(this).attr("gameName"),
    platforms: localStorage.getItem("platform"),
    userId: localStorage.getItem("userId"),
    releaseDate: $(this).attr("relDate"),
    gameState: "futureList"
  };
  $.ajax("/api/games", {
    type: "POST",
    data: newGame
  }).then(
    function () {
      console.log("Game added");
 
      location.reload();
    }
  );
 };