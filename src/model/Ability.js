var _ = require('lodash');
var collection = [];

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