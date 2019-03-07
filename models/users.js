var bcrypt = require("bcrypt-nodejs");

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
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
 
    dob: DataTypes.DATEONLY,
    privacySetting: DataTypes.ENUM('Public', 'Private'),
    genreList: DataTypes.STRING,
    platform: DataTypes.STRING

  });

  Users.associate = function (models) {

    Users.belongsToMany(models.Games, { through: 'UserGameStatuses' });


  };

  Users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Users.hook("beforeCreate", function(users) {
    users.password = bcrypt.hashSync(users.password, bcrypt.genSaltSync(10), null);
  });

  return Users;
};
