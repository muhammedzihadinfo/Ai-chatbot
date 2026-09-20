
const { handleCommand } = require("./commands");

async function main() {
  console.log("Member:", await handleCommand("/ping", "member"));

  console.log(
    "Member admin command:",
    await handleCommand("/admininfo", "member")
  );

  console.log(
    "Admin:",
    await handleCommand("/admininfo", "admin")
  );

  console.log(
    "Owner:",
    await handleCommand("/ownerinfo", "owner")
  );
}

main().catch(console.error);
