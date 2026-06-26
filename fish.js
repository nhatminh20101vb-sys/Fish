// commands/fish.js
const { EmbedBuilder } = require("discord.js");
const { getPlayer, savePlayer } = require("../utils/db");
const { addExp } = require("../utils/levelSystem");
const { doFish, getCooldownRemaining, FISH_COOLDOWN_MS } = require("../utils/fishingEngine");
const { RARITY_COLOR } = require("../data/fishData");

module.exports = {
  name: "fish",
  aliases: ["f", "cauca"],
  description: "Câu cá để kiếm vàng và EXP",
  execute(message) {
    const player = getPlayer(message.author.id, message.author.username);

    const remaining = getCooldownRemaining(player);
    if (remaining > 0) {
      const seconds = (remaining / 1000).toFixed(1);
      return message.reply(`⏳ Bạn cần đợi **${seconds}s** nữa để câu tiếp.`);
    }

    player.lastFishTime = Date.now();
    const result = doFish(player);

    if (!result.success) {
      savePlayer(player);
      const embed = new EmbedBuilder()
        .setColor(0x7f8c8d)
        .setDescription(`🎣 ${message.author.username} đã thả câu... nhưng **cá đã sẩy mất!** 💨`);
      return message.reply({ embeds: [embed] });
    }

    const { fish, exp } = result;

    // Cộng vào túi đồ
    player.inventory[fish.id] = (player.inventory[fish.id] || 0) + 1;
    player.totalFishCaught += 1;

    // Cộng EXP, kiểm tra lên cấp
    const levelResult = addExp(player, exp);

    savePlayer(player);

    const embed = new EmbedBuilder()
      .setColor(RARITY_COLOR[fish.rarity] || 0x3498db)
      .setTitle(`🎣 Câu được: ${fish.name}`)
      .setDescription(`Độ hiếm: **${fish.rarity}**\n+${exp} EXP`)
      .setFooter({ text: `${message.author.username} | Tổng cá đã câu: ${player.totalFishCaught}` });

    message.reply({ embeds: [embed] }).then(() => {
      if (levelResult.leveledUp) {
        const lvlEmbed = new EmbedBuilder()
          .setColor(0xf1c40f)
          .setDescription(
            `🎉 **${message.author.username}** đã lên cấp **${levelResult.newLevel}**!`
          );
        message.channel.send({ embeds: [lvlEmbed] });
      }
    });
  },
};
