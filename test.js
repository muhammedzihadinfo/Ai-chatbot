

const {
  handleIncomingMessage
} = require("./messageHandler");

async function main() {
  const testMessages = [
    { body: "/ping", threadID: "test-thread" },
    { body: "/help", threadID: "test-thread" },
    { body: "Hello", threadID: "test-thread" },
    { body: "", threadID: "test-thread" }
  ];

  for (const message of testMessages) {
    const result = await handleIncomingMessage(message);

    console.log("Input:", message.body);
    console.log("Result:", result);
  }
}

main().catch(console.error);
