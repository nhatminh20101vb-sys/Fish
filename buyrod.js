// commands/buyrod.js
const { EmbedBuilder } = require("discord.js");
const { getPlayer, savePlayer } = require("../utils/db");
const { getRod } = require("../data/shopData");

module.exports = {
  name: "buyrod",
  aliases: ["muacan"],
  description: "Mua cần câu mới. Dùng: !buyrod <mã_cần>",
  execute(message, args) {
    const player = getPlayer(message.author.id, message.author.username);

    if (!args[0]) {
      return message.reply("❌ Cách dùng: `!buyrod <mã_cần>`. Xem mã trong `!shop`.");
    }

    const rodId = args[0].toLowerCase();
    const rod = getRod(rodId);

    if (!rod) {
      return message.reply("❌ Không tìm thấy cần câu này. Xem `!shop` để biết mã đúng.");
    }

    if (player.rodsOwned.includes(rodId)) {
      return message.reply("⚠️ Bạn đã sở hữu cần câu này rồi.");
    }

    if (player.gold < rod.price) {
      return message.reply(
        `❌ Bạn không đủ vàng. Cần **${rod.price}** vàng, hiện có **${player.gold}** vàng.`
      );
    }

    player.gold -= rod.price;
    player.rodsOwned.push(rodId);
    savePlayer(player);

    const embed = new EmbedBuilder()
      .setColor(0x2ecc71)
      .setDescription(
        `✅ Đã mua **${rod.name}** với giá **${rod.price}** vàng.\nDùng \`!userod ${rodId}\` để trang bị.`
      );
    message.reply({ embeds: [embed] });
  },
};
