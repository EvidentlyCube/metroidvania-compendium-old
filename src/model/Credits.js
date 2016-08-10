var collection = [];

/**
 * @typedef {Object} ChangelogRow
 * @property {string} date
 * @property {string} version
 * @property {string} changes
 */

/**
 * @class Changelog
 * @param {string} date
 * @param {string} version
 * @param {string} changes
 * @constructor
 */
var Changelog = function constructor(date, version, changes){
    /** @member {string} */
    this.date = date;

    /** @member {string} */
    this.version = version;

    /** @member {string} */
    this.changes = changes;
};


/**
 * @function addToCollection
 * @param {Changelog} changelog
 */
Changelog.addToCollection = function(changelog){
    collection.push(changelog);
};

/**
 * @function getCollection
 * @return {Array.<Changelog>}
 */
Changelog.getCollection = function(){
    return collection;
};

module.exports = Changelog;