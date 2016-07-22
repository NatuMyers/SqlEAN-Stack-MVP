
module.exports = function(sequelize, DataTypes) {
  var Invoice = sequelize.define('Invoice', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }

  }, {
    classMethods: {
      associate: function(models) {
        Invoice.belongsTo(models.Order),
        Invoice.belongsTo(models.User)
      }
    }
  });

  return Invoice;
}
