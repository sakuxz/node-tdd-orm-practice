import http from 'http'

async function task1_startServer() {

  let app = await new Promise((resolve, reject) => {
    let app = http.createServer(function(request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello World");
      response.end();
    }).listen(8080,'0.0.0.0');
    resolve(app);
  })

  return app;
}

export default task1_startServer;

// task1_startServer();
