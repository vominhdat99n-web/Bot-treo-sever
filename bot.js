const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1',
        // Chặn lỗi chữ ký tin nhắn khiến bot bị văng khi người khác chat
        checkTimeoutInterval: 60000,
        disableChatSigning: true 
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào và đã chặn lỗi văng khi chat!')
        // Nhảy nhẹ mỗi 1 phút để giữ kết nối
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 60000)
    })

    // Xử lý chat an toàn
    bot.on('chat', (username, message) => {
        try {
            if (username === bot.username) return
            if (message.toLowerCase().includes('tpa')) {
                bot.chat('/tpaccept')
            }
        } catch (err) {
            console.log('Lỗi xử lý tin nhắn nhưng không crash bot.')
        }
    })

    // Tự động vào lại sau 5 giây nếu vẫn bị văng
    bot.on('end', () => {
        console.log('Mất kết nối, đang vào lại...')
        setTimeout(createBot, 5000)
    })

    bot.on('error', err => console.log('Lỗi hệ thống: ' + err))
}

createBot()
