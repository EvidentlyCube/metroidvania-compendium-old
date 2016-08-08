var util = require('util');
var colors = require('colors/safe');
var S = require('string');

var lastDepthUsed = 0;

function title(text){
    var prefix = "";
    var suffix = "";
    var sideLength = 1;
    var consoleWidth = process.stdout.columns - 1;
    if (!isNaN(consoleWidth) && consoleWidth > 0){
        sideLength = Math.floor((consoleWidth - text.length - 2) / 2);
    }
    if (sideLength > 0){
        prefix = S('#').repeat(sideLength).s + " ";
        suffix = " " + S('#').repeat(sideLength).s;
    }
    console.log(colors.bgWhite.black.bold(prefix + text + suffix));
}

function header(depth, text){
    if (depth === 0){
        log(0, '');
    }
    log(depth, colors.bgCyan.black.bold(" == " + text + " == "));
}
function log(depth, text){
    if (typeof text === 'undefined'){
        text = depth;
        depth = lastDepthUsed;
    }

    lastDepthUsed = depth;
    var prefix = colors.gray(S(' --').repeat(depth).s);
    console.log(prefix + (depth > 0 ? " " : "") + text);
}
function green(depth, text){
    log(depth, colors.green(text));
}
function warning(depth, text){
    log(depth, colors.bgYellow.black(text));
}
function error(text){
    console.log(colors.bgRed.black.bold(text));
}
function object(object){
    console.log(util.inspect(object));
}

module.exports = {
    log: log,
    green: green,
    title: title,
    header: header,
    error: error,
    object: object,
    warning: warning,
    getLastDepth: function(){ return lastDepthUsed; }
};