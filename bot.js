const mineflayer = require('mineflayer');

// Cấu hình thông tin Server của bạn ở đây
const folder_config = {
    host: '191.96.231.4', // Thay bằng IP server của bạn
    port: 13244,               // Cổng server (mặc định là 25565)
    username: 'Bot_Treo_247',  // Tên bot muốn đặt
    version: '1.21.1'          // Phiên bản Minecraft server của bạn
};

function createBot() {
    const bot = mineflayer.createBot(folder_config);

    // --- XỬ LÝ SỰ KIỆN KHI VÀO SERVER ---
    bot.on('spawn', () => {
        console.log('Bot đã vào server thành công!');
        bot.chat('Bot treo máy 24/7 đã sẵn sàng!');
        
        // Nhảy nhẹ để chống bị kick AFK nếu server có plugin check
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000); // Mỗi 1 phút nhảy 1 lần
    });

    // --- XỬ LÝ KHI NGƯỜI KHÁC CHAT (CHỐNG VĂNG) ---
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;

        // Dùng try-catch để nếu tin nhắn có ký tự lạ bot không bị sập
        try {
            console.log(`[Chat] ${username}: ${message}`);
            
            // Ví dụ: bot trả lời khi được gọi tên
            if (message.includes(bot.username)) {
                bot.chat(`Chào ${username}, mình là bot đang treo máy!`);
            }
        } catch (err) {
            console.log('Lỗi xử lý tin nhắn chat, đã bỏ qua để tránh crash.');
        }
    });

    // --- TỰ ĐỘNG KẾT NỐI LẠI KHI BỊ KICK ---
    bot.on('end', (reason) => {
        console.log(`Bot mất kết nối do: ${reason}. Đang thử lại sau 10 giây...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') {
            console.log(`Không thể kết nối tới ${err.address}. Server có thể đang offline.`);
        } else {
            console.log(`Lỗi không xác định: ${err}`);
        }
    });
}

// --- BỘ LỌC LỖI HỆ THỐNG (QUAN TRỌNG NHẤT) ---
// Đoạn này giúp bot không bao giờ bị "văng" ngang khi gặp lỗi Node.js
process.on('uncaughtException', (err) => {
    console.error('Đã chặn lỗi hệ thống (uncaughtException):', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Đã chặn lỗi hứa (unhandledRejection):', reason);
});

// Chạy bot
createBot();
                  
