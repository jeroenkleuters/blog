module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/main.css": "less/main.less"
        }
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          "index.html": "jade/**/*.jade"
        }
      }
    },

    connect: {
      server: {
            options: {
                port: 9001,
                hostname: 'localhost',
                base: 'E:/werk/www/blog/assets/template/',
                open: true,
                options: {
                  index: 'index.html'
                },
                keepalive: false,
                // livereload: true // Not needed when defined in watch task
            }
        }
    },
    ftpush: {
        build: {
          auth: {
            host: 'broadsight.nl',
            port: 21,
            authKey: 'key1'
          },
          src: 'E:/werk/www/blog/assets/template',
          dest: '/domains/broadsight.nl/public_html/blog/assets/template',
          exclusions: ["E:/werk/www/blog/assets/node_modules/**/*.*",
                       "E:/werk/www/blog/assets/jade/**/*.*",
                       "E:/werk/www/blog/assets/dist/**/*.*",
                       "E:/werk/www/blog/assets/.komodotools",
                       "E:/werk/www/blog/assets/.gitignore",
                       "E:/werk/www/blog/assets/.ftppass",
                       "E:/werk/www/blog/assets/package.json",
                       "E:/werk/www/blog/assets/Gruntfile.js",
                       "E:/werk/www/blog/assets/assets/less/*.less"],
          keep: [],
          simple: true
        }
    },
    watch: {
      styles: {
        files: ['less/**/*.less','jade/**/*.jade'],
        tasks: ['less','jade'], //['less', 'ftpush:build'],
        options: {
          nospawn: true,
            livereload: true,
            reload: true
        }
      }
    },
    csslint: {
            options: {
                csslintrc: '.csslintrc',
            },
            src: 'assets/template/css/**/*.css'
        },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-csslint')
  grunt.loadNpmTasks('grunt-ftpush');

  grunt.registerTask('default', ['connect:server','watch']);
};
