const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1',
        disableChatSigning: true,
        // Ép bot bỏ qua mọi xử lý tin nhắn để tránh crash
        checkTimeoutInterval: 30000 
    })

    bot.on('spawn', () => {
        console.log('Bot đã online! Đã bật chế độ tự động hồi sinh siêu tốc.')
    })

    // Khi bị văng, bot sẽ vào lại ngay lập tức
    bot.on('end', () => {
        console.log('Bị kick! Đang vào lại ngay...')
        setTimeout(createBot, 500) // Vào lại sau 0.5 giây
    })

    bot.on('error', (err) => {
        if (err.code === 'ECONNREFUSED') return
        createBot()
    })
}
createBot()

