/* let http = require("http");
let url = require("url");
let fs = require("fs");

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if (filename.endsWith("/")) {
      filename += "index.html";
    }
    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile("./404.html", function (error404, data404) {
          if (error404) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("404 Not Found");
            return res.end();
          }
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data404);
          return res.end();
        });
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);

  */

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname)));

app.get("*", (req, res) => {
  let filePath = path.join(__dirname, req.path);

  if (req.path.endsWith("/")) {
    filePath = path.join(filePath, "index.html");
  }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).sendFile(path.join(__dirname, "404.html"));
    }
    res.sendFile(filePath);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
