const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1'
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào server và bắt đầu chế độ nhảy mỗi 1 phút!')
        
        // Thiết lập vòng lặp thực hiện hành động mỗi 60000ms (1 phút)
        setInterval(() => {
            // Nhảy lên
            bot.setControlState('jump', true)
            
            // Dừng nhảy sau 0.5 giây để hoàn tất 1 lần nhảy
            setTimeout(() => {
                bot.setControlState('jump', false)
            }, 500)
            
            console.log('Bot vừa thực hiện cú nhảy định kỳ (1 phút/lần).')
        }, 60000) 
    })

    // Tự động gõ /tpaccept khi thấy tin nhắn có chữ "tpa"
    bot.on('chat', (username, message) => {
        if (message.toLowerCase().includes('tpa')) {
            bot.chat('/tpaccept')
        }
    })

    bot.on('end', () => {
        console.log('Mất kết nối, đang thử vào lại sau 10 giây...')
        setTimeout(createBot, 10000)
    })

    bot.on('error', err => console.log('Lỗi: ' + err))
}

createBot()
