var ports = require ("tamago/ports.js");

module.exports = (function() {
	function start(bios) {
		console.log(ports);

		console.log(bios);
	}

	return {
		start: start
	};
})();