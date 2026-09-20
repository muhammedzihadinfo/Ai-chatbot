
const os = require("os");

const startTime = Date.now();

const commands = {
  ping: {
    permission: "member",
    execute: async () => "🏓 Pong! Bot is working."
  },

  help: {
    permission: "member",
    execute: async () => [
      "🤖 BOT COMMANDS",
      "",
      "/ping - Check bot status",
      "/help - Show commands",
      "/info - Bot information",
      "/uptime - Show uptime",
      "/admininfo - Admin command",
      "/ownerinfo - Owner command"
    ].join("\n")
  },

  info: {
    permission: "member",
    execute: async () => [
      "🤖 Messenger Group Bot",
      "Language: Node.js",
      "Runtime: " + process.version,
      "Platform: " + os.platform()
    ].join("\n")
  },

  uptime: {
    permission: "member",
    execute: async () => {
      const seconds = Math.floor(
        (Date.now() - startTime) / 1000
      );

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remaining = seconds % 60;

      return `⏱️ Uptime: ${hours}h ${minutes}m ${remaining}s`;
    }
  },

  admininfo: {
    permission: "admin",
    execute: async () => "🛡️ Admin command accepted."
  },

  ownerinfo: {
    permission: "owner",
    execute: async () => "👑 Owner command accepted."
  }
};

const levels = {
  member: 0,
  admin: 1,
  owner: 2
};

async function handleCommand(message, role = "member") {
  if (typeof message !== "string") return null;

  const text = message.trim();

  if (!text.startsWith("/")) return null;

  const parts = text.slice(1).split(/\s+/);
  const name = parts.shift().toLowerCase();

  const command = commands[name];

  if (!command) {
    return "❓ Unknown command. Type /help";
  }

  const userLevel = levels[role] ?? -1;
  const requiredLevel = levels[command.permission];

  if (userLevel < requiredLevel) {
    return "⛔ You don't have permission to use this command.";
  }

  try {
    return await command.execute(parts);
  } catch (error) {
    console.error("Command error:", error);
    return "❌ An error occurred while running the command.";
  }
}

module.exports = { handleCommand };
