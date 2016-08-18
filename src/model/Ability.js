var _ = require('lodash');
var collection = [];
var ASSERT = require('../assert');

/**
 * @typedef {Object} AbilityRow
 * @property {string} name
 * @property {string} description
 * @property {Array.<string>} variants
 */

/**
 * @class Ability
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @param {Array.<string>} variants
 * @param {Category} category
 * @constructor
 */
var Ability = function constructor(id, name, description, variants, category){
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.name = name;

    /** @member {string} */
    this.description = description;
	
	/** @member {Array.<string>} */
	this.variants = variants || [];

    /** @member {Category} */
    this.category = category;

    /** @member {Array.<GameToAbility>} */
    this.gameLinks = [];

    this.getGamesSortedByName = function(){
        return this.gameLinks.slice().sort(_sort);

        /**
         * @param {GameToAbility} left
         * @param {GameToAbility} right
         */
        function _sort(left, right){
            return left.game.name > right.game.name ? 1 : 0;
        }
    };

    ASSERT(this.name, "Name is missing");
    ASSERT(this.description, "Description is missing");
};


/**
 * @function addToCollection
 * @param {Ability} ability
 */
Ability.addToCollection = function(ability){
    collection.push(ability);
};

/**
 * @function getCollection
 * @return {Array.<Ability>}
 */
Ability.getCollection = function(){
    return collection;
};

/**
 * @function getById
 * @param {string} id
 * @return {Ability}
 */
Ability.getById = function(id){
    return _.find(collection, function(o){
        return o.id === id;
    });
};

module.exports = Ability;