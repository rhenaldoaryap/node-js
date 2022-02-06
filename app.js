const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/currenttime", function (req, res) {
  const date = new Date().toISOString();
  res.send(`<h1>${date}</h1>`);
});

app.get("/", function (req, res) {
  res.send(
    `<form action="/user-data" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>`
  );
});

app.post("/user-data", function (req, res) {
  const userName = req.body.username;

  const filePath = path.join(__dirname, "data", "users.json");
  const readFile = fs.readFileSync(filePath);

  const existingUser = JSON.parse(readFile);

  existingUser.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUser));

  res.send(`<h1>Username stored!</h1>`);
});

app.get("/users", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");

  const readFile = fs.readFileSync(filePath);
  const existingUser = JSON.parse(readFile);

  let responseData = "<ul>";

  for (const user of existingUser) {
    responseData += "<li>" + user + "</li>";
  }

  responseData += "</ul>";

  res.send(responseData);
});

app.listen(3000);

// function handleRequest(request, response) {
//   if (request.url === "/currenttime") {
//     const date = new Date().toISOString();
//     response.statusCode = 200;
//     response.end(`<h1>${date}</h1>`);
//   } else if (request.url === "/") {
//     // localhost:3000/currenttime
//     // localhost:3000
//     response.statusCode = 200;
//     response.end("<h1>Hello World!</h1>");
//   }
// }

// const server = http.createServer(handleRequest);

// server.listen(3000);
