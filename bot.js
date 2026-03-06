const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1',
        disableChatSigning: true, // Tắt bảo mật chat để né lỗi văng
        checkTimeoutInterval: 60000
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào! Đã bật bộ lọc chat thô để chống văng.')
        // Nhảy nhẹ mỗi 30 giây để giữ kết nối
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 30000)
    })

    // Sử dụng sự kiện 'message' để đọc dữ liệu thô (né lỗi SkinsRestorer và Chat Signing)
    bot.on('message', (jsonMsg) => {
        const message = jsonMsg.toString()
        if (message.toLowerCase().includes('tpa')) {
            // Delay 1 giây trước khi accept để server kịp xử lý
            setTimeout(() => bot.chat('/tpaccept'), 1000)
        }
    })

    bot.on('end', () => {
        console.log('Mất kết nối, đang vào lại sau 5 giây...')
        setTimeout(createBot, 5000)
    })

    bot.on('error', err => console.log('Lỗi: ' + err))
}

createBot()
