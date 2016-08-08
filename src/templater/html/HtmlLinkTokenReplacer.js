var Ability = require('../../model/Ability');

var util = require('util');
var ASSERT = require('../../assert');

module.exports = {
    replace: replace
};

function replace(string){
    return string.replace(/\[\[([^:]+):([^\]]+)\]\]/g, replaceCallback);
}

function replaceCallback(match, modelType, id){
    switch(modelType.toLowerCase()){
        case('abi'):
        case('ability'):
            var ability = Ability.getById(id);
            ASSERT(ability, 'Trying to auto-link to ability with id %s but it does not exist.', id);
            return util.format('[%s](#ability-%s "Go to ability: %s")', ability.name, id, ability.name);
    }

    return match;
}