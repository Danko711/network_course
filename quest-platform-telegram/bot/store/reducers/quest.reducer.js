const deepmerge = require('deepmerge');

const SET_ENTITIES = 'SET ENTITIES';
const SET_ACTIVE_QUEST = 'SET ACTIVE QUEST';
const UPDATE_ACTIVE_QUEST = 'UPDATE ACTIVE QUEST';
const FINISH_ACTIVE_QUEST = 'FINISH ACTIVE QUEST';



const INITIAL_STATE = {
    active : {
        name : null,
        index : 0,
        isFinished : false
    },
    quests : { }
};

const questReducer = function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_ENTITIES: {
            try {
                let newState = { quests : { }};
                Object.keys(action.entities).forEach((key) => {
                    newState.quests[key] = {
                        index : 0,
                        isFinished : false
                    }
                });

                return Object.assign({ }, state, newState);

            } catch(err) {
                console.log('Error: in quest.reducer - SET_ENTITIES');
                console.error(err);
            }
        }

        case SET_ACTIVE_QUEST: {
            try {
                let newState = {
                    active : {
                        name : action.name,
                        index : state.quests[action.name].index,
                        isFinished :  !!state.quests[action.name].isFinished
                    }
                };

                return Object.assign({}, state, newState);
            } catch(err) {
                console.log('Error: in quest.reducer - SET_ACTIVE_QUEST');
                console.error(err);
            }
        }

        case UPDATE_ACTIVE_QUEST: {
            try {
                let index = state.active.index + 1;

                let newState = {
                    active :{
                        index : index
                    },
                    quests : { }
                };

                newState.quests[state.active.name] = {
                    index : index
                };

                return deepmerge(state, newState);
            } catch(err) {
                console.log('Error: in quest.reducer - UPDATE_ACTIVE_QUEST');
                console.error(error);
            }
        }

        case FINISH_ACTIVE_QUEST: {
            try {
                let newState = {
                    active : {
                        name : null,
                        isFinished : false,
                        index : 0
                    },
                    quests : { }
                };

                newState.quests[state.active.name] = {
                    index : 0,
                    isFinished : true
                };

                return deepmerge(state, newState)

            } catch(err) {
                console.log('Error: in quest.reducer - FINISH_ACTIVE_QUEST');
                console.error(error);
            }
        }

        default:
            return state;
    }
};



exports.questReducer = questReducer;

exports.SET_ACTIVE_QUEST = SET_ACTIVE_QUEST;
exports.UPDATE_ACTIVE_QUEST = UPDATE_ACTIVE_QUEST;
exports.FINISH_ACTIVE_QUEST = FINISH_ACTIVE_QUEST;
