// utils/levelSystem.js

// Công thức EXP cần để lên level tiếp theo: tăng dần theo level
function expNeededForLevel(level) {
  return Math.floor(50 * Math.pow(1.18, level - 1));
}

// Cộng EXP cho player, tự động xử lý lên level (có thể lên nhiều cấp 1 lúc)
// Trả về { leveledUp: boolean, levelsGained: number, newLevel: number }
function addExp(player, amount) {
  player.exp += amount;
  let levelsGained = 0;

  while (player.exp >= player.expNeeded) {
    player.exp -= player.expNeeded;
    player.level += 1;
    levelsGained += 1;
    player.expNeeded = expNeededForLevel(player.level);
  }

  return {
    leveledUp: levelsGained > 0,
    levelsGained,
    newLevel: player.level,
  };
}

module.exports = { expNeededForLevel, addExp };
