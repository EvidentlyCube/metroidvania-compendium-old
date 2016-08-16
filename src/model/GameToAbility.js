var util = require('util');
var ASSERT = require('../assert');

/**
 * @class GameToAbility
 * @param {Game} game
 * @param {string} name
 * @param {string} url
 * @param {string} description
 * @constructor
 */
var GameToAbility = function(game, name, url, description){
    /** @member {Game} */
    this.game = game;

    /** @member {Ability} */
    this.ability = null;

    /** @member {Array.<Ability>} */
    this.abilities = [];
	
	/** @member {string} */
	this.name = name;

    /** @member {string} */
    this.url = url;

    /** @member {string} */
    this.description = description;

    /**
     * @param {Ability} ability
     */
    this.addAbility = function(ability){
        ASSERT(ability, "Null ability given");
        this.abilities.push(ability);
        ability.gameLinks.push(this);
    };

	this.getFullName = function(){
		if (this.name){
			return util.format("%s (%s)", this.name, this.ability.name);
		} else {
			return this.ability.name;
		}
	};

    ASSERT(this.name, "No name given");
    ASSERT(this.description, "No description");
    ASSERT(this.game, "Null game passed");
};

module.exports = GameToAbility;