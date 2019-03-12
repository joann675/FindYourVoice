// Creates a "games" model that matches up with DB

module.exports = function (sequelize, DataTypes) {
  var Games = sequelize.define("Games", {
    title: DataTypes.STRING,
    platforms: DataTypes.STRING,
    releaseDate: DataTypes.DATEONLY
    
    
  });

  Games.associate = function(models) {
    Games.belongsToMany(models.Users, {through:'UserGameStatuses'});
  
    
  };

  return Games;
};