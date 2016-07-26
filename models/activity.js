"use strict";
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address : {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: function(models) {
        //nActivity.belongsTo(models.Item)
      }
    }
  }
  );

  return Activity;

};
