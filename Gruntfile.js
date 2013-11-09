var fs = require("fs");

module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'web/style/runtime.css': 'less/runtime.less'
				}
			}
		},
		watch: {
			less: {
				files: ["less/**/*"],
				tasks: ["less"]
			},
			browserify: {
				files: ["src/**/*"],
				tasks: ["browserify"]
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'web'
				}
			}
		},
	  uglify: {
	    options: {
	      mangle: true,
	      compress: { warnings: false },
	      preserveComments: 'some'
	    },
	    prod: {
	      files: {
	        'web/tamagotchi.min.js': ['web/tamagotchi.js']
	      }
	    }
	  },
		browserify: {
		  dist: {
		  	options: { debug: true },
		    files: {
		      'web/tamagotchi.js': ['src/**/*.js']
		    }
		  }
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask("default", ["browserify", "less"]);
	grunt.registerTask("dev", ["connect", "default", "watch"]);
};
