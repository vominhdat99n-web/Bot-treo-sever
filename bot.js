const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1'
    })

    const messages = [
        "Chào cả nhà nhé!",
        "Bot treo máy giữ chỗ đây.",
        "Server hôm nay ổn định thật.",
        "8 người bạn của tôi online chưa?",
        "Chúc mọi người chơi game vui vẻ!"
    ];

    bot.on('spawn', () => {
        console.log('Bot đã vào server - Đã bật Nhảy + Chat ngẫu nhiên!');
        
        // Vòng lặp hành động ngẫu nhiên để tránh Pattern Detection
        function randomAction() {
            const delay = Math.floor(Math.random() * (45000 - 15000 + 1)) + 15000;
            setTimeout(() => {
                const rand = Math.random();
                if (rand < 0.4) {
                    bot.setControlState('jump', true);
                    setTimeout(() => bot.setControlState('jump', false), 500);
                } else if (rand < 0.7) {
                    bot.look(bot.entity.yaw + (Math.random() - 0.5), 0);
                } else {
                    const msg = messages[Math.floor(Math.random() * messages.length)];
                    bot.chat(msg);
                }
                randomAction();
            }, delay);
        }
        randomAction();
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message.toLowerCase().includes('tpa')) {
            setTimeout(() => bot.chat('/tpaccept'), 2000);
        }
    });

    bot.on('end', () => setTimeout(createBot, 10000));
    bot.on('error', err => console.log(err));
}
createBot();
