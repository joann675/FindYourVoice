// Creates a "games" model that matches up with DB

module.exports = function (sequelize, DataTypes) {
  var Games = sequelize.define("Games", {
    name: DataTypes.STRING
    
  });

  Games.associate = function(models) {
    Games.belongsToMany(models.Users, {through:'UserGameStatuses'});
  
    
  };

  return Games;
};