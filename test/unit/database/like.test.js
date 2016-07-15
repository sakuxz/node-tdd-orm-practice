/*global describe*/
/*global beforeEach*/
/*global afterEach*/
/*global it*/
/*global request*/
/*global server*/
import {initTestModel} from '../../../src/database';

describe('like model test', () => {
  let models = null;
  let userId = null;
  let postId = null;
  beforeEach(async (done) => {
    try {
      models = await initTestModel()
      let addUser = {username: 'test', password: 'test', email: 'test@mail.com'}
      let result = await models.User.create(addUser);
      userId = result.id;
      let addPost = {content: '123',UserId: userId}
      result = await models.Post.create(addPost);
      postId = result.id;
      done()
    } catch (e) {
      done(e)
    }
  });

  it('create like data', async (done) => {
    try {
      let addLike = {PostId: postId,UserId: userId}
      let result = await models.Like.create(addLike);
      result.toJSON().should.has.keys('id', 'PostId', 'UserId', 'createdAt', 'updatedAt')
      done()
    } catch (e) {
      done(e)
    }
  });

  it('like list should be only one', async (done) => {
    try {
      let list = await models.Like.findAll();
      console.log('=== list.length ===', list.length);
      (list.length == 0).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });
  
  it('delete like test', async (done) => {
    try {
      let addLike = {PostId: postId,UserId: userId}
      await models.Like.create(addLike);
      
      let where = {PostId: postId,UserId: userId}
      let result = await models.Like.destroy({
        where: where
      });
      result.should.be.eq(1);
      done()
    } catch (e) {
      done(e)
    }
  });
  
});
