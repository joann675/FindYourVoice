module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    // Giving the Customer model a name of type STRING
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    dob: DataTypes.DATEONLY,
    privacySetting: DataTypes.ENUM('Public', 'Private'),
    platform: DataTypes.STRING

  });

  Users.associate = function (models) {

    Users.belongsToMany(models.Games, { through: 'UserGameStatuses' });


  };

  return Users;
};
