// utils/db.js
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "players.json");

// Đảm bảo file tồn tại
function ensureFile() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({}, null, 2));
  }
}

function readAll() {
  ensureFile();
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Lỗi đọc players.json, trả về object rỗng:", err);
    return {};
  }
}

function writeAll(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Tạo player mới với giá trị mặc định
function createDefaultPlayer(userId, username) {
  return {
    id: userId,
    username,
    level: 1,
    exp: 0,
    expNeeded: 50,
    gold: 50,
    rod: "can_tre",
    bait: "moi_thuong",
    inventory: {}, // { fishId: quantity }
    baitOwned: { moi_thuong: 999 }, // số lượng mồi đang có
    rodsOwned: ["can_tre"],
    totalFishCaught: 0,
    lastFishTime: 0,
    createdAt: Date.now(),
  };
}

// Lấy player, tự tạo nếu chưa có
function getPlayer(userId, username) {
  const all = readAll();
  if (!all[userId]) {
    all[userId] = createDefaultPlayer(userId, username);
    writeAll(all);
  } else if (username) {
    all[userId].username = username; // cập nhật tên mới nhất
  }
  return all[userId];
}

// Lưu lại player sau khi sửa đổi
function savePlayer(player) {
  const all = readAll();
  all[player.id] = player;
  writeAll(all);
}

module.exports = { getPlayer, savePlayer, readAll, writeAll };
