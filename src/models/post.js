'use strict';

module.exports = (sequelize, DataTypes) => {
  let Post = sequelize.define('Post', {
    content: {type: DataTypes.TEXT, allowNull: false},
    img: {type: DataTypes.STRING(50), allowNull: true},
  }, {
    classMethods: {
      associate: (models) => {
        Post.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false
          }
        });
        Post.hasMany(models.Like);
      }
    }
  });

  return Post;
};
