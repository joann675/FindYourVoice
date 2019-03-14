// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

var passport = require("../config/passport");
var axios = require("axios");


// Routes =============================================================
module.exports = function (app) {

  // GET route for getting all of the games
  app.get("/api/games", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Games.findAll({}).then(function (games) {
      // We have access to the todos as an argument inside of the callback function
      res.json(games);
    });

  });

  app.get("/api/games/:userid", function (req, res) {

    db.UserGameStatuses.findAll({
      include: [db.Games],
      where: {
        UserId: req.params.userid
      }
    }).then(function (results) {
      res.json(results);
    });
  });


  app.get("/api/games/:userid/:playState", function (req, res) {
    console.log("In get for games for user " + req.params.userid);

    db.UserGameStatuses.findAll({
      include: [db.Games],
      where: {
        UserId: req.params.userid,
        state: req.params.playState

      }
    }).then(function (results) {
      res.json(results);
    });
  });



  // GET route for getting all of the users
  app.get("/api/users", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Users.findAll({}).then(function (users) {
      // We have access to the todos as an argument inside of the callback function
      res.json(users);
    });

  });


  // POST route for saving a new user
  app.post("/api/users", function (req, res) {
    console.log("In post route")
    // create takes an argument of an object describing the item we want to insert
    // into our table. 
    db.Users.count({
      where: {
        name: req.body.name
      }
    }).then(c => {
      console.log("Count = " + c)
      if (c === 0) {
        db.Users.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          dob: req.body.dob,
          privacySetting: req.body.privacySetting,
          genreList: req.body.genreList,
          platform: req.body.platform
        }).then(function (user) {
          // We have access to the new user as an argument inside of the callback function
          res.json(user);
        });

      }
      else
        res.status(400).end();
    })

  });

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    db.Users.findOne({
      where: {
        name: req.body.username
      }
    }).then(function (results) {
      res.json(results);
    });
  });


  // POST route for saving a new game for user
  app.post("/api/games", function (req, res) {
    // create takes an argument of an object describing the item we want to insert
    // into our table. 
    db.Games.findOrCreate({
      where: {
        title: req.body.title,
        releaseDate: req.body.releaseDate
      },
      defaults: {
        platforms: req.body.platforms

      }
    }).then(function (results) {

      db.UserGameStatuses.create({
        GameId: results[0].id,
        UserId: req.body.userId,
        state: req.body.gameState
      }).then(function (userGameStatus) {
        res.json(userGameStatus);
      });
    });
  });




  // PUT route for updating user. We can get the updated user data from req.body
  app.put("/api/users", function (req, res) {
    // Update takes in two arguments, an object describing the properties we want to update,
    // and another "where" object describing the user we want to update
    db.Users.update({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      privacySetting: req.body.privacySetting,
      genreList: req.body.genreList,
      platform: req.body.platform
    }, {
        where: {
          id: req.body.id
        }
      })
      .then(function (user) {
        res.json(user);
      });

  });

  // PUT route for updating user. We can get the updated user data from req.body
  app.put("/api/changeGameState", function (req, res) {
    console.log("In put route")
    // Update takes in two arguments, an object describing the properties we want to update,
    // and another "where" object describing the user and game we want to update
    db.UserGameStatuses.update({
      rating: req.body.rating,
      state: req.body.state,

    }, {
        where: {
          GameId: req.body.gid,
          UserId: req.body.uid
        }
      })
      .then(function (data) {
        res.json(data);
      });

  });


  app.get("/api/igdbgames/:gameName", function (req, res) {
    dataString = "search \""+req.params.gameName+"\"; fields name,url,storyline,summary,first_release_date;";
    console.log("Data string for igdb games - " + dataString);
    axios({
      url: "https://api-v3.igdb.com/games/",
      method: 'POST',
      headers: {

        'user-key': process.env.IGDB_ID,
        'Accept': 'application/json'

      },
      search: req.params.gameName,
      data: dataString
    })
      .then(response => {
        console.log(response.data);
        res.json(response.data);
      })
      .catch(err => {
        console.error(err);
        res.status(404).end();
      });
  });

  app.get("/api/igdbart/:gameid", function (req, res) {
    dataString = "fields url; where id = "+req.params.gameid+";"
    console.log("Data string for igdb artwork - " + dataString);
    axios({
      url: "https://api-v3.igdb.com/artworks",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_ID
      },
      data: dataString

    })
      .then(response => {
        console.log(response.data);
        res.json(response.data);
      })
      .catch(err => {
        console.error(err);
        res.status(404).end();
      });
  });
}
