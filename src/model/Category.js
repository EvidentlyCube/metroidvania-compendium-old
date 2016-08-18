var _ = require('lodash');
var S = require('string');

var collection = [];

/**
 * @class Category
 * @param {string} id
 * @param {string} name
 * @param {GameToAbility} parent
 * @param {number} description
 * @constructor
 */
var Category = function constructor(id, name, parent, description){
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.name = name;

    /** @member {GameToAbility} */
    this.parent = parent;

    /** @member {string} */
    this.description = description ? description : "";

    /** @member {Array.<Category>} */
    this.children = [];

    /** @member {Array.<Ability>} */
    this.abilities = [];
};


/**
 * @function addToCollection
 * @param {Category} category
 */
Category.addToCollection = function(category){
    collection.push(category);
};

/**
 * @function getCollection
 * @return {Array.<Category>}
 */
Category.getCollection = function(){
    return collection;
};

Category.getRootCategories = function(){
    return _.filter(collection, function(category){
        return !category.parent;
    });
};

/**
 * @function getById
 * @param {string} id
 * @return {Category}
 */
Category.getById = function(id){
    return _.find(collection, function(o){
        return o.id === id;
    });
};

module.exports = Category;