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
        // Item.belongsTo(models.Order),
        Item.belongsTo(models.User)
        //Item.hasMany(models.Comment),
        // Each item can have an order (from purchaser)
        //then invoice (from farmer)
        //nItem.hasMany(models.Activity)
      }
    }
  });

  return Item;
}
