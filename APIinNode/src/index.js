import http from "http";

const PORT = process.env.PORT || 4000;

runServer();

function runServer() {
  const server = http.createServer(handleRequest);
  server.listen(PORT, onServerRunning);
}

function handleRequest(req, res) {
  if (req.url == "/" && req.method == "GET") {
    handleRootGet(req, res);

    return;
  }

  handle404(req, res);
}

function handleRootGet(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message: "Hello" }));
  res.end();
}

function handle404(req, res) {
  res.writeHead(404, { "Content-Type": "text" });
  res.write("no such url");
  res.end();
}

function onServerRunning() {
  console.log(`server running on http://localhost:${PORT}`);
}
