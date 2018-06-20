const SET_ACTIVE_QUEST = require('../store/actions').SET_ACTIVE_QUEST;



const questCommand = function(questName, ctx) {
    try {
        const store = ctx.session.store;
        store.dispatch({ type : SET_ACTIVE_QUEST, name : questName });
        const ui = store.getState().ui;
        const data = store.getState().entities;
        const quest = data[questName];
        const i = store.getState().ui.active.index;
        const question = quest.dialogue[i].question;

        let replyMessage = quest.title;

        if (ui.active.isFinished) {
            let warning = '*Внимание! Ты уже прошел этот квест*';
            replyMessage = replyMessage.concat('\n' + warning);
        }

        replyMessage = replyMessage.concat('\n' + question);

        return ctx.reply(replyMessage);

    } catch(err) {
        console.log('Error: in quest.command');
        console.error(err);
    }
};



module.exports = questCommand;
