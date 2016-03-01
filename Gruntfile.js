module.exports = function (grunt) {
  "use strict";
  grunt.initConfig({
    shell: {
      install:{
        command: 'bundle install'
        , stdout: true
      }
      , jekyll: {
        command: 'bundle exec jekyll build -w'
        , stdout: true
      }
      , buildOnce: {
        command: 'bundle exec jekyll build --incremental'
        , stdout: true
      }
      , clean: {
        command: 'rm -rf _site'
        , stdout: true
      }
    }
    , watch: {
      options: {
        livereload: true
      }
      , site:{
        files: ['_site/**']
      }
      , jekyll:{
        files: ['_config.yml', '_layouts/**', '_posts/**'
        , '_includes/**', '_sass/**', '_data/**','images/**'
        ,'id/**', 'public/**'
        , 'index.html', 'style.scss', '*.md', 'feed.xml'
        ]
        , tasks: [
        'shell:clean'
        , 'shell:buildOnce'
        ]
      }
    }

    , connect: {
      server: {
        options: {
          livereload: true,
          base: '_site/',
          port: 9009
        }
      }
    }

  });

  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');


  grunt.registerTask('install', 'shell:install');

  grunt.registerTask('serve', [
    'connect:server'
    , 'watch'
    ]);

  grunt.registerTask('rebuild',[
    'shell:clean'
    ,'shell:buildOnce'
    ]);

  // Register build and watch jekyll
  grunt.registerTask('jekyll', 'shell:jekyll');

  // Default task so that you just call 'grunt' on you console
  grunt.registerTask('default', 'serve');
};
