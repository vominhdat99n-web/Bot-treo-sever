const mineflayer = require('mineflayer')

function createBot() {
    const bot = mineflayer.createBot({
        host: 'cybele.mcserverhost.com',
        port: 14845,
        username: 'BotTreoGitHub',
        version: '1.21.1'
    })

    bot.on('spawn', () => {
        console.log('Bot đã vào! Đang thực hiện nhảy và xoay nhẹ để giữ kết nối.')
        
        // Cứ mỗi 30 giây thực hiện một chu kỳ vận động nhẹ
        setInterval(() => {
            // Nhảy lên
            bot.setControlState('jump', true)
            setTimeout(() => bot.setControlState('jump', false), 500)
            
            // Xoay nhẹ camera
            const currentYaw = bot.entity.yaw
            bot.look(currentYaw + 0.1, 0)
        }, 30000) 
    })

    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        if (message.toLowerCase().includes('tpa')) {
            bot.chat('/tpaccept')
        }
    })

    bot.on('end', () => {
        console.log('Mất kết nối, đang tự động vào lại sau 5 giây...')
        setTimeout(createBot, 5000)
    })
    
    bot.on('error', err => console.log('Lỗi Bot: ' + err))
}

createBot()
