const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1',
        // Tắt hoàn toàn việc kiểm tra chữ ký tin nhắn
        disableChatSigning: true,
        checkTimeoutInterval: 120000
    })

    // Lắng nghe gói tin thô để tránh bị crash bởi hệ thống chat mã hóa
    bot.on('message', (jsonMsg) => {
        const message = jsonMsg.toString()
        // Kiểm tra lệnh TPA từ dòng chat thô
        if (message.toLowerCase().includes('tpa')) {
            bot.chat('/tpaccept')
        }
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào server và đang ở chế độ bảo mật chat cao!')
        // Vòng lặp hành động ngẫu nhiên để giữ kết nối
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 30000)
    })

    bot.on('end', () => {
        console.log('Bot bị ngắt kết nối, đang tự động vào lại sau 10 giây...')
        setTimeout(createBot, 10000)
    })

    bot.on('error', err => console.log('Lỗi phát sinh: ' + err))
}

createBot()
