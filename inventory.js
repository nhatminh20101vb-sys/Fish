// commands/inventory.js
const { EmbedBuilder } = require("discord.js");
const { getPlayer } = require("../utils/db");
const { FISH_LIST } = require("../data/fishData");
const { getRod, getBait } = require("../data/shopData");

module.exports = {
  name: "inventory",
  aliases: ["inv", "tuido"],
  description: "Xem túi đồ của bạn",
  execute(message) {
    const player = getPlayer(message.author.id, message.author.username);

    const fishEntries = Object.entries(player.inventory).filter(([, qty]) => qty > 0);

    let fishText = "Túi cá đang trống. Hãy `!fish` để câu cá!";
    if (fishEntries.length > 0) {
      fishText = fishEntries
        .map(([fishId, qty]) => {
          const fishInfo = FISH_LIST.find((f) => f.id === fishId);
          const name = fishInfo ? fishInfo.name : fishId;
          return `• **${name}** x${qty}`;
        })
        .join("\n");
    }

    const rod = getRod(player.rod);
    const bait = getBait(player.bait);

    const embed = new EmbedBuilder()
      .setColor(0x3498db)
      .setTitle(`🎒 Túi đồ của ${message.author.username}`)
      .addFields(
        { name: "💰 Vàng", value: `${player.gold}`, inline: true },
        { name: "📊 Level", value: `${player.level}`, inline: true },
        { name: "⭐ EXP", value: `${player.exp}/${player.expNeeded}`, inline: true },
        { name: "🎣 Cần câu", value: rod ? rod.name : player.rod, inline: true },
        { name: "🪱 Mồi đang dùng", value: bait ? bait.name : player.bait, inline: true },
        { name: "🐟 Tổng cá đã câu", value: `${player.totalFishCaught}`, inline: true },
        { name: "Cá trong túi", value: fishText }
      );

    message.reply({ embeds: [embed] });
  },
};
