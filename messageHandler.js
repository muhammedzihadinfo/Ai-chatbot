
const { handleCommand } = require("./commands");

async function handleIncomingMessage(message) {
  if (!message || typeof message !== "object") {
    return null;
  }

  const body = message.body;

  if (typeof body !== "string" || !body.trim()) {
    return null;
  }

  const text = body.trim();

  // Ignore ordinary messages
  if (!text.startsWith("/")) {
    return null;
  }

  // Process command
  const reply = await handleCommand(text);

  if (!reply) {
    return null;
  }

  return {
    threadID: message.threadID || null,
    reply
  };
}

module.exports = { handleIncomingMessage };
