module.exports = function(count, singular, plural){
    return count === 1 ? singular : plural;
};