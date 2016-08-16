var _ = require('lodash');
var warnings = require('../warnings');
var ASSERT = require('../assert');

var collection = [];

/**
 * @typedef {Object} GameRow
 * @property {string} name
 * @property {string} series
 * @property {string} description
 * @property {number} date
 * @property {boolean} isCompleted
 * @property {Array.<string>} platforms
 * @property {Array.<string>} buy
 * @property {Array.<string>} links
 * @property {Array.<GameAbilityRow>} abilities
 */

/**
 * @typedef {Object} GameAbilityRow
 * @property {Array.<string>} abilities
 * @property {string} ability
 * @property {string} name
 * @property {string} description
 * @property {string} url
 */

/**
 * @class Game
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @param {Series} series
 * @param {number} date
 * @param {boolean} isCompleted
 * @param {Array.<string>} links
 * @constructor
 */
var Game = function(id, name, description, series, date, isCompleted, links){
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.name = name;

    /** @member {string} */
    this.description = description;

    /** @member {Series} */
    this.series = series;

    /** @member {string} */
    this.date = date;

    /** @member {boolean} */
    this.isCompleted = isCompleted;

    /** @member {Array.<GameToAbility>} */
    this.abilityLinks = [];

    /** @member {Array.<Platform>} */
    this.platforms = [];

    /** @member {Array.<GamePurchase>} */
    this.purchases = [];

    /** @member {Array.<String>} */
    this.links = links;

    /**
     * @param {Platform} platform
     */
    this.addPlatform = function(platform){
        ASSERT(platform, "Null platform given");
        this.platforms.push(platform);
    };

    ASSERT(this.description, 'Empty description given');

    /**
     * @param {GamePurchase} purchase
     */
    this.addPurchase = function(purchase){
        ASSERT(purchase, "Null purchase given");
        this.purchases.push(purchase);
    };

    if (!series){
        throw new Error("Series must be set!");
    }

    if (!this.date){
        warnings.add('Game %s (%s) is missing date.', this.name, this.id);
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


/**
 * @function getById
 * @param {string} id
 * @return {Game}
 */
Game.getById = function(id){
    return _.find(collection, function(o){
        return o.id === id;
    });
};


module.exports = Game;