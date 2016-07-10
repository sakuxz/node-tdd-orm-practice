/*global describe*/
/*global before*/
/*global after*/
/*global beforeEach*/
/*global afterEach*/
/*global it*/
/*global request*/
/*global server*/
import startServer from '../../../src/index';


describe('user router test', () => {

  let app = null;
  before(async (done) => {
    try {
      app = await startServer();
      done()
    } catch (e) {
      done(e)
    }
  });

  it('create user', async (done) => {
    try {
      let result = await request(app)
        .post('/user')
        .send({
          username: 'Ken',
          password: 'pwd',
          email: 'ken@g.com'
        })
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data.should.has.keys('id', 'username', 'email', 'password', 'createdAt', 'updatedAt')
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('create user with exist username', async (done) => {
    try {
      let result = await request(app)
        .post('/user')
        .send({
          username: 'Ken',
          password: 'pwd',
          email: 'ken@g.com'
        })
        .expect(417);
      JSON.parse(result.text).status.should.be.false;
      JSON.parse(result.text).data.should.be.eq('duplicate username');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('get all user', async (done) => {
    try {
      let result = await request(app)
        .get('/user')
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data[0].should.has.keys('id', 'username', 'email', 'createdAt','updatedAt')
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('check islogin no', async (done) => {
    try {
      let result = await request(app)
        .get('/islogin')
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data.should.be.false;
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('login with correct password', async (done) => {
    try {
      let result = await request(app)
        .post('/login')
        .send({
          username: 'Ken',
          password: 'pwd'
        })
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data.should.be.eq('success');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  // it('check islogin yes', async (done) => {
  //   try {
  //     let result = await request(app)
  //       .get('/islogin')
  //       .expect(200);
  //     JSON.parse(result.text).status.should.be.true;
  //     JSON.parse(result.text).data.should.be.true;
  //     done()
  //   } catch (e) {
  //     done(e)
  //   }
  // });
  
  it('test logout', async (done) => {
    try {
      let result = await request(app)
        .post('/logout')
        .expect(200);
      JSON.parse(result.text).status.should.be.true;
      JSON.parse(result.text).data.should.eq('success');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('login with wrong password', async (done) => {
    try {
      let result = await request(app)
        .post('/login')
        .send({
          username: 'Ken',
          password: 'wpwd'
        })
        .expect(417);
      JSON.parse(result.text).status.should.be.false;
      JSON.parse(result.text).data.should.eq('info error');
      done()
    } catch (e) {
      done(e)
    }
  });
  
  it('login with not exist username', async (done) => {
    try {
      let result = await request(app)
        .post('/login')
        .send({
          username: 'Kevin',
          password: 'pwd'
        })
        .expect(417);
      JSON.parse(result.text).status.should.be.false;
      JSON.parse(result.text).data.should.eq('info error');
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