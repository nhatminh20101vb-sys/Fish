// commands/top.js
const { EmbedBuilder } = require("discord.js");
const { readAll } = require("../utils/db");

module.exports = {
  name: "top",
  aliases: ["rank", "bxh"],
  description: "Xem bảng xếp hạng người chơi",
  execute(message) {
    const all = readAll();
    const players = Object.values(all);

    if (players.length === 0) {
      return message.reply("📋 Chưa có ai chơi cả. Hãy là người đầu tiên dùng `!fish`!");
    }

    const sorted = players
      .sort((a, b) => {
        if (b.level !== a.level) return b.level - a.level;
        return b.exp - a.exp;
      })
      .slice(0, 10);

    const medals = ["🥇", "🥈", "🥉"];
    const lines = sorted.map((p, i) => {
      const medal = medals[i] || `${i + 1}.`;
      return `${medal} **${p.username}** — Lv.${p.level} | 💰${p.gold} | 🐟${p.totalFishCaught}`;
    });

    const embed = new EmbedBuilder()
      .setColor(0xf1c40f)
      .setTitle("🏆 Bảng xếp hạng Top 10")
      .setDescription(lines.join("\n"));

    message.reply({ embeds: [embed] });
  },
};
