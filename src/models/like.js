'use strict';

module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    
  }, {
    classMethods: {
      associate: (models) => {
        Like.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
        Like.belongsTo(models.Post, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Like;
};
