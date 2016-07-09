/*global describe*/
/*global beforeEach*/
/*global afterEach*/
/*global it*/
/*global request*/
/*global server*/
import startServer from '../../src/index';


describe('node server test', () => {

  let app = null;
  beforeEach(async (done) => {
    try {
      app = await startServer();
      done()
    } catch (e) {
      done(e)
    }
  });

  it('check server', async (done) => {
    try {
      let result = await request(app).get('/test').expect(200)
      result.text.should.be.eq('hello world')
      done()
    } catch (e) {
      done(e)
    }
  });

  afterEach(async (done) => {
    server.close(() => {
      done();
    });
  })

});
