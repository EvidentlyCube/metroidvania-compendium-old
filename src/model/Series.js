var _ = require('lodash');
var collection = [];

/**
 * @class Series
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @param {string} wikiUrl
 * @constructor
 */
var Series = function constructor(id, name, description, wikiUrl){
    /** @member {string} */
    this.id = id;

    /** @member {string} */
    this.name = name;

    /** @member {string} */
    this.description = description;

    /** @member {string} */
    this.wikiUrl = wikiUrl;

    /** @member {Array.<Game>} */
    this.games = [];
};


/**
 * @function addToCollection
 * @param {Series} series
 */
Series.addToCollection = function(series){
    collection.push(series);
};

/**
 * @function getCollection
 * @return {Array.<Series>}
 */
Series.getCollection = function(){
    return collection;
};

/**
 * @function getById
 * @param {string} id
 */
Series.getById = function(id){
    return _.find(collection, function(o){
        return o.id === id;
    });
};

module.exports = Series;