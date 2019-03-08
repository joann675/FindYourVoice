var searched = document.getElementById("searched").value;
axios({
    url: "https://api-v3.igdb.com/search?="+searched+"&limit=10",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': f254966f3b07955f5a90d3fa27f17250
    },
    data: "fields alternative_name,character,collection,company,description,game,name,person,platform,popularity;search;"
       })
    .then(response => {
        console.log(response.data);
        axios({
            url: "https://api-v3.igdb.com/artworks?="+searched+"&limit=2",
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

   

