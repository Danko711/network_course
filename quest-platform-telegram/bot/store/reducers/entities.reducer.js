const SET_ENTITIES = 'SET ENTITIES';



const INITIAL_STATE = { };

const entitiesReducer = function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_ENTITIES: {
            return Object.assign({}, state, action.entities);
        }

        default:
            return state;
    }
};



exports.entitiesReducer = entitiesReducer;

exports.SET_ENTITIES = SET_ENTITIES;
