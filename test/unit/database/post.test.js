/*global describe*/
/*global beforeEach*/
/*global afterEach*/
/*global it*/
/*global request*/
/*global server*/
import {initTestModel} from '../../../src/database';

describe('post model test', () => {
  let models = null;
  let userId = null;
  beforeEach(async (done) => {
    try {
      models = await initTestModel()
      let addUser = {username: 'test', password: 'test', email: 'test@mail.com'}
      let result = await models.User.create(addUser);
      userId = result.id;
      done()
    } catch (e) {
      done(e)
    }
  });

  it('create post data', async (done) => {
    try {
      let addPost = {content: '123',UserId: userId}
      let result = await models.Post.create(addPost);
      result.toJSON().should.has.keys('id', 'content', 'UserId', 'createdAt', 'updatedAt')
      done()
    } catch (e) {
      done(e)
    }
  });

  it('post list should be only one', async (done) => {
    try {
      let list = await models.Post.findAll();
      console.log('=== list.length ===', list.length);
      (list.length == 0).should.be.true;
      done();
    } catch (e) {
      done(e);
    }
  });
  
  // it('create duplicate username should be fail', async (done) => {
  //   try {
  //     let addUser = {username: 'test', password: 'test', email: 'test@mail.com'}
  //     let result = await models.User.create(addUser);
  //     done()
  //   } catch (e) {
  //     e.name.should.be.eq('SequelizeUniqueConstraintError');
  //     done()
  //   }
  // });
});
