var MarkdownParser = require('./MarkdownParser');
var console = require('../console');
var plural = require('../plural');
var packageJson = require('../../package.json');
var linkTokenReplacer = require('./LinkTokenReplacer');

var util = require('util');
var YAML = require('yamljs');
var _ = require('lodash');

var tokens;
var lastConsoleDepth;

module.exports = function (string, customTokens) {
    if (typeof customTokens === "undefined"){
        customTokens = [];
    }

    lastConsoleDepth = Math.max(1, console.getLastDepth());
    console.header(lastConsoleDepth, "Replacing global tokens");
    if (!tokens) {
        tokens = loadTokens();
    }

    var mergedTokens = {};
    _.merge(mergedTokens, customTokens);
    _.merge(mergedTokens, tokens);

    var results;
    do {
        results = replaceGlobalTokens(string, mergedTokens);
        string = results.string;
    } while (results.replaceCount > 0);

    return string;
};

function loadTokens() {
    console.log(lastConsoleDepth + 1, "Loading global tokens");
    var data = YAML.load('data/global.yml', null, true);
    var dataCount = _.size(data);
    console.green(lastConsoleDepth + 1, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

    var newData = {
        '~~~~VERSION~~~~': packageJson.version,
        '~~~~VERSIONDATE~~~~': packageJson.versionDate
    };

    _.forEach(data, function (value, key) {
        newData['~~~~' + key.toUpperCase() + '~~~~'] = MarkdownParser.parseGuess(linkTokenReplacer.replace(value));
    });

    return newData;
}

function replaceGlobalTokens(string, tokens) {
    var replaceCount = 0;

    string = String.prototype.replace.call(string, /~~~~.+?~~~~/g, function (match) {
        if (tokens.hasOwnProperty(match)){
            replaceCount++;
            return tokens[match];
        } else {
            return match;
        }
    });

    return {
        string: string,
        replaceCount: replaceCount
    }
}