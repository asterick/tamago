var config = require ("tamago/config.js"),
	ports = require ("tamago/data/ports.js"),
	ejs = require("util/ejs.js"),
	tmpl = requireText("tamago/templates/main.html");

ready(function () {
	tmpl = ejs.parse(tmpl);
})

module.exports = (function() {
	function start(bios) {
		// BIOS = Array Buffer containing 640kb of tamatown bios

		$("tamago").html(tmpl(config));
	}

	return {
		start: start
	};
})();