var util = require('util');
var MarkdownIt = require('markdown-it')();
var MarkdownItNamedHeaders = require('markdown-it-named-headers');

MarkdownIt.use(namedHeadersPlugin());

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

function namedHeadersPlugin(){
    var string = require('string');

    var default_slugify = function(s, used_headers) {
        var slug = string(s).slugify().toString();
        if( used_headers[slug] ) {
            used_headers[slug]++;
            slug += used_headers[slug];
        } else {
            used_headers[slug] += '-' + 1;
        }
        return slug;
    };

    return function(md, opts) {
        var slugify = (opts && opts.slugify) ? opts.slugify : default_slugify;
        var originalHeadingOpen = md.renderer.rules.heading_open;

        var used_headers = {};

        md.renderer.rules.heading_open = function (tokens, idx, something, somethingelse, self) {
            var title = tokens[idx + 1].children.reduce(function (acc, t) {
                return acc + t.content;
            }, '');

            var slug = slugify(title, used_headers);

            var result;
            if (originalHeadingOpen) {
                result = originalHeadingOpen.apply(this, arguments);
            } else {
                result = self.renderToken.apply(self, arguments);
            }

            return result + util.format('<span id="%s" class="anchor"></span>', slug);
        };
    };
}
