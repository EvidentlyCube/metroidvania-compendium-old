var collection = [];

/**
 * @typedef {Object} CreditsRow
 * @property {string} name
 * @property {string} contribution
 * @property {string} url
 */

/**
 * @class Credits
 * @param {string} name
 * @param {string} contribution
 * @param {string} url
 * @constructor
 */
var Credits = function(name, contribution, url){
    /** @member {string} */
    this.name = name;

    /** @member {string} */
    this.contribution = contribution;

    /** @member {string} */
    this.url = url;
};


/**
 * @function addToCollection
 * @param {Credits} credits
 */
Credits.addToCollection = function(credits){
    collection.push(credits);
};

/**
 * @function getCollection
 * @return {Array.<Credits>}
 */
Credits.getCollection = function(){
    return collection;
};

module.exports = Credits;