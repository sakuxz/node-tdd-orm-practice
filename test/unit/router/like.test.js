/*global describe*/
/*global before*/
/*global after*/
/*global beforeEach*/
/*global afterEach*/
/*global it*/
/*global request*/
/*global server*/
import startServer from '../../../src/index';


describe('like router test', () => {

  let app = null;
  let agent = null;
  let postId = null;
  before(async (done) => {
    try {
      app = await startServer();
      agent = request.agent(app);
      await agent
        .post('/user')
        .send({
          username: 'Ken',
          password: 'pwd',
          email: 'ken@g.com'
        })
        .expect(200);
      await agent
        .post('/login')
        .send({
          username: 'Ken',
          password: 'pwd'
        })
        .expect(200);
      let result = await agent
        .post('/post')
        .send({
          content: '123'
        })
        .expect(200);
      postId = JSON.parse(result.text).data.id;
      done()
    } catch (e) {
      done(e)
    }
  });

  it('create new like', async (done) => {
    try {
      let result = await agent
        .post('/like')
        .send({
          postId: postId
        })
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data.should.has.keys('id', 'PostId', 'UserId', 'createdAt', 'updatedAt');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('create new like without postId', async (done) => {
    try {
      let result = await agent
        .post('/like')
        .send({
        })
        .expect(417);
      JSON.parse(result.text).status.should.be.false;
      JSON.parse(result.text).data.should.be.eq('database err');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('create new post without login', async (done) => {
    try {
      await agent
        .post('/logout')
        .expect(200);
      
      let result = await agent
        .post('/like')
        .send({
          postId: postId
        })
        .expect(417);
      JSON.parse(result.text).status.should.be.false;
      JSON.parse(result.text).data.should.be.eq('no auth');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('get all like', async (done) => {
    try {
      let result = await agent
        .get('/like/'+postId)
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data.should.be.array;
      JSON.parse(result.text).data[0].should.has.keys('id', 'PostId', 'UserId', 'createdAt', 'updatedAt');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('delete like without login', async (done) => {
    try {
      let result = await agent
        .delete('/like/'+postId)
        .expect(417);
      JSON.parse(result.text).status.should.be.false;
      JSON.parse(result.text).data.should.be.eq('no auth');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('delete like', async (done) => {
    try {
      await agent
        .post('/login')
        .send({
          username: 'Ken',
          password: 'pwd'
        })
        .expect(200);
      
      let result = await agent
        .delete('/like/'+postId)
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data.should.be.eq(1);
      done()
    } catch (e) {
      done(e)
    }
  });

  after(async (done) => {
    server.close(() => {
      done();
    });
  })

});