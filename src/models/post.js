'use strict';

module.exports = (sequelize, DataTypes) => {
  let Post = sequelize.define('Post', {
    content: {type: DataTypes.TEXT, unique: true, allowNull: false}
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
