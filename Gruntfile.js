/**
 * @param {IGrunt} grunt
 */
//noinspection SpellCheckingInspection
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            target: {
                options: {
                    outputStyle: 'expanded',
                    indentWidth: 4
                },
                files: {
                    'template/html/style.tmp.css': 'template/html/style.scss'
                }
            }
        },
        cssmin: {
            target: {
                options: {
                    keepSpecialComments: false,
                    roundingPrecision: -1
                },
                files: {
                    'bin/html/style.min.css': 'template/html/style.tmp.css'
                }
            }
        },
        copy: {
            target: {
                files: [
                    {expand: true, cwd: 'template/common/', src: ['**'], dest: 'bin/html/'}
                ]
            }
        },
        bump: {
            options: {
                commit: false,
                createTag: false,
                push: false
            }
        },
        watch: {
            css: {
                files: ['template/html/*.scss'],
                tasks: ['css']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', [
        'sass',
        'cssmin',
        'bump',
        'update-version-date',
        'rebuild',
        'copy'
    ]);

    grunt.registerTask('css', [
        'sass',
        'cssmin'
    ]);

    grunt.registerTask('update-version-date', function(){
        var dateformat = require('dateformat');

        var packageJson = JSON.parse(grunt.file.read('./package.json'));
        packageJson.versionDate = dateformat(new Date(), "dd mmm yyyy, HH:MM:ss");
        grunt.file.write('./package.json', JSON.stringify(packageJson, null, 4));
    });

    grunt.registerTask('rebuild', function(){
        require('./parse_data');
    })
};