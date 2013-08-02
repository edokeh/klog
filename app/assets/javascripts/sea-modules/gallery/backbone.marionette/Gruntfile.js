var request = require('request');
var path = require('path');

module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');

    function repl(code, filename) {
        var id = pkg.family + '/' + pkg.name + '/' + pkg.version + '/' + filename;
        code = 'define("' + id + '", ["gallery/underscore/1.4.4/underscore", "backbone"], function(require, exports) {'
            + '\n var _ = require("gallery/underscore/1.4.4/underscore"), Backbone = require("backbone"); \n'
            + code
            + '\n return Backbone;'
            + '\n });';
        return code;
    }

    grunt.registerMultiTask('download', function () {
        var done = this.async();

        var options = this.options({dest: 'src'});
        var data = this.data;

        grunt.log.writeln('downloading ' + data.url);
        request.get(data.url, function (err, res, body) {
            if (err) {
                grunt.log.error(err);
            } else if (res.statusCode !== 200) {
                grunt.log.error('status code: ' + res.statusCode);
            } else {
                var code = body;
                if (options.transform && typeof options.transform === 'function') {
                    grunt.log.writeln('Transform code');
                    code = options.transform(code);
                } else if (options.header && options.footer) {
                    grunt.log.writeln('Add header and footer');
                    code = [options.header, code, options.footer].join('\n');
                }
                grunt.file.write(path.join(options.dest, data.name), code);
                grunt.log.ok();
            }
            done();
        });
    });

    grunt.initConfig({
        pkg: pkg,

        download: {
            options: {
                dest: pkg.version
            },
            src: {
                options: {
                    transform: function (code) {
                        return repl(code, 'backbone.marionette-debug');
                    }
                },
                url: 'http://marionettejs.com/downloads/backbone.marionette.js',
                name: 'backbone.marionette-debug.js'
            },
            min: {
                options: {
                    transform: function (code) {
                        return repl(code, 'backbone.marionette.js');
                    }
                },
                url: 'http://marionettejs.com/downloads/backbone.marionette.min.js',
                name: 'backbone.marionette.js'
            }
        }
    });
    grunt.registerTask('build', ['download']);
};