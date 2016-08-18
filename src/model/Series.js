var _ = require('lodash');
var collection = [];

/**
 * @typedef {Object} SeriesRow
 * @property {string} name
 * @property {string} desc
 * @property {string} wikiUrl
 */

/**
 * @class Series
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @param {string} wikiUrl
 * @constructor
 */
var Series = function(id, name, description, wikiUrl){
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

    this.getGamesSortedByDate = function(){
        return this.games.slice().sort(_sort);

        /**
         * @param {Game} left
         * @param {Game} right
         */
        function _sort(left, right){
            var dateDelta = left.date - right.date;
            if (dateDelta !== 0){
                return dateDelta > 0 ? 1 : 0;
            }

            return left.name > right.name ? 1 : 0;
        }
    }
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