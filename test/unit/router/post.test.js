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
  before(async (done) => {
    try {
      app = await startServer();
      let result = await request(app)
        .post('/user')
        .send({
          username: 'Ken',
          password: 'pwd',
          email: 'ken@g.com'
        })
        .expect(200);
      result = await request(app)
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
      let result = await request(app)
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
      let result = await request(app)
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
      await request(app)
        .post('/logout')
        .expect(200);
      
      let result = await request(app)
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

  after(async (done) => {
    server.close(() => {
      done();
    });
  })

});