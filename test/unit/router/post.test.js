/*global describe*/
/*global before*/
/*global after*/
/*global beforeEach*/
/*global afterEach*/
/*global it*/
/*global request*/
/*global server*/
import startServer from '../../../src/index';


describe('post router test', () => {

  let app = null;
  let agent = null;
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
      done()
    } catch (e) {
      done(e)
    }
  });

  it('create new post', async (done) => {
    try {
      let result = await agent
        .post('/post')
        .send({
          content: '123'
        })
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data.should.has.keys('id', 'content', 'UserId', 'createdAt', 'updatedAt');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('create new post without content', async (done) => {
    try {
      let result = await agent
        .post('/post')
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
        .post('/post')
        .send({
          content: '123'
        })
        .expect(417);
      JSON.parse(result.text).status.should.be.false;
      JSON.parse(result.text).data.should.be.eq('no auth');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('get all post', async (done) => {
    try {
      let result = await agent
        .get('/post')
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data.should.be.a.Array;
      global.t = result.text;
      JSON.parse(result.text).data[0].should.has.keys('id', 'content', 'UserId', 'username', 'createdAt', 'updatedAt');
      done()
    } catch (e) {
      done(e)
    }
  });

  after(async (done) => {
    // console.log(t);
    server.close(() => {
      done();
    });
  })

});