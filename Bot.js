const mineflayer = require('mineflayer');

const botArgs = {
    host: 'lifestealsmp674.mcsh.io', // Ví dụ: sv.mcserverhost.com
    port: 25565,
    username: 'BotTreo247', 
    version: '1.21.1'
};

function initBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('Bot đã online!');
        // Nếu server có mật khẩu, bỏ dấu // ở dòng dưới và sửa mật khẩu
        // bot.chat('/login matkhau123'); 
    });

    // Nhảy mỗi 30 giây để không bị kick AFK
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }
    }, 30000);

    // Xử lý chat an toàn (chống văng khi gặp ký tự lạ)
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`[${username}]: ${message}`);
    });

    // Tự động kết nối lại khi bị văng
    bot.on('end', (reason) => {
        console.log(`Mất kết nối: ${reason}. Đang khởi động lại...`);
        setTimeout(initBot, 10000);
    });

    bot.on('error', (err) => console.log('Lỗi Bot:', err));
}

// Chặn đứng mọi lỗi khiến bot bị crash
process.on('uncaughtException', (err) => console.error('Lỗi hệ thống:', err));
process.on('unhandledRejection', (reason) => console.error('Lỗi hệ thống:', reason));

initBot();
