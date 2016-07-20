
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availibility: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
