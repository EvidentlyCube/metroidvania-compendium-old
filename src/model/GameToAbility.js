var util = require('util');
var ASSERT = require('../assert');

/**
 * @class GameToAbility
 * @param {Game} game
 * @param {Ability} ability
 * @param {string} url
 * @param {string} description
 * @constructor
 */
var GameToAbility = function constructor(game, ability, prettyName, url, description){
    /** @member {Game} */
    this.game = game;

    /** @member {Ability} */
    this.ability = ability;
	
	/** @member {string} */
	this.prettyName = prettyName;

    /** @member {string} */
    this.url = url;

    /** @member {string} */
    this.description = description;

	this.getFullName = function(){
		if (this.prettyName){
			return util.format("%s (%s)", this.prettyName, this.ability.name);
		} else {
			return this.ability.name;
		}
	};

    this.getPrettyName = function(){
        return this.prettyName || this.ability.name;
    };

    ASSERT(this.description, "No description");
    ASSERT(this.game, "Null game passed");
    ASSERT(this.ability, "Null ability passed");
};

module.exports = GameToAbility;