
const http = require("http");
const { handleCommand } = require("./commands");

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8"
  });

  res.end("🤖 Messenger Group Bot is running!");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🤖 Server is running on port ${PORT}`);
});

// Basic command-system check
async function testCommandSystem() {
  console.log("Member:", await handleCommand("/ping", "member"));
  console.log("Member admin command:", await handleCommand("/admininfo", "member"));
  console.log("Admin:", await handleCommand("/admininfo", "admin"));
  console.log("Owner:", await handleCommand("/ownerinfo", "owner"));
}

testCommandSystem().catch(console.error);
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
