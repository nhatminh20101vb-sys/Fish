// commands/profile.js
const { EmbedBuilder } = require("discord.js");
const { getPlayer } = require("../utils/db");
const { getRod, getBait } = require("../data/shopData");

module.exports = {
  name: "profile",
  aliases: ["p", "thongtin"],
  description: "Xem thông tin nhân vật",
  execute(message) {
    const target = message.mentions.users.first() || message.author;
    const player = getPlayer(target.id, target.username);

    const rod = getRod(player.rod);
    const bait = getBait(player.bait);

    const embed = new EmbedBuilder()
      .setColor(0x9b59b6)
      .setAuthor({ name: `Hồ sơ của ${target.username}`, iconURL: target.displayAvatarURL() })
      .addFields(
        { name: "📊 Level", value: `${player.level}`, inline: true },
        { name: "⭐ EXP", value: `${player.exp}/${player.expNeeded}`, inline: true },
        { name: "💰 Vàng", value: `${player.gold}`, inline: true },
        { name: "🎣 Cần câu", value: rod ? rod.name : player.rod, inline: true },
        { name: "🪱 Mồi", value: bait ? bait.name : player.bait, inline: true },
        { name: "🐟 Tổng cá đã câu", value: `${player.totalFishCaught}`, inline: true }
      );

    message.reply({ embeds: [embed] });
  },
};
