 _ = require('lodash');
var util = require('util');
var YAML = require('yamljs');
var console = require('../console');
var plural = require('../plural');
var Credits = require('../model/Credits');

module.exports = {
    run: run
};

function run(){
    console.header(0, "Parse Credits");

    var data = loadData();
    _.forEach(data, parseRow);

    console.green(1, "All credits parsed!");
}

function loadData(){
    var data = YAML.load('data/credits.yml', null, true);
    var dataCount = _.size(data);
    console.green(1, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

    if (dataCount < 1){
        throw new Error("Must have at least one credits entry");
    }

    return data;
}

/**
* @param {CreditsRow} row
*/
 function parseRow(row, key){
    console.log(2, util.format("Parsing row #%s: %s", key, row.name));
    var credits = new Credits(row.name, row.contribution);
    Credits.addToCollection(credits);
}