const http = require("http");

function handleRequest(request, response) {
  if (request.url === "/currenttime") {
    const date = new Date().toISOString();
    response.statusCode = 200;
    response.end(`<h1>${date}</h1>`);
  } else if (request.url === "/") {
    // localhost:3000/currenttime
    // localhost:3000
    response.statusCode = 200;
    response.end("<h1>Hello World!</h1>");
  }
}

const server = http.createServer(handleRequest);

server.listen(3000);
