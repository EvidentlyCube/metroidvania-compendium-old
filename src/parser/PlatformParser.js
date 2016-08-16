var _ = require('lodash');
var util = require('util');
var YAML = require('yamljs');
var console = require('../console');
var plural = require('../plural');
var Platform = require('../model/Platform');

module.exports = {
    run: run
};

function run(){
    console.header(0, "Parse Platforms");

    var data = loadData();

    _.forEach(data, parseRow);

    console.green(1, "All platforms parsed!");
}

function loadData(){
    var data = YAML.load('data/platforms.yml', null, true);
    var dataCount = _.size(data);
    console.green(1, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

    if (dataCount < 1){
        throw new Error("Must have at least one platform");
    }

    return data;
}

/**
 * @param {PlatformRow} row
 * @param {string} key
 */
function parseRow(row, key){
    console.log(2, util.format("Parsing row: %s", key));
    var platform = new Platform(key, row.name, row.shortName, row.url);
    Platform.addToCollection(platform);
}