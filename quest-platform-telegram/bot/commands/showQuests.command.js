const showQuestsCommand = function(ctx) {
    const store = ctx.session.store;
    const data = store.getState().entities;
    const ui = store.getState().ui;

    let answer = 'Доступные квесты: ';

    Object.keys(data).forEach((key) => {
        const questTitle = data[key].title;
        const questCommand = data[key].command;
        let str = '\n' + questTitle + ' : ' + questCommand;

        if (ui.quests[key].isFinished) {
            str = str.concat(' (уже пройдено)');
        }

        answer = answer.concat(str);
    });

    return ctx.reply(answer);
};



module.exports = showQuestsCommand;
