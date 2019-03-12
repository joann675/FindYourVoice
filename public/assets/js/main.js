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
    });
   })