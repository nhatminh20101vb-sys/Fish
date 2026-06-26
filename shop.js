// commands/shop.js
const { EmbedBuilder } = require("discord.js");
const { BAITS, RODS } = require("../data/shopData");

module.exports = {
  name: "shop",
  aliases: ["cuahang"],
  description: "Xem shop mồi và cần câu",
  execute(message) {
    const baitText = BAITS.map(
      (b) => `• **${b.name}** — ${b.price === 0 ? "Miễn phí" : `${b.price} vàng`} (mã: \`${b.id}\`)`
    ).join("\n");

    const rodText = RODS.map(
      (r) => `• **${r.name}** — ${r.price === 0 ? "Miễn phí" : `${r.price} vàng`} (mã: \`${r.id}\`)`
    ).join("\n");

    const embed = new EmbedBuilder()
      .setColor(0x2ecc71)
      .setTitle("🛒 Cửa hàng")
      .addFields(
        { name: "🪱 Mồi câu", value: baitText },
        { name: "🎣 Cần câu", value: rodText }
      )
      .setFooter({
        text: "Mua mồi: !buybait <mã>  |  Mua cần: !buyrod <mã>",
      });

    message.reply({ embeds: [embed] });
  },
};
