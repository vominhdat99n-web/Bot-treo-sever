const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1'
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào server và đang ở chế độ chống soi hành vi!')
        
        function actRandomly() {
            // Ngẫu nhiên chọn thời gian từ 20 giây đến 50 giây để làm một hành động
            const delay = Math.floor(Math.random() * (50000 - 20000 + 1)) + 20000;
            
            setTimeout(() => {
                // Ngẫu nhiên chọn: 1 là nhảy, 2 là xoay người, 3 là đi nhẹ
                const action = Math.floor(Math.random() * 3) + 1;
                
                if (action === 1) {
                    bot.setControlState('jump', true);
                    setTimeout(() => bot.setControlState('jump', false), 500);
                } else if (action === 2) {
                    const yaw = bot.entity.yaw + (Math.random() - 0.5) * 2;
                    bot.look(yaw, 0);
                } else {
                    bot.setControlState('forward', true);
                    setTimeout(() => bot.setControlState('forward', false), 200);
                }
                
                actRandomly(); // Lặp lại vòng lặp với thời gian ngẫu nhiên mới
            }, delay);
        }
        actRandomly();
    })

    bot.on('chat', (username, message) => {
        // Chấp nhận mọi yêu cầu dịch chuyển
        if (message.toLowerCase().includes('tpa')) {
            setTimeout(() => {
                bot.chat('/tpaccept');
            }, 1000);
        }
    })

    bot.on('end', () => setTimeout(createBot, 10000));
    bot.on('error', err => console.log(err));
}

createBot()
