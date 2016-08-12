var _ = require('lodash');
var util = require('util');
var YAML = require('yamljs');
var console = require('../console');
var plural = require('../plural');
var ASSERT = require('../assert');

var Ability = require('../model/Ability');
var Game = require('../model/Game');
var GameToAbility = require('../model/GameToAbility');
var Series = require('../model/Series');

function loadData(fileName){
    var data = YAML.load(fileName, null, true);
    var dataCount = _.size(data);
    console.green(1, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

    if (dataCount < 1){
        throw new Error("Must have at least one game");
    }

    return data;
}

/**
 * @param {GameRow} gameRow
 * @param {string} key
 */
function parseGameRow(gameRow, key){
    console.log(2, util.format("Parsing row: %s (%s)", gameRow.name, key));
    var series = Series.getById(gameRow.series);
    ASSERT(series, "Game %s (%s) belongs to series '%s' which does not exist.", gameRow.name, key, gameRow.series);
    var game = new Game(key, gameRow.name, series, parseInt(gameRow.date), gameRow.isCompleted, gameRow.wikiUrl);
    series.games.push(game);
    Game.addToCollection(game);

    if (!gameRow.abilities || gameRow.abilities.length === 0){
        console.warning(3, "Game has no abilities defined!");
    } else {
        console.log(3, "Parsing game abilities");
    }

    _.forEach(gameRow.abilities, parseAbilityRowWrapper(game));
}

/**
 * @param {Game} game
 */
function parseAbilityRowWrapper(game){
    /**
     * @param {GameAbilityRow} abilityRow
     * @param key
     */
    function parseAbilityRow(abilityRow, key){
        console.green(3, util.format("Parsing ability %s", abilityRow.ability));
        var ability = Ability.getById(abilityRow.ability);
        ASSERT(ability, "Game %s has ability %s which does not exist.", game.name, abilityRow.ability);
        var gameToAbility = new GameToAbility(game, ability, abilityRow.prettyName, abilityRow.url, abilityRow.description);
        game.abilityLinks.push(gameToAbility);
        ability.gameLinks.push(gameToAbility);
    }

    return parseAbilityRow;
}

module.exports = {
    run: function(){
        console.header(0, "Parse Games");

        var data = loadData('data/games.yml');

        _.forEach(data, parseGameRow);

        console.green(1, "All games parsed!");
    }
};