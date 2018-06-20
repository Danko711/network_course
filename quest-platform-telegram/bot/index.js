const Telegraf = require('telegraf');
const app = new Telegraf(process.env.BOT_TOKEN);

const data = require('./data');

const storeFactory = require('./store/store');
const SET_ENTITIES = require('./store/actions').SET_ENTITIES;



app.use(Telegraf.memorySession());

app.use((ctx, next) => {
    if (ctx.session.store) { return next() }
    const store = storeFactory();
    store.dispatch({ type : SET_ENTITIES, entities : data });
    ctx.session.store = store;
    return next();
});
//
// app.use((ctx, next) => {
//     const store = ctx.session.store;
//     store.subscribe(() => { console.dir(store.getState().ui) });
//     next();
// });


// commands
const startCommand = require('./commands/start.command');
const showQuestsCommand = require('./commands/showQuests.command');
const questCommand = require('./commands/quest.command');

app.command('start', startCommand);
app.command('quests', showQuestsCommand);

Object.keys(data).forEach((key) => {
    app.command(data[key].command, (ctx) => { return questCommand(key, ctx) });
});



//handlers
const questHandler = require('./handlers/quest.handler');

app.on('text', questHandler);



app.startPolling();

