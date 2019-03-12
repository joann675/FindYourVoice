<<<<<<< HEAD
$(document).ready(function(){
    var userId = localStorage.getItem("userId");

 $.get("/api/games/" + userId + "/pastPlayed", function (data) {
   console.log(JSON.stringify(data,null,2));
   $("#panel1 ol").empty();
   for (var i = 0; i < data.length; i++) {
     console.log(data[i].Game.title);

     $("#panel1 ol").append('<li>' + data[i].Game.title + '</li>');
   }
 });

 $.get("/api/games/" + userId + "/playing", function (data) {
   console.log(JSON.stringify(data,null,2));
   $("#panel2 ol").empty();
   for (var i = 0; i < data.length; i++) {
     console.log(data[i].Game.title);

     $("#panel2 ol").append('<li>' + data[i].Game.title + '</li>');
   }
 });

 $.get("/api/games/" + userId + "/futureList", function (data) {
   console.log(JSON.stringify(data,null,2));
   $("#panel3 ol").empty();
   for (var i = 0; i < data.length; i++) {
     console.log(data[i].Game.title);

     $("#panel3 ol").append('<li>' + data[i].Game.title + '</li>');
   }
 });

    $("#serchbtn").on("click", function(event){
      console.log("I am clicked");
      event.preventDefault()
      let userSearch = $("#searched").val().trim()
     let axios = axios.get({
        url: "https://api-v3.igdb.com/games/",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': f254966f3b07955f5a90d3fa27f17250
        },
       body: {
         'search': userSearch,  
         'fields': "age_ratings,genres,platforms,popularity;"
       }
      })
        .then(response => {
            console.log(response.data);
            axios.get({
                url: "https://api-v3.igdb.com/artworks",  
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'user-key': f254966f3b07955f5a90d3fa27f17250
                },
                data: "fields alpha_channel,animated,game,height,image_id,url,width;"
              })
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    console.error(err);
                });
        })
        .catch(err => {
            console.error(err);
        });
        console.log(response);
=======
$(document).ready(function () {
  var userId = localStorage.getItem("userId");

  $.get("/api/games/" + userId + "/pastPlayed", function (data) {
    console.log(JSON.stringify(data, null, 2));
    $("#panel1 ol").empty();
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
>>>>>>> f99dc96cd95280b15efc85f10b72a1efda0313eb
    });
  
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
