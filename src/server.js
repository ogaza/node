import fs from "node:fs/promises";
import http from "node:http";
// import open from "open";

export const start = (notes, port) => {
  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}; http://localhost:${port}`);
  });
// simpy opens the browser. npm i open is needed first
//   open(`http://localhost:${port}`);
};

const createServer = (notes) => {
  return http.createServer(async (req, res) => {

    // const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
    const template = await fs.readFile("./src/template.html", "utf-8");
    // const template = await fs.readFile(HTML_PATH, "utf-8");

    const html = interpolate(template, { notes: formatNotes(notes) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `
      <div class="note">
        <p>${note.content}</p>
        <div class="tags">
          ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    `;
    })
    .join("\n");
};

const interpolate = (html, data) => {
  // replaces sth like this {{ note }} with data["note"]
  // regex: look for {{ then for any space, then for any word then ...
  // and look globally
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};
