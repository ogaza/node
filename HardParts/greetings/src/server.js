import http from "node:http";
import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function startServer(port = 3000) {
  const server = http.createServer(handleRequest);
  server.listen(port);
}

async function handleRequest(request, response) {
  // Send back a message saying "Welcome to Twitter"
  // code here...
  // response.end("Welcome to Twitter");
  if (request.method === "GET" && request.url === "/") {
    await handleGetRoot(response);
  } else if (request.method === "GET" && request.url == "/style.css") {
    await handleGetStyle(response);
  } else if (request.method === "POST" && request.url === "/sayHi") {
    await handlePostHi(response);
  } else if (request.method === "POST" && request.url === "/greeting") {
    await handlePostGreeting(request, response);
  } else if (request.method == "PUT" && request.url == "/update-greeting") {
    await handlePutGreeting(request, response);
  } else if (request.method == "DELETE" && request.url == "/delete-greeting") {
    await handleDeleteGreeting(request, response);
  } else {
    handleBadRequest(request, response);
  }
}

async function handleGetRoot(response) {
  // read the index.html file and send it back to the client
  // code here...
  var page = await fs.readFile(`${__dirname}/index.html`, "utf8");
  // var page = await fs.readFile("./src/index.html", "utf8");
  response.end(page);
}

async function handleGetStyle(response) {
  var styling = await fs.readFile(`${__dirname}/style.css`, "utf8");
  // var styling = await fs.readFile("./src/style.css", "utf8");
  response.end(styling);
}

async function handlePostHi(response) {
  // code here...
  await fs.appendFile(`${__dirname}/hi_log.txt`, "Somebody said hi.\n");
  // await fs.appendFile("./src/hi_log.txt", "Somebody said hi.\n");
  response.end("hi back to you!");
}

async function handlePostGreeting(request, response) {
  // accumulate the request body in a series of chunks
  // code here...
  let body = [];
  request
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", async () => {
      body = Buffer.concat(body).toString() + "\n";
      await fs.appendFile(`${__dirname}/hi_log.txt`, body);
      // await fs.appendFile("./src/hi_log.txt", body);
      response.end(body);
    });
}

async function handlePutGreeting(request, response) {
  let body = [];
  request
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", async () => {
      body = Buffer.concat(body).toString() + "\n";
      await fs.writeFile(`${__dirname}/hi_log.txt`, body);
      // await fs.writeFile("./src/hi_log.txt", body);
      response.end(body);
    });
  response.end("updated greeting");
}

async function handleDeleteGreeting(request, response) {
  await fs.unlink(`${__dirname}/hi_log.txt`);
  // await fs.unlink("./src/hi_log.txt");
  response.end("deleted greeting");
}

function handleBadRequest(request, response) {
  // Handle 404 error: page not found
  // code here...
  response.statusCode = 404;
  response.statusMessage = "Error: Not Found.";
  response.end();
}
