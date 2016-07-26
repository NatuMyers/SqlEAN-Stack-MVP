
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    city: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    longitude: {
      type: DataTypes.DOUBLE
    },
    latitude: {
      type: DataTypes.DOUBLE
    },
    link: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        //nComment.belongsTo(models.Item),
        Comment.belongsTo(models.User)
      }
    }
  });

  return Comment;

};
