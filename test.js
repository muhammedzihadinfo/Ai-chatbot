
const { handleCommand } = require("./commands");

async function test() {
  const messages = [
    "/ping",
    "/help",
    "/info",
    "/uptime",
    "/unknown",
    "hello"
  ];

  for (const message of messages) {
    console.log("\n> " + message);

    const reply = await handleCommand(message);

    if (reply) {
      console.log(reply);
    } else {
      console.log("(Not a command)");
    }
  }
}

test();
