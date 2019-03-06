// Creates a "games" model that matches up with DB

module.exports = function (sequelize, DataTypes) {
  var Games = sequelize.define("Games", {
    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    developer: DataTypes.STRING,
    platform: DataTypes.STRING,
    releaseDate: DataTypes.DATEONLY,
    agerating: DataTypes.INTEGER
    
  });

  Games.associate = function(models) {
    Games.belongsToMany(models.Users, {through:'UserGameStatuses'});
  
    
  };

  return Games;
};