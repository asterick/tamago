var fs = require("fs");

module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'source/style/runtime.css': 'less/runtime.less'
				}
			}
		},
		watch: {
			less: {
				files: ["less/**/*"],
				tasks: ["less"]
			}
		},
		connect: {
			server: {
				options: {
					rewrites: {
						'/files/modules.js': fs.readFileSync('node_modules/modules/lib/modules.js', 'utf-8')
					},
					port: 9001,
					base: 'source',
					middleware: function(connect, options) {
						return [
							function (req, res, next) {
								var rw = options.rewrites[req._parsedUrl.pathname];
								if (!rw) {
									next();
									return ;
								}
								res.writeHead(200, {'Content-Type': 'text/javascript'});
								res.end(rw);
							},
							connect.static(options.base),
							connect.directory(options.base),
						];
					}
				}
			}
		},
		modules: {
			tamago: {
				root: "source",
				output: "source/tamago.release.js",
				files: {
					src: ["source/tamago.js"]
				},
				format: {
			        renumber: true,
			        hexadecimal: true,
			        quotes: "auto",
			        escapeless: true,
			        compact: true,
			        parentheses: false,
			        semicolons: false
			    }
    		}
		}
	});

	grunt.loadNpmTasks("modules");
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask("default", ["modules"]);
	grunt.registerTask("dev", ["connect", "less", "watch"]);
};
