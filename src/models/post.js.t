'use strict';

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    content: {type: DataTypes.TEXT, unique: true, allowNull: false},
    uid: {
      type: DataTypes.STRING, 
      // references: {
      //   model: 'User',
      //   key: 'id'
      // }
    }
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return Post;
};
