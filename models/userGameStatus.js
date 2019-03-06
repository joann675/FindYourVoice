
module.exports = function (sequelize, DataTypes) {
  var UserGameStatuses = sequelize.define("UserGameStatuses", {
    rating: DataTypes.INTEGER,
    state: DataTypes.ENUM('pastPlayed', 'playing', 'futureList'),

  });
  UserGameStatuses.associate = function (models) {

    UserGameStatuses.belongsTo(models.Games, {
      foreignKey: {
        allowNull: false
      }
    });

    UserGameStatuses.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });


  };

  return UserGameStatuses;
};