var Game = require('../model/Game');
var Ability = require('../model/Ability');

var util = require('util');
var ASSERT = require('../assert');

module.exports = {
    replace: replace
};

function replace(string){
    ASSERT(string !== null && string !== undefined, "String cannot be null!");
    return string.replace(/\[\[([^:]+):([^\]]+)\]\]/g, replaceCallback);
}

function replaceCallback(match, modelType, id){
    switch(modelType.toLowerCase()){
        case('abi'):
        case('ability'):
            var ability = Ability.getById(id);
            ASSERT(ability, 'Trying to auto-link to ability with id "%s" but it does not exist.', id);
            return util.format('[%s](#ability-%s "Go to ability: %s")', ability.name, id, ability.name);
        case('game'):
            var game = Game.getById(id);
            ASSERT(game, 'Trying to auto-link to game with id "%s" but it does not exist.', id);
            return util.format('[%s](#game-%s "Go to game: %s")', game.name, id, game.name);
    }

    return match;
}