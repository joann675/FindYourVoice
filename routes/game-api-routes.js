axios({
    url: "https://api-v3.igdb.com/search",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': f254966f3b07955f5a90d3fa27f17250
    },
    data: "fields alternative_name,character,collection,company,description,game,name,person,platform,popularity;search"
     + searched + "limit 10;"
  })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });