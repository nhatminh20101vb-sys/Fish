// data/fishData.js
// Danh sách cá trong game. Mỗi cá có: tên, độ hiếm, giá bán cơ bản, exp cơ bản, tỉ lệ xuất hiện (weight)
// Weight càng cao thì càng dễ câu được. Tổng weight không cần = 100, hệ thống sẽ tự tính tỉ lệ.

const FISH_LIST = [
  // Common - dễ câu, giá thấp
  { id: "ca_chep", name: "Cá Chép", rarity: "Common", price: 5, exp: 3, weight: 100 },
  { id: "ca_roi", name: "Cá Rô", price: 6, exp: 3, rarity: "Common", weight: 95 },
  { id: "ca_he", name: "Cá He", rarity: "Common", price: 7, exp: 4, weight: 90 },
  { id: "ca_tre", name: "Cá Trê", rarity: "Common", price: 8, exp: 4, weight: 85 },

  // Uncommon
  { id: "ca_loc", name: "Cá Lóc", rarity: "Uncommon", price: 15, exp: 8, weight: 55 },
  { id: "ca_tram", name: "Cá Trắm", rarity: "Uncommon", price: 18, exp: 9, weight: 50 },
  { id: "ca_thu", name: "Cá Thu", rarity: "Uncommon", price: 22, exp: 10, weight: 45 },

  // Rare
  { id: "ca_hong", name: "Cá Hồng", rarity: "Rare", price: 45, exp: 20, weight: 25 },
  { id: "ca_kiem", name: "Cá Kiếm", rarity: "Rare", price: 55, exp: 24, weight: 20 },
  { id: "ca_map_nho", name: "Cá Mập Nhỏ", rarity: "Rare", price: 65, exp: 28, weight: 16 },

  // Epic
  { id: "ca_rong", name: "Cá Rồng", rarity: "Epic", price: 150, exp: 70, weight: 8 },
  { id: "ca_ngu_long", name: "Cá Ngư Long", rarity: "Epic", price: 180, exp: 80, weight: 6 },

  // Legendary
  { id: "ca_hoa_long", name: "Cá Hỏa Long", rarity: "Legendary", price: 400, exp: 180, weight: 2.5 },
  { id: "ca_bang_long", name: "Cá Băng Long", rarity: "Legendary", price: 420, exp: 190, weight: 2 },

  // Divine
  { id: "ca_than_thoai", name: "Cá Thần Thoại", rarity: "Divine", price: 1200, exp: 500, weight: 0.4 },
  { id: "ca_van_co", name: "Cá Vạn Cổ", rarity: "Divine", price: 1500, exp: 600, weight: 0.2 },
];

// Thứ tự độ hiếm dùng để hiển thị màu / sắp xếp
const RARITY_ORDER = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Divine"];

const RARITY_COLOR = {
  Common: 0x95a5a6,
  Uncommon: 0x2ecc71,
  Rare: 0x3498db,
  Epic: 0x9b59b6,
  Legendary: 0xf1c40f,
  Divine: 0xe74c3c,
};

module.exports = { FISH_LIST, RARITY_ORDER, RARITY_COLOR };
