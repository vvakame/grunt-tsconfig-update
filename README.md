# grunt-tsconfig-update

[![Circle CI](https://circleci.com/gh/vvakame/grunt-tsconfig-update.svg?style=svg)](https://circleci.com/gh/vvakame/grunt-tsconfig-update)

## Basic usage

```
module.exports = function(grunt) {
    grunt.initConfig({
        tsconfig: {
            main: {
            }
        }
    });

    grunt.loadNpmTasks('grunt-tsconfig-update');
};
```

## Advanced usage

```
module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            options: {
                target: 'es5',
                module: 'amd',
                noImplicitAny: true,
                experimentalDecorators: true
            },
            main: {
                src: [
                    './**/*.ts',
                    '!./ignore/**/*.ts'
                ]
            }
        },

        tsconfig: {
            main: {
                options: {
                    project: "./",
                    compilerOptions: '<%= ts.options %>',
                    filesGlob: '<%= ts.clientMain.src %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tsconfig-update');
};
```
