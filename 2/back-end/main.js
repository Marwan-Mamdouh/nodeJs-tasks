import { createServer } from "node:http";
import { router } from "./router/route.js";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method && req.url) {
    router[req.method]["/books/"](req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}`);
});
