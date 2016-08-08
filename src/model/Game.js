var warnings = require('../warnings');

var collection = [];

/**
 * @typedef {Object} GameRow
 * @property {string} name
 * @property {string} series
 * @property {number} date
 * @property {string} wikiUrl
 * @property {boolean} isCompleted
 * @property {Array.<GameAbilityRow>} abilities
 */

/**
 * @typedef {Object} GameAbilityRow
 * @property {string} ability
 * @property {string} description
 * @property {string} url
 */

/**
 * @class Game
 * @param {string} id
 * @param {string} name
 * @param {Series} series
 * @param {number} date
 * @param {string} isCompleted
 * @param {string} wikiUrl
 * @constructor
 */
var Game = function constructor(id, name, series, date, isCompleted, wikiUrl){
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.name = name;

    /** @member {Series} */
    this.series = series;

    /** @member {string} */
    this.date = date;

    /** @member {boolean} */
    this.isCompleted = isCompleted;

    /** @member {string} */
    this.wikiUrl = wikiUrl;

    /** @member {Array.<GameToAbility>} */
    this.abilityLinks = [];

    if (!series){
        throw new Error("Series must be set!");
    }

    if (!this.date){
        warnings.add('Game %s (%s) is missing date.', this.name, this.id);
        this.isCompleted = false;
    }

    if (!this.wikiUrl) {
        warnings.add('Game %s (%s) is missing wikiUrl.', this.name, this.id);
        this.isCompleted = false;
    }
};


/**
 * @function addToCollection
 * @param {Game} game
 */
Game.addToCollection = function(game){
    collection.push(game);
};

/**
 * @function getCollection
 * @return {Array.<Game>}
 */
Game.getCollection = function(){
    return collection;
};

module.exports = Game;