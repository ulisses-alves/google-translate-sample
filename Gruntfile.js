module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: {
      build: {
        expand: true,
        cwd: 'www/',
        src: '**/*'
      }
    },
    copy: {
      source: {
        expand: true,
        cwd: 'source/',
        dest: 'www/',
        src: '**/*'
      },
      angular: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/',
            dest: 'www/angular/',
            src: [
              'angular/angular.js',
              'angular-route/angular-route.js',
              'angular-resource/angular-resource.js',
              'angular-animate/angular-animate.js',
              'angular-aria/angular-aria.js',
              'angular-material/angular-material.js',
              'angular-material/angular-material.scss'
            ],
            flatten: true
          }
        ]
      },
      roboto: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/roboto-fontface/fonts/',
            dest: 'www/fonts/roboto/',
            src: ['*.eot', '*.ttf', '*.woff', '*.woff2', '*.svg']
          },
          {
            expand: true,
            cwd: 'bower_components/roboto-fontface/css/',
            dest: 'www/roboto-fontface/',
            src: '*.scss'
          }
        ]
      },
      materialIcons: {
        expand: true,
        cwd: 'bower_components/material-design-icons/iconfont/',
        dest: 'www/fonts/material-icons/',
        src: ['*.eot', '*.ttf', '*.woff', '*.woff2', '*.svg']
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        expand: true,
        cwd: 'www/gt-app/',
        dest: 'www/gt-app/',
        src: [
          '**/*.js'
        ]
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        screwIE8: true
      },
      angular: {
        files: {
          'www/angular/angular.min.js': [
            'www/angular/angular.js',
            'www/angular/angular-route.js',
            'www/angular/angular-resource.js',
            'www/angular/angular-animate.js',
            'www/angular/angular-aria.js',
            'www/angular/angular-material.js'
          ]
        }
      },
      index: {
        options: {
          wrap: true
        },
        files: {
          'www/index.min.js': [
            'www/gt-app/gt-app.js',
            'www/gt-app/**/*.js',
            'www/index.js'
          ]
        }
      }
    },
    sass: {
      options: {
        style: 'compressed'
      },
      index: {
        files: {
          'www/index.min.css': 'www/index.scss'
        }
      }
    },
    connect: {
      build: {
        options: {
					port: 8000,
					base: {
						path: 'www/',
						options: {
							index: 'index.html'
						}
					}
				}
      }
    },
    watch: {
			scripts: {
				files: 'source/**/*.js',
				tasks: [
          'copy:source',
          'ngAnnotate',
          'uglify:index'
        ]
			},
      styles: {
				files: 'source/**/*.scss',
				tasks: [
          'copy:source',
          'sass'
        ]
			},
      templates: {
        files: 'source/**/*.html',
        tasks: ['copy:source']
      }
		}
  });

  grunt.registerTask('build', [
    'copy', 'ngAnnotate', 'uglify', 'sass'
  ]);

  grunt.registerTask('default', [
    'clean', 'build', 'connect', 'watch'
  ]);
};
