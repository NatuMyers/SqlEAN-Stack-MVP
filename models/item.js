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
    }

  }, {
    classMethods: {
      associate: function(models) {
<<<<<<< HEAD
        // Item.belongsTo(models.Order),
        Item.belongsTo(models.User)
        //Item.hasMany(models.Comment),
=======
        Item.belongsTo(models.User),
        Item.hasMany(models.Comment),
>>>>>>> 36e0b0f91a4a88a2150c4b34f1adacceb8a25c86
        // Each item can have an order (from purchaser)
        //then invoice (from farmer)
        //nItem.hasMany(models.Activity)
      }
    }
  });

  return Item;
}
