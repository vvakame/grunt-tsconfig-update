'use strict';

var path = require("path");
var expand = require('glob-expand');

var defaultCompilerOptions = {
    "target": "es5",
    "module": "commonjs",
    "declaration": false,
    "noImplicitAny": true,
    "removeComments": false,
    "noLib": false,
    "preserveConstEnums": false,
    "suppressImplicitAnyIndexErrors": false
};

var defaultGlobPattern = [
    "./**/*.ts",
    "./**/*.tsx",
    "!./node_modules/**/*"
];

module.exports = function(grunt) {
    grunt.registerMultiTask("tsconfig", "generate & update tsconfig.json", function() {
        var options = this.options({
            project: "./",
            compilerOptions: null,
            filesGlob: null
        });

        if (!grunt.file.exists(options.project)) {
            grunt.file.mkdir(options.project);
        }

        var tsconfigPath = path.resolve(options.project, "tsconfig.json");

        var tsconfig;
        if (grunt.file.exists(tsconfigPath)) {
            tsconfig = grunt.file.readJSON(tsconfigPath);
        } else {
            tsconfig = {};
        }
        tsconfig.compilerOptions = tsconfig.compilerOptions || options.compilerOptions || defaultCompilerOptions;
        tsconfig.filesGlob = tsconfig.filesGlob || options.filesGlob || defaultGlobPattern;
        tsconfig.files = expand({ filter: "isFile", cwd: options.project }, tsconfig.filesGlob);

        grunt.file.write(tsconfigPath, JSON.stringify(tsconfig, null, 4));
    });
};
