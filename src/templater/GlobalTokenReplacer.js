var MarkdownParser = require('./MarkdownParser');
var console = require('../console');
var plural = require('../plural');
var packageJson = require('../../package.json');
var linkTokenReplacer = require('./LinkTokenReplacer');
var ASSERT = require('../assert');

var util = require('util');
var YAML = require('yamljs');
var _ = require('lodash');

var tokens;
var lastConsoleDepth;

module.exports = replace;

function replace(string, customTokens) {
    ASSERT(string !== null && string !== undefined, "String cannot be null!");
    if (typeof customTokens === "undefined"){
        customTokens = [];
    }

    lastConsoleDepth = Math.max(1, console.getLastDepth());
    console.header(lastConsoleDepth, "Replacing global tokens");
    if (!tokens) {
        loadTokens();
    }

    var mergedTokens = {};
    _.merge(mergedTokens, customTokens);
    _.merge(mergedTokens, tokens);

    var results;
    do {
        results = replaceGlobalTokens(string, mergedTokens);
        string = results.string;
    } while (results.replaceCount > 0);

    ASSERT(string !== null && string !== undefined, "String became null!");
    return string;
};


function loadTokens() {
    tokens = {
        '~~~~VERSION~~~~': packageJson.version,
        '~~~~VERSIONDATE~~~~': packageJson.versionDate
    };
    console.log(lastConsoleDepth + 1, "Loading global tokens");
    var data = YAML.load('data/global.yml', null, true);
    var dataCount = _.size(data);
    console.green(lastConsoleDepth + 1, util.format('File parsed, %d %s', dataCount, plural(dataCount, 'entry', 'entries')));

    _.forEach(data, function (value, key) {
        tokens['~~~~' + key.toUpperCase() + '~~~~'] = MarkdownParser.parseGuess(replace(linkTokenReplacer.replace(value)));
    });
}

function replaceGlobalTokens(string, tokens) {
    var replaceCount = 0;

    if (!string){
        return {
            string: string,
            replaceCount: replaceCount
        }
    }

    string = String.prototype.replace.call(string, /~~~~.+?~~~~/g, function (match) {
        match = match.toUpperCase();
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