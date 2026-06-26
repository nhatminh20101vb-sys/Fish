# 🎣 Fishing RPG Bot (Discord.js, Prefix Command)

Bot Discord game câu cá RPG đơn giản: câu cá, túi đồ, bán cá, shop mồi/cần câu, hệ thống level/EXP. Lưu dữ liệu bằng file JSON, không cần database.

## Cài đặt

```bash
npm install
```

## Cấu hình

1. Copy `.env.example` thành `.env`
2. Dán token bot Discord của bạn vào `DISCORD_TOKEN`
3. (Tuỳ chọn) Đổi `PREFIX` nếu không muốn dùng `!`

```
DISCORD_TOKEN=your_bot_token_here
PREFIX=!
```

## Chạy bot

```bash
npm start
```

## Lưu ý quan trọng khi tạo bot trên Discord Developer Portal

Vào **Discord Developer Portal → Application của bạn → Bot**, bật:
- ✅ **MESSAGE CONTENT INTENT**

Nếu không bật, bot sẽ không đọc được nội dung message (prefix command sẽ không hoạt động).

## Danh sách lệnh

| Lệnh | Mô tả |
|---|---|
| `!fish` | Câu cá (cooldown 8s) |
| `!inventory` | Xem túi đồ |
| `!profile` | Xem thông tin nhân vật |
| `!top` | Bảng xếp hạng |
| `!sell all` | Bán hết cá |
| `!sell <mã_cá> [số_lượng]` | Bán cá cụ thể |
| `!shop` | Xem cửa hàng mồi/cần câu |
| `!buybait <mã> [số_lượng]` | Mua mồi |
| `!usebait <mã>` | Trang bị mồi |
| `!buyrod <mã>` | Mua cần câu |
| `!userod <mã>` | Trang bị cần câu |
| `!help` | Xem danh sách lệnh |

## Cấu trúc project

```
fishing-bot/
├── index.js              # Entry point, load command tự động
├── data/
│   ├── fishData.js       # Danh sách cá + độ hiếm
│   ├── shopData.js       # Mồi câu + cần câu
│   └── players.json      # Database người chơi (tự tạo)
├── utils/
│   ├── db.js             # Đọc/ghi players.json
│   ├── levelSystem.js    # Tính EXP / lên cấp
│   └── fishingEngine.js  # Logic random cá, tỉ lệ hụt
└── commands/             # Mỗi file = 1 lệnh, tự động load
```

## Mở rộng thêm (gợi ý)

Đây là bản core gọn nhẹ. Bạn có thể thêm:
- Hệ thống map (`/switchmap`) — chỉ cần thêm field `currentMap` vào player + lọc `FISH_LIST` theo map
- Mutation cá (Big, Golden, Prismatic...) — thêm logic random trong `fishingEngine.js`
- Sự kiện tự động/admin — thêm 1 module quản lý event đang active, ảnh hưởng tỉ lệ câu cá
- Lệnh admin (`/giveall`, `/setlevel`...) — check `message.member.permissions` hoặc danh sách admin ID riêng
- Đan dược / vật phẩm buff tạm thời

Mỗi tính năng trên đều có thể thêm dưới dạng 1-2 file mới mà không cần sửa code cũ, do kiến trúc tách module rõ ràng (data / utils / commands).
