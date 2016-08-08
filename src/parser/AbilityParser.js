var _ = require('lodash');
var util = require('util');
var fs = require('fs');
var YAML = require('yamljs');
var console = require('../console');
var plural = require('../plural');
var Ability = require('../model/Ability');
var Category = require('../model/Category');


/**
 * @param {Category} category
 */
function parseAbilitiesForCategory(category) {
    if (category.children.length > 0){
        console.green(1, util.format("Ignoring abilities for category %s because it has child categories.", category.name));
        return;
    }

    var fileName = util.format('data/abilities-%s.yml', category.id);

    console.log(1, util.format("Parsing abilities for category %s (file: %s)", category.name, fileName));

    if (!fs.existsSync(fileName)){
        console.warning(2, "Warning: file missing");
        return;
    }

    var data = loadData(fileName);

    if (!data){
        return;
    }

    _.forEach(data, parseAbilityRowWrapper(category));

    console.green(2, "All abilties parsed!");
}

/**
 * @param {Category} category
 */
function parseAbilityRowWrapper(category){
    /**
     * @param {AbilityRow} abilityRow
     * @param {string} key
     */
    function parseAbilityRow(abilityRow, key){
        console.log(3, util.format("Parsing row: %s (%s)", abilityRow.name, key));
        var ability = new Ability(key, abilityRow.name, abilityRow.description, category);
        category.abilities.push(ability);
        Ability.addToCollection(ability);
    }

    return parseAbilityRow;
}

function loadData(fileName){
    var data = YAML.load(fileName, null, true);
    var dataCount = _.size(data);
    console.green(2, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

    if (dataCount < 1) {
        console.warning("Warning: file exists but contains no ability!");
        return null;
    }

    return data;
}

module.exports = {
    run: function () {
        console.header(0, "Parse Abilities");

        _.forEach(Category.getCollection(), parseAbilitiesForCategory)
    }
};