// utils/fishingEngine.js
const { FISH_LIST } = require("../data/fishData");
const { getBait, getRod } = require("../data/shopData");

const FISH_COOLDOWN_MS = 8000; // 8 giây giữa 2 lần câu

// Random 1 con cá dựa trên weight, có áp dụng rareBonus từ mồi + cần câu
// rareBonus > 1 sẽ làm tăng tỉ lệ tương đối của cá hiếm so với cá thường
function pickRandomFish(totalRareBonus) {
  // Tính weight đã điều chỉnh: cá hiếm hơn (weight gốc nhỏ) được nhân hệ số mạnh hơn
  const adjusted = FISH_LIST.map((fish) => {
    // Hệ số ngược với weight gốc: cá hiếm (weight nhỏ) hưởng lợi nhiều hơn từ rareBonus
    const rarityFactor = 1 + (totalRareBonus - 1) * (100 / (fish.weight + 10));
    return {
      fish,
      adjustedWeight: fish.weight * rarityFactor,
    };
  });

  const totalWeight = adjusted.reduce((sum, f) => sum + f.adjustedWeight, 0);
  let roll = Math.random() * totalWeight;

  for (const entry of adjusted) {
    roll -= entry.adjustedWeight;
    if (roll <= 0) return entry.fish;
  }
  return adjusted[0].fish; // fallback an toàn
}

// Thực hiện 1 lần câu cá hoàn chỉnh
// Trả về: { success: bool, fish, exp, reason }
function doFish(player) {
  const rod = getRod(player.rod) || getRod("can_tre");
  const bait = getBait(player.bait) || getBait("moi_thuong");

  // Kiểm tra hụt
  const failRoll = Math.random();
  if (failRoll < bait.failRate) {
    return { success: false, reason: "miss" };
  }

  const totalRareBonus = (rod.rareBonus || 1) * (bait.rareBonus || 1);
  const fish = pickRandomFish(totalRareBonus);

  const expGained = Math.ceil(fish.exp * (rod.expMulti || 1));

  return { success: true, fish, exp: expGained };
}

function getCooldownRemaining(player) {
  const elapsed = Date.now() - (player.lastFishTime || 0);
  return Math.max(0, FISH_COOLDOWN_MS - elapsed);
}

module.exports = { doFish, getCooldownRemaining, FISH_COOLDOWN_MS };
