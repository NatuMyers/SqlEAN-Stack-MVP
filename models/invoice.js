
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    toProducer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price:{
      type: DataTypes.INTEGER
    }

  }, {
    classMethods: {
      associate: function(models) {
        Order.belongsTo(models.User),
        Order.hasMany(models.foodItem),
        Order.hasMany(models.Activity)
      }
    }
  });

  return Order;
}
