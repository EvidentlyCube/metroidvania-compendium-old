var _ = require('lodash');
var util = require('util');
var console = require('../../console');
var linkTokenReplacer = require('../LinkTokenReplacer');
var globalTokenReplacer = require('./../GlobalTokenReplacer');
var MarkdownParser = require('../MarkdownParser');

var ejs = require('ejs');

module.exports = {
    replaceFile: run
};

function run(filePath, variables){
    var newContext = {};
    _.assign(newContext, context);
    _.assign(newContext, variables);
    console.log(console.getLastDepth(), util.format('parsing template "%s"', filePath));
    return ejs.renderFile(filePath, newContext, options, returnFunction);
}

var context = {
    parseGuess: parseGuess,
    parseBlock: parseBlock,
    parseInline: parseInline,
    globalTokenReplace: globalTokenReplacer,
    _: _,
    forEach: forEach
};

var options = {};

function returnFunction(error, data){
    if (error){
        throw error;
    }

    return data;
}

function parseBlock(string){
    return MarkdownParser.parseBlock(linkTokenReplacer.replace(globalTokenReplacer(string)));
}
function parseInline(string){
    return MarkdownParser.parseInline(linkTokenReplacer.replace(globalTokenReplacer(string)));
}
function parseGuess(string){
    return MarkdownParser.parseGuess(linkTokenReplacer.replace(globalTokenReplacer(string)));
}

function forEach(list, callback){
    var isFirst = true;
    _.forEach(list, function(value, key){
        callback(value, key, isFirst);
        isFirst = false;
    });
}