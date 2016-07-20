
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('item', {
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
        item.belongsTo(models.User),
        item.hasMany(models.Comment),
        item.hasMany(models.Activity)
      }
    }
  });

  return Item;
}
