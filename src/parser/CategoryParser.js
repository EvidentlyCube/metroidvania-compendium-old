 _ = require('lodash');
var util = require('util');
var YAML = require('yamljs');
var console = require('../console');
var plural = require('../plural');
var Category = require('../model/Category');
var Series = require('../model/Series');

module.exports = {
    run: function(){
        console.header(0, "Parse Categories");

        var data = YAML.load('data/categories.yml', null, true);
        var dataCount = _.size(data);
        console.green(1, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

        if (dataCount < 1){
            throw new Error("Must have at least one category");
        }

        _.forEach(data, function(row, key){
            console.log(2, util.format("Parsing row: %s (%s)", key, row.name));
            var parent = Category.getById(row.parent);
            var category = new Category(key, row.name, parent, row.description);
            Category.addToCollection(category);

            if (parent){
                parent.children.push(category);
            }
        });

        console.green(1, "All categories parsed!");
    }
};