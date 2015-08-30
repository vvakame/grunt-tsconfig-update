'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        ts: {
            options: {
                compile: true,                 // perform compilation. [true (default) | false]
                comments: false,               // same as !removeComments. [true | false (default)]
                target: 'es5',                 // target javascript language. [es3 (default) | es5]
                module: 'umd',                 // target javascript module style. [amd (default) | commonjs]
                noImplicitAny: true,
                sourceMap: false,              // generate a source map for every output js file. [true (default) | false]
                sourceRoot: '',                // where to locate TypeScript files. [(default) '' == source ts location]
                mapRoot: '',                   // where to locate .map.js files. [(default) '' == generated js location.]
                declaration: false,            // generate a declaration .d.ts file for every output js file. [true | false (default)]
                experimentalDecorators: true
            },
            clientMain: {
                src: [
                    './**/*.ts',
                    '!./ignore/**/*.ts'
                ],
                options: {
                    declaration: true
                }
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: [
                'test/fixtures/testA',
                'test/fixtures/testB/**/tsconfig.json'
            ]
        },

        // Configuration to be run (and then tested).
        tsconfig: {
            testA: {
                options: {
                    project: "test/fixtures/testA"
                }
            },
            testB: {
                options: {
                    project: "test/fixtures/testB",
                    compilerOptions: '<%= ts.options %>',
                    filesGlob: '<%= ts.clientMain.src %>'
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        },

        changelog: {
            options: {
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-conventional-changelog');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'tsconfig', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);

};
