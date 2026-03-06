bot.on('spawn', () => {
    console.log('Bot đã vào server!');
    
    function randomJump() {
        // Nhảy ngẫu nhiên trong khoảng từ 30 đến 60 giây
        const delay = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;
        
        setTimeout(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            randomJump(); // Lặp lại vòng lặp ngẫu nhiên
        }, delay);
    }
    randomJump();
});
