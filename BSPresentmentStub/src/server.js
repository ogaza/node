import fs from "node:fs/promises";
import http from "node:http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function start(port) {
  const server = createServer();
  server.listen(port, () => {
    console.log(
      `Server is listening on port ${port}; http://localhost:${port}`
    );
  });
}

function createServer() {
  return http.createServer(hendleRequest);
}

async function hendleRequest(req, res) {
  if (/\/view\b/.test(req.url)) {
    await handleGetView(req, res);

    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ token: "bf0d78d8-0d1f-447e-834c-7dd121802b7a" }));
}

async function handleGetView(req, res) {
  const html = await fs.readFile(`${__dirname}/../pages/index.html`, "utf-8");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}
