 _ = require('lodash');
var util = require('util');
var YAML = require('yamljs');
var console = require('../console');
var plural = require('../plural');
var Changelog = require('../model/Changelog');

module.exports = {
    run: run
};

function run(){
    console.header(0, "Parse Changelog");

    var data = loadData();
    _.forEach(data, parseRow);

    console.green(1, "All categories parsed!");
}

function loadData(){
    var data = YAML.load('data/changelog.yml', null, true);
    var dataCount = _.size(data);
    console.green(1, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

    if (dataCount < 1){
        throw new Error("Must have at least one changelog entry");
    }

    return data;
}

/**
* @param {ChangelogRow} row
*/
 function parseRow(row, key){
    console.log(2, util.format("Parsing row: %s (%s)", key, row.date));
    var changelog = new Changelog(row.date, row.version, row.changes);
    Changelog.addToCollection(changelog);
}