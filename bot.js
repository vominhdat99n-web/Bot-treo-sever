const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1'
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào server!')
        setInterval(() => {
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
        }, 60000)
    })

    bot.on('end', () => {
        console.log('Mất kết nối, đang thử vào lại sau 30s...')
        setTimeout(createBot, 30000)
    })

    bot.on('error', err => console.log('Lỗi: ' + err))
}

createBot()
                       
