// commands/sell.js
const { EmbedBuilder } = require("discord.js");
const { getPlayer, savePlayer } = require("../utils/db");
const { FISH_LIST } = require("../data/fishData");

module.exports = {
  name: "sell",
  aliases: ["banca"],
  description: "Bán cá để lấy vàng. Dùng: !sell all  hoặc  !sell <tên cá>",
  execute(message, args) {
    const player = getPlayer(message.author.id, message.author.username);

    if (!args[0]) {
      return message.reply(
        "❌ Cách dùng: `!sell all` (bán hết) hoặc `!sell <tên_cá>` (ví dụ: `!sell ca_chep`)."
      );
    }

    // Bán hết
    if (args[0].toLowerCase() === "all") {
      let totalGold = 0;
      let totalCount = 0;

      for (const [fishId, qty] of Object.entries(player.inventory)) {
        if (qty <= 0) continue;
        const fishInfo = FISH_LIST.find((f) => f.id === fishId);
        if (!fishInfo) continue;
        totalGold += fishInfo.price * qty;
        totalCount += qty;
        player.inventory[fishId] = 0;
      }

      if (totalCount === 0) {
        return message.reply("🎒 Túi đồ của bạn không có cá để bán.");
      }

      player.gold += totalGold;
      savePlayer(player);

      const embed = new EmbedBuilder()
        .setColor(0xf1c40f)
        .setDescription(
          `💰 Đã bán **${totalCount}** con cá, nhận được **${totalGold}** vàng!\nSố vàng hiện tại: **${player.gold}**`
        );
      return message.reply({ embeds: [embed] });
    }

    // Bán theo id cá cụ thể
    const fishId = args[0].toLowerCase();
    const fishInfo = FISH_LIST.find((f) => f.id === fishId);
    const owned = player.inventory[fishId] || 0;

    if (!fishInfo || owned <= 0) {
      return message.reply("❌ Bạn không có con cá này trong túi đồ.");
    }

    // Số lượng muốn bán (mặc định bán hết loại đó nếu không chỉ định)
    let amount = owned;
    if (args[1] && !isNaN(parseInt(args[1]))) {
      amount = Math.min(parseInt(args[1]), owned);
    }

    const goldGained = fishInfo.price * amount;
    player.inventory[fishId] -= amount;
    player.gold += goldGained;
    savePlayer(player);

    const embed = new EmbedBuilder()
      .setColor(0xf1c40f)
      .setDescription(
        `💰 Đã bán **${amount}x ${fishInfo.name}**, nhận được **${goldGained}** vàng!\nSố vàng hiện tại: **${player.gold}**`
      );
    message.reply({ embeds: [embed] });
  },
};
