
const os = require("os");

const startTime = Date.now();

const commands = {
  ping: async () => {
    return "🏓 Pong! Bot is working.";
  },

  help: async () => {
    return [
      "🤖 BOT COMMANDS",
      "",
      "/ping - Check bot status",
      "/help - Show commands",
      "/info - Bot information",
      "/uptime - Show uptime"
    ].join("\n");
  },

  info: async () => {
    return [
      "🤖 Messenger Group Bot",
      "",
      "Language: Node.js",
      "Runtime: " + process.version,
      "Platform: " + os.platform()
    ].join("\n");
  },

  uptime: async () => {
    const seconds = Math.floor(
      (Date.now() - startTime) / 1000
    );

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remaining = seconds % 60;

    return `⏱️ Uptime: ${hours}h ${minutes}m ${remaining}s`;
  }
};

async function handleCommand(message) {
  if (!message || typeof message !== "string") {
    return null;
  }

  const text = message.trim();

  if (!text.startsWith("/")) {
    return null;
  }

  const parts = text.slice(1).split(/\s+/);
  const name = parts.shift().toLowerCase();

  const command = commands[name];

  if (!command) {
    return "❓ Unknown command. Type /help";
  }

  try {
    return await command(parts);
  } catch (error) {
    console.error("Command error:", error);
    return "❌ An error occurred while running the command.";
  }
}

module.exports = { handleCommand };
