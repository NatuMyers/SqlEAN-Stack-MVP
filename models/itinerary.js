
module.exports = function(sequelize, DataTypes) {
  var Itinerary = sequelize.define('Itinerary', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    state: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Itinerary.belongsTo(models.User),
        Itinerary.hasMany(models.Comment),
        Itinerary.hasMany(models.Activity)
      }
    }
  });

  return Itinerary;
}


