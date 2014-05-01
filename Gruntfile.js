module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    app: {
      name: 'jquery.sliding-menu'
    },
    watch: {
      css: {
        files: ['src/**/*.less', 'example/**/*.less'],
        tasks: ['less:develop'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ['example/**/*.html'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['src/**/*.js', 'example/**/*.js'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      bower: {
        files: ['bower.json'],
        tasks: ['bower:install'],
        options: {
          spawn: false
        }
      }
    },
    concat: {
      dist: {
        files: {
          'dist/<%= app.name %>.js': [
            'bower_components/transitionEnd/transition-end.min.js',
            'src/<%= app.name %>.js'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          "dist/<%= app.name %>.min.js": "dist/<%= app.name %>.js"
        }
      }
    },
    less: {
      develop: {
        options: {
          sourceMap: true
        },
        files: {
          "example/builds/style.css": "example/less/style.less"
        }
      },
      dist: {
        files: {
          "dist/<%= app.name %>.css": "example/less/build.less"
        }
      }
    },
    bower: {
      install: {
        forceLatest: false,
        options: {
          targetDir: 'bower_components',
          layout: 'byComponent',
          install: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          livereload: true,
          open: {
            target: 'http://localhost:8000/example/'
          }
        }
      }
    }
  });

  grunt.registerTask('default', []);

  grunt.registerTask('server', [
    'bower:install',
    'less:develop',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('build', [
    'bower:install',
    'less:dist',
    'concat:dist',
    'uglify:dist'
  ]);

};