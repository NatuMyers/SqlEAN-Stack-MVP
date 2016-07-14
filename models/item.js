
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
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
        Item.belongsTo(models.User),
        Item.hasMany(models.Comment),
        Item.hasMany(models.Activity)
      }
    }
  });

  return Item;
}


