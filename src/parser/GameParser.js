var _ = require('lodash');
var util = require('util');
var YAML = require('yamljs');
var console = require('../console');
var plural = require('../plural');
var ASSERT = require('../assert');
var glob = require('glob');

var Ability = require('../model/Ability');
var Game = require('../model/Game');
var GameToAbility = require('../model/GameToAbility');
var GamePurchase = require('../model/GamePurchase');
var Series = require('../model/Series');
var Platform = require('../model/Platform');


module.exports = {
    run: run
};

function run(){
    console.header(0, "Parse Games");
    var files = glob.sync('data/games/*.yml');
    _.forEach(files, parseFile);
}

function parseFile(fileName){
    var data = loadData(fileName);

    _.forEach(data, parseGameRow);

    console.green(1, "All games parsed!");
}

function loadData(fileName){
    console.log(1, util.format("Loading '%s'", fileName));
    var data = YAML.load(fileName, null, true);
    var dataCount = _.size(data);
    console.green(1, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

    if (dataCount < 1){
        console.warning(1, "File has no game!");
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
    var game = new Game(key, gameRow.name, gameRow.description, series, parseInt(gameRow.date), gameRow.isCompleted, gameRow.links);
    series.games.push(game);
    Game.addToCollection(game);

    _.forEach(gameRow.platforms, function(platformId){
        console.log(3, util.format('Adding platform %s', platformId));
        game.addPlatform(Platform.getById(platformId));
    });
    _.forEach(gameRow.buy, function(url, key){
        console.log(3, util.format('Adding purchase %s: %s', key. url));
        game.addPurchase(new GamePurchase(
            Platform.getById(key),
            game,
            url
        ));
    });

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
     */
    function parseAbilityRow(abilityRow){
        console.green(3, util.format("Parsing ability %s", abilityRow.name));
        var gameToAbility = new GameToAbility(game, abilityRow.name, abilityRow.url, abilityRow.description);
        game.abilityLinks.push(gameToAbility);

        if (abilityRow.ability && abilityRow.abilities){
            throw new Error(util.format("Ability %s has both 'ability' and 'abilities' set", abilityRow.name));
        } else if (!abilityRow.ability && (!abilityRow.abilities || abilityRow.abilities.length === 0)){
            throw new Error(util.format("Ability %s has neither 'ability' nor 'abilities' set", abilityRow.name));
        }

        if (abilityRow.ability){
            abilityRow.abilities = [abilityRow.ability];
        }

        _.forEach(abilityRow.abilities, function(ability){
            console.log(4, util.format('Adding ability %s', ability));
            gameToAbility.addAbility(Ability.getById(ability))
        });
    }

    return parseAbilityRow;
}