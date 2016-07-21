
module.exports = function(sequelize, DataTypes) {
  var Invoice = sequelize.define('Invoice', {
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
        Invoice.belongsTo(models.User),
        Invoice.hasMany(models.Item),
        Invoice.hasMany(models.Activity)
      }
    }
  });

  return Invoice;
}
