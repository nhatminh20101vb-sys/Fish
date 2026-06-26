// data/shopData.js
// Mồi câu: tăng tỉ lệ ra cá hiếm hơn (bonus theo rarity weight) và giảm tỉ lệ hụt
const BAITS = [
  {
    id: "moi_thuong",
    name: "Mồi Thường",
    price: 0, // mặc định ai cũng có, không cần mua
    failRate: 0.15, // 15% hụt
    rareBonus: 1, // hệ số nhân tỉ lệ cá hiếm (1 = không đổi)
  },
  {
    id: "moi_tot",
    name: "Mồi Tốt",
    price: 50,
    failRate: 0.10,
    rareBonus: 1.5,
  },
  {
    id: "moi_caocap",
    name: "Mồi Cao Cấp",
    price: 200,
    failRate: 0.06,
    rareBonus: 2.5,
  },
  {
    id: "moi_huyenthoai",
    name: "Mồi Huyền Thoại",
    price: 800,
    failRate: 0.03,
    rareBonus: 4,
  },
];

// Cần câu: tăng EXP nhận được và tăng thêm tỉ lệ cá hiếm, mua 1 lần dùng vĩnh viễn
const RODS = [
  {
    id: "can_tre",
    name: "Cần Tre",
    price: 0, // mặc định
    expMulti: 1,
    rareBonus: 1,
  },
  {
    id: "can_go_sen",
    name: "Cần Gỗ Sến",
    price: 300,
    expMulti: 1.2,
    rareBonus: 1.3,
  },
  {
    id: "can_titan",
    name: "Cần Titan Cường",
    price: 1200,
    expMulti: 1.5,
    rareBonus: 1.8,
  },
  {
    id: "can_rong_tich",
    name: "Cần Long Tích",
    price: 5000,
    expMulti: 2,
    rareBonus: 2.5,
  },
  {
    id: "can_than_thanh",
    name: "Cần Thần Thánh",
    price: 15000,
    expMulti: 3,
    rareBonus: 3.5,
  },
];

function getBait(id) {
  return BAITS.find((b) => b.id === id);
}

function getRod(id) {
  return RODS.find((r) => r.id === id);
}

module.exports = { BAITS, RODS, getBait, getRod };
