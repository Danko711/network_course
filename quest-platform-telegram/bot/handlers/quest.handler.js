const UPDATE_ACTIVE_QUEST = require('../store/actions').UPDATE_ACTIVE_QUEST;
const FINISH_ACTIVE_QUEST = require('../store/actions').FINISH_ACTIVE_QUEST;



const questHandler = function (ctx) {
    try {
        const store = ctx.session.store;
        const ui = store.getState().ui;

        if (ui.active.name !== null) {
            const activeQuestData = store.getState().entities[ui.active.name];
            const message = ctx.update.message.text;
            const index = ui.active.index;
            const finished = (index + 1) === activeQuestData.dialogue.length;
            const current = activeQuestData.dialogue[index];

            let replyMessage;

            if (message.toLowerCase() === current.answer.toLowerCase()) {
                store.dispatch({ type : UPDATE_ACTIVE_QUEST });
                let ui = store.getState().ui;

                if (!finished) {
                    replyMessage = activeQuestData.dialogue[ui.active.index].question;
                } else {
                    store.dispatch({ type : FINISH_ACTIVE_QUEST });
                    replyMessage = 'заебись! Ты прошел квест! \n Позыреть доступные квесты: /quests';
                }
            } else {
                replyMessage = 'нихуя не правильно! \n';
                replyMessage = replyMessage.concat(current.question);
            }

            return ctx.reply(replyMessage);
        } else {
            let replyMessage = 'Выбери квест! \n Позыреть доступные квесты: /quests';
            return ctx.reply(replyMessage);
        }

    } catch(err) {
       console.log('Error: in quest.handler') ;
       console.error(err);
    }
};



module.exports = questHandler;