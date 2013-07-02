module.exports = {
	toHex: function (w, i) { 
		i = i.toString(16).toUpperCase();

		var zeros = "0";
		while (zeros.length < w) { zeros += zeros; }

		return zeros.substr(0, w).substr(i.length) + i;
	},
	memoryBytesPerLine: 16,
	registerBytesPerLine: 8,
	instructionCount: 55
};
