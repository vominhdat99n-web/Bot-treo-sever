const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1',
        disableChatSigning: true,
        // Giảm tầm nhìn xuống tối thiểu để không phải xử lý dữ liệu skin người khác
        viewDistance: 'tiny', 
        checkTimeoutInterval: 120000
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào! Chế độ chống văng do SkinsRestorer đã bật.')
        // Vận động để giữ kết nối
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 30000)
    })

    // Đọc tin nhắn thô để tránh lỗi crash từ plugin chat/skin
    bot.on('messagestr', (message) => {
        if (message.toLowerCase().includes('tpa')) {
            bot.chat('/tpaccept')
        }
    })

    bot.on('end', () => setTimeout(createBot, 5000))
    bot.on('error', err => console.log('Lỗi: ' + err))
}
createBot()
