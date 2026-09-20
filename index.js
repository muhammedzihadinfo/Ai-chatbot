const http = require("http");

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("🤖 Messenger Group Bot is running!");
});

server.listen(PORT, () => {
  console.log(`🤖 Bot server is running on port ${PORT}`);
});
