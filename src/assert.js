var util = require('util');

module.exports = function(assertion){
    if (!assertion){
        var args = Array.from(arguments);
        throw new Error(util.format.apply(null, args.slice(1)));
    }
};