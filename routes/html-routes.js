var path = require("path");


module.exports = function(app) {

  app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  
  app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));

  });

  
  app.get("/signin", function(req, res) {

    res.sendFile(path.join(__dirname, "../public/signin.html"));

  });


};