var ASSERT = require('../assert');

/**
 * @class GameToAbility
 * @param {Game} game
 * @param {Ability} ability
 * @param {string} url
 * @param {string} description
 * @constructor
 */
var GameToAbility = function constructor(game, ability, url, description){
    /** @member {Game} */
    this.game = game;

    /** @member {Ability} */
    this.ability = ability;

    /** @member {string} */
    this.url = url;

    /** @member {string} */
    this.description = description;

    ASSERT(this.game, "Null game passed");
    ASSERT(this.ability, "Null ability passed");
};

module.exports = GameToAbility;