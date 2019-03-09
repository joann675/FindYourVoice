$(document).ready(function(){

 $("#serchbtn").on("click", function(event){
   console.log("I am clicked");
   event.preventDefault()
   let search = $("#searched").val().trim()
  let axios = axios.get({
     url: "https://api-v3.igdb.com/search/"+search+"&limit=10",
     method: 'POST',
     headers: {
         'Accept': 'application/json',
         'user-key': process.env.IGDB_ID
     },
     data: "fields alternative_name,character,collection,company,description,game,name,person,platform,popularity;search;"
      + searched + "limit 10;"
   })
     .then(response => {
         console.log(response.data);
         axios.get({
             url: "https://api-v3.igdb.com/artworks?"+search + "&limit=2",
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'user-key': process.env.IGDB_ID
             },
             data: "fields alpha_channel,animated,game,height,image_id,url,width;"
             + searched + "limit 2;"
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