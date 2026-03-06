const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1',
        // Các tùy chọn quan trọng để chống văng khi chat
        disableChatSigning: true,
        checkTimeoutInterval: 90000
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào! Chế độ chống văng khi chat đã kích hoạt.')
        // Nhảy mỗi 45 giây để giữ kết nối
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 45000)
    })

    // Sử dụng sự kiện 'messagestr' thay vì 'chat' để tránh lỗi gói tin mã hóa
    bot.on('messagestr', (message) => {
        if (message.toLowerCase().includes('tpa')) {
            bot.chat('/tpaccept')
        }
    })

    bot.on('end', () => {
        console.log('Mất kết nối, đang tự động vào lại...')
        setTimeout(createBot, 5000)
    })

    bot.on('error', err => console.log('Lỗi: ' + err))
}

createBot()
