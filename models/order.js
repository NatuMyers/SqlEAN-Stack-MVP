
// Order (-> item )->  Invoice
module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    recievingProducer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    producerConfirmed: {
      type: DataTypes.BOOLEAN
    },
    isPaid: {
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      associate: function(models) {
        Order.belongsTo(models.User),
        Order.hasOne(models.Invoice),
        //nOrder.hasMany(models.Item),
        Order.hasMany(models.Activity)
      }
    }
  });

  return Order;
}
