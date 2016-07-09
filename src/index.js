import express from 'express';
import {initModel} from './database';
import bodyParser from 'body-parser';
import routerSetup from './router';
import session from 'express-session';

let app = express();

const ip = '0.0.0.0';
const port = 8080;

export default async function start_server() {
  global.db = await initModel();  
  await new Promise((resolve, reject) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(express.static('./static'));
    app.use(session({
      secret: 'one ok rock',
      saveUninitialized: true,
      resave: true
    }));
    app.get('/test', function(req, res, next) {
    
        res.end('hello world');
    
    });
    
    routerSetup(app);
    
    global.server = app.listen(port, ip,()=>resolve(app));
  })
  return app;
}