var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


<<<<<<< HEAD
db.sequelize.sync({force: false}).then(function() {
=======

db.sequelize.sync({force: true}).then(function() {
>>>>>>> 81ae957f31d43f2565ac3943852c707406a577ff
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});



