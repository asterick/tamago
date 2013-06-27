var tamago = require("tamago/main.js")

ready(function () {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "files/tamago.bin", true);
	xhr.responseType = "arraybuffer";
	xhr.send();

	xhr.onreadystatechange = function () {
		if (xhr.readyState !== 4) {
			return ;
		}

		if (xhr.status !== 200) {
			throw new Error("Could not download firmware");
		}

		// Start the application when BIOS is done
		tamago.start(xhr.response);
	};
});
