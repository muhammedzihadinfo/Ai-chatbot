
const http = require("http");
const { handleCommand } = require("./commands");

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("🤖 Messenger Group Bot is running!");
});

server.listen(PORT, () => {
  console.log(`🤖 Server is running on port ${PORT}`);
});

console.log("🤖 Messenger Group Bot code loaded!");

// Command system test
async function testCommandSystem() {
  const result = await handleCommand("/ping");
  console.log("Command test:", result);
}

testCommandSystem();
