var collection = [];

/**
 * @typedef {Object} CreditsRow
 * @property {string} name
 * @property {string} contribution
 */

/**
 * @class Credits
 * @param {string} name
 * @param {string} contribution
 * @constructor
 */
var Credits = function constructor(name, contribution){
    /** @member {string} */
    this.name = name;

    /** @member {string} */
    this.contribution = contribution;
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