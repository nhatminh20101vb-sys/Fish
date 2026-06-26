// commands/buybait.js
const { EmbedBuilder } = require("discord.js");
const { getPlayer, savePlayer } = require("../utils/db");
const { getBait } = require("../data/shopData");

module.exports = {
  name: "buybait",
  aliases: ["muamoi"],
  description: "Mua mồi câu. Dùng: !buybait <mã_mồi> [số_lượng]",
  execute(message, args) {
    const player = getPlayer(message.author.id, message.author.username);

    if (!args[0]) {
      return message.reply("❌ Cách dùng: `!buybait <mã_mồi> [số_lượng]`. Xem mã trong `!shop`.");
    }

    const baitId = args[0].toLowerCase();
    const bait = getBait(baitId);

    if (!bait) {
      return message.reply("❌ Không tìm thấy loại mồi này. Xem `!shop` để biết mã đúng.");
    }

    const quantity = args[1] && !isNaN(parseInt(args[1])) ? Math.max(1, parseInt(args[1])) : 1;
    const totalCost = bait.price * quantity;

    if (player.gold < totalCost) {
      return message.reply(
        `❌ Bạn không đủ vàng. Cần **${totalCost}** vàng, hiện có **${player.gold}** vàng.`
      );
    }

    player.gold -= totalCost;
    player.baitOwned[baitId] = (player.baitOwned[baitId] || 0) + quantity;
    savePlayer(player);

    const embed = new EmbedBuilder()
      .setColor(0x2ecc71)
      .setDescription(
        `✅ Đã mua **${quantity}x ${bait.name}** với giá **${totalCost}** vàng.\nDùng \`!usebait ${baitId}\` để trang bị.`
      );
    message.reply({ embeds: [embed] });
  },
};
