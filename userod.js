// commands/userod.js
const { getPlayer, savePlayer } = require("../utils/db");
const { getRod } = require("../data/shopData");

module.exports = {
  name: "userod",
  aliases: ["dungcan"],
  description: "Trang bị cần câu đang sở hữu. Dùng: !userod <mã_cần>",
  execute(message, args) {
    const player = getPlayer(message.author.id, message.author.username);

    if (!args[0]) {
      return message.reply("❌ Cách dùng: `!userod <mã_cần>`.");
    }

    const rodId = args[0].toLowerCase();
    const rod = getRod(rodId);

    if (!rod) {
      return message.reply("❌ Không tìm thấy cần câu này.");
    }
    if (!player.rodsOwned.includes(rodId)) {
      return message.reply("❌ Bạn chưa sở hữu cần câu này. Hãy mua ở `!shop`.");
    }

    player.rod = rodId;
    savePlayer(player);

    message.reply(`✅ Đã trang bị **${rod.name}**.`);
  },
};
