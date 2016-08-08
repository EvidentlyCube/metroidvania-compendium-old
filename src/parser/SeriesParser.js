var _ = require('lodash');
var util = require('util');
var YAML = require('yamljs');
var console = require('../console');
var plural = require('../plural');
var Series = require('../model/Series');

module.exports = {
    run: run
};

function run(){
    console.header(0, "Parse Series");

    var data = loadData();

    _.forEach(data, parseRow);

    console.green(1, "All series parsed!");
}

function loadData(){
    var data = YAML.load('data/series.yml', null, true);
    var dataCount = _.size(data);
    console.green(1, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

    if (dataCount < 1){
        throw new Error("Must have at least one series");
    }

    return data;
}

function parseRow(row, key){
    console.log(2, util.format("Parsing row: %s", key));
    var series = new Series(key, row.name, row.description, row.wikiUrl);
    Series.addToCollection(series);
}