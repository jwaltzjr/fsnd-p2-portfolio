module.exports = function (grunt) {

  var config = grunt.file.readYAML('Gruntconfig.yml');

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'src/js/*.js'
      ]
    },
    sasslint: {
      target: [
        'src/scss/*.scss',
        'src/scss/var/*.scss',
        'src/scss/styles/*.scss'
      ]
    },
    sass: {
      dist: {
        src: config.scssSrc + 'style.scss',
        dest: config.cssDist + 'style.css'
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      css: {
        src: config.cssDist + 'style.css',
        dest: config.cssDist + 'style.min.css'
      }
    },
    concat: {
      dist: {
        src: [
          config.jsSrc + 'jquery/*.js',
          config.jsSrc + 'bootstrap/bootstrap.js',
          config.jsSrc + '*.js'
        ],
        dest: config.jsDist + 'app.js'
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        src: config.jsDist + 'app.js',
        dest: config.jsDist + 'app.min.js'
      }
    },
    copy: {
      fonts: {
        expand: true,
        cwd: config.fontSrc,
        src: '**/*',
        dest: config.fontDist
      },
      html: {
        expand: true,
        cwd: config.htmlSrc,
        src: '**/*',
        dest: config.htmlDist
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: config.imgSrc,
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: config.imgDist
        }]
      }
    },
    watch: {
      scss: {
        files: config.scssSrc + '**/*.scss',
        tasks: ['sasslint','sass','cssmin']
      },
      js: {
        files: config.jsSrc + '*.js',
        tasks: ['jshint','concat','uglify']
      },
      fonts: {
        files: config.fontSrc + '**/*',
        tasks: ['copy:fonts']
      },
      img: {
        files: config.imgSrc + '**/*.{png,jpg,jpeg,gif}',
        tasks: ['imagemin']
      }
    }
  });

  grunt.registerTask('default', [
    'jshint',
    'sasslint',
    'sass',
    'cssmin',
    'concat',
    'uglify',
    'copy',
    'imagemin',
    'watch'
  ]);

};