var MarkdownIt = require('markdown-it')();
var MarkdownItNamedHeaders = require('markdown-it-named-headers');

MarkdownIt.use(MarkdownItNamedHeaders);

module.exports = {
    parseBlock: parseBlock,
    parseInline: parseInline,
    parseGuess: parseGuess
};

function parseBlock(string){
    return MarkdownIt.render(string);
}

function parseInline(string){
    return MarkdownIt.renderInline(string);
}

function parseGuess(string){
    if (string.indexOf("\n") === -1 && string.indexOf("\r") === -1){
        return parseInline(string);
    } else {
        return parseBlock(string);
    }
}