// commands/usebait.js
const { getPlayer, savePlayer } = require("../utils/db");
const { getBait } = require("../data/shopData");

module.exports = {
  name: "usebait",
  aliases: ["dungmoi"],
  description: "Trang bị mồi đang sở hữu. Dùng: !usebait <mã_mồi>",
  execute(message, args) {
    const player = getPlayer(message.author.id, message.author.username);

    if (!args[0]) {
      return message.reply("❌ Cách dùng: `!usebait <mã_mồi>`. Xem túi đồ với `!inventory`.");
    }

    const baitId = args[0].toLowerCase();
    const bait = getBait(baitId);
    const owned = player.baitOwned[baitId] || 0;

    if (!bait) {
      return message.reply("❌ Không tìm thấy loại mồi này.");
    }
    if (owned <= 0 && bait.price > 0) {
      return message.reply("❌ Bạn chưa sở hữu loại mồi này. Hãy mua ở `!shop`.");
    }

    player.bait = baitId;
    savePlayer(player);

    message.reply(`✅ Đã trang bị **${bait.name}**.`);
  },
};
