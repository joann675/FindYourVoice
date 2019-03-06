// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

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

  app.get("/api/favgames/:userid", function (req, res) {
    
    db.UserGameStatuses.findAll({
      include: [db.Games ],
      where: {
        UserId: req.params.userid
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
    db.Users.create({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      privacySetting: req.body.privacySetting,
      platform: req.body.platform
    }).then(function (user) {
      // We have access to the new user as an argument inside of the callback function
      res.json(user);
    });

  });

  // POST route for saving a new game for user
  app.post("/api/games", function (req, res) {
    // create takes an argument of an object describing the item we want to insert
    // into our table. 
    db.Games.findOrCreate({
      where: {
        name: req.body.gameName
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
    db.Todo.update({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      privacySetting: req.body.privacySetting,
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
}
