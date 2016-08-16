var _ = require('lodash');
var collection = [];

/**
 * @typedef {Object} PlatformRow
 * @property {string} name
 * @property {string} shortName
 * @property {string} url
 */

/**
 * @class Platform
 * @param {string} id
 * @param {string} name
 * @param {string} shortName
 * @param {string} url
 * @constructor
 */
var Platform = function(id, name, shortName, url){
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.name = name;

    /** @member {string} */
    this.shortName = shortName;

    /** @member {string} */
    this.url = url;
};


/**
 * @function addToCollection
 * @param {Platform} platform
 */
Platform.addToCollection = function(platform){
    collection.push(platform);
};

/**
 * @function getCollection
 * @return {Array.<Platform>}
 */
Platform.getCollection = function(){
    return collection;
};

/**
 * @function getById
 * @param {string} id
 * @return {Platform}
 */
Platform.getById = function(id){
    return _.find(collection, function(o){
        return o.id === id;
    });
};

module.exports = Platform;