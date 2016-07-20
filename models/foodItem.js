
module.exports = function(sequelize, DataTypes) {
  var foodItem = sequelize.define('foodItem', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    availibility:{
      type: DataTypes.INTEGER
    },
    price:{
      type: DataTypes.INTEGER
    }

  }, {
    classMethods: {
      associate: function(models) {
        foodItem.belongsTo(models.Order),
        foodItem.hasMany(models.Activity)
      }
    }
  });

  return foodItem;
}
