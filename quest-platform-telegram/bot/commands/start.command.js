const startCommand = function(ctx) {
    let answer = 'Привет';
    answer = answer.concat('\n Чтобы увидеть все допступные квесты введи:');
    answer = answer.concat('\n /quests');

    console.log('start', ctx.from);

    return ctx.reply(answer);
};



module.exports = startCommand;