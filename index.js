// index.js
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const PREFIX = process.env.PREFIX || "!";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.prefix = PREFIX;
client.commands = new Collection();

// Tự động load mọi file lệnh trong thư mục commands/
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.name, command);

  // Đăng ký cả alias để gọi tắt
  if (Array.isArray(command.aliases)) {
    for (const alias of command.aliases) {
      client.commands.set(alias, command);
    }
  }
}

console.log(`✅ Đã load ${commandFiles.length} lệnh.`);

client.once("ready", () => {
  console.log(`🤖 Bot đã đăng nhập với tên: ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: `${PREFIX}help | Câu Cá RPG` }],
    status: "online",
  });
});

client.on("messageCreate", async (message) => {
  // Bỏ qua bot và message không bắt đầu bằng prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
  } catch (err) {
    console.error(`Lỗi khi chạy lệnh "${commandName}":`, err);
    message.reply("⚠️ Có lỗi xảy ra khi thực hiện lệnh này. Vui lòng thử lại.");
  }
});

client.login(process.env.DISCORD_TOKEN);
