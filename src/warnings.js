var util = require('util');

var list = [];

module.exports = {
    add: add,
    getAll: getAll
};

function add(){
    list.push(util.format.apply(null, arguments));
}

function getAll(){
    return list;
}