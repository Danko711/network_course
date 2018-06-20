const CreateStore = require('redux').createStore;

const reducer = require('./reducer');




const storeFactory = function() {
    return CreateStore(reducer);
};



module.exports = storeFactory;

