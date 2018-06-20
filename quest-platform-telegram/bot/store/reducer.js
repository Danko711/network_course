const combineReducers = require('redux').combineReducers;

const questReducer = require('./reducers/quest.reducer').questReducer;
const entitiesReducer = require('./reducers/entities.reducer').entitiesReducer;



const reducer = combineReducers({
    ui : questReducer,
    entities : entitiesReducer
});



module.exports = reducer;