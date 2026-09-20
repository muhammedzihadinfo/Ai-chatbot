
const http = require("http");
const { createMessengerBot } = require("@dongdev/fca-unofficial");

const PORT = process.env.PORT || 10000;

// Existing HTTP server — preserved
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

// Messenger Bot
async function startBot() {
  try {
    const bot = await createMessengerBot(
      {
        appState: require("./appstate.json")
      },
      {
        listenEvents: true,
        stopOnSignals: true,
        commandPrefix: "/"
      }
    );

    // Connection errors
    bot.on("error", (err) => {
      console.error("Bot error:", err);
    });

    // Connected
    bot.on("ready", () => {
      console.log("🤖 Messenger Bot connected!");
    });

    // Incoming messages
    bot.on("messageCreate", (event) => {
      if (event.body) {
        console.log(
          `[${event.threadID}] ${event.body}`
        );
      }
    });

    // Ping command
    bot.command("ping", async (ctx) => {
      await ctx.replyAsync("Pong! 🤖");
    });

    // Start the bot
    await bot.launch();

    console.log("🤖 Messenger Bot launched!");

  } catch (err) {
    console.error("❌ Failed to start Messenger Bot:", err);
  }
}

startBot();
