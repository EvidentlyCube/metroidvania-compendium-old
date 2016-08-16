var collection = [];

/**
 * @class
 * @param {Platform} platform
 * @param {Game} game
 * @param {string} url
 * @constructor
 */
var GamePurchase = function(platform, game, url){
    /** @member {Platform} */
    this.platform = platform;

    /** @member {Game} */
    this.game = game;

    /** @member {string} */
    this.url = url;
};

/**
 * @function addToCollection
 * @param {GamePurchase} gamePurchase
 */
GamePurchase.addToCollection = function(gamePurchase){
    collection.push(gamePurchase);
};

/**
 * @function getCollection
 * @return {Array.<GamePurchase>}
 */
GamePurchase.getCollection = function(){
    return collection;
};

module.exports = GamePurchase;