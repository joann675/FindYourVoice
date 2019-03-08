var searched = document.getElementById("searched").value;
axios({
    url: "https://api-v3.igdb.com/search",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': f254966f3b07955f5a90d3fa27f17250
    },
    data: "fields alternative_name,character,collection,company,description,game,name,person,platform,popularity;search;"
     + searched + "limit 10;"
  })
    .then(response => {
        console.log(response.data);
        axios({
            url: "https://api-v3.igdb.com/artworks",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': f254966f3b07955f5a90d3fa27f17250
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

   