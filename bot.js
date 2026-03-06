const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1'
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào server và đang treo máy vĩnh viễn!')
        // Chỉ cần nhảy nhẹ mỗi 5 phút để giữ kết nối ổn định
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 300000)
    })

    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        // Tự động chấp nhận TPA cho bạn và bạn bè
        if (message.toLowerCase().includes('tpa')) {
            bot.chat('/tpaccept')
        }
    })

    bot.on('end', () => setTimeout(createBot, 10000))
    bot.on('error', err => console.log('Lỗi: ' + err))
}

createBot()
