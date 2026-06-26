// commands/help.js
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "huongdan"],
  description: "Xem danh sách lệnh",
  execute(message, args, client) {
    const prefix = client.prefix;

    const embed = new EmbedBuilder()
      .setColor(0x3498db)
      .setTitle("🎣 Danh sách lệnh - Game Câu Cá RPG")
      .addFields(
        {
          name: "📌 Cơ bản",
          value: [
            `\`${prefix}fish\` - Câu cá`,
            `\`${prefix}inventory\` - Xem túi đồ`,
            `\`${prefix}profile\` - Xem thông tin nhân vật`,
            `\`${prefix}top\` - Bảng xếp hạng`,
          ].join("\n"),
        },
        {
          name: "💰 Kinh tế",
          value: [
            `\`${prefix}sell all\` - Bán hết cá`,
            `\`${prefix}sell <mã_cá> [số_lượng]\` - Bán cá cụ thể`,
            `\`${prefix}shop\` - Xem cửa hàng`,
          ].join("\n"),
        },
        {
          name: "🎣 Trang bị",
          value: [
            `\`${prefix}buybait <mã> [số_lượng]\` - Mua mồi`,
            `\`${prefix}usebait <mã>\` - Trang bị mồi`,
            `\`${prefix}buyrod <mã>\` - Mua cần câu`,
            `\`${prefix}userod <mã>\` - Trang bị cần câu`,
          ].join("\n"),
        }
      )
      .setFooter({ text: "Mẹo: dùng !shop để xem mã vật phẩm" });

    message.reply({ embeds: [embed] });
  },
};
