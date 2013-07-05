module.exports = (function(){
	var object = require("util/object.js");

	var DISABLED = 0,
		COMMAND = 1,
		ADDRESS = 2,
		READ = 3,
		WRITE = 4;

	function decode(data) {
		return data.match(/../g).map(function(v){
			return parseInt(v,16);
		});
	}

	function encode(data) {
		return data.map(function (v) {
			return (0x100 | v).toString(16).substr(1);
		}).join("");
	}

	function eeprom(bit_width) {
		bit_width || (bit_width = 12);
		var byte_size = 1 << bit_width;

		// Initalize eeprom data (4kB by default)
		try {
			this.data = decode(window.localStorage.eeprom_data);
		} catch(e) {
			this.data = object.fill(byte_size, 0);
		}

		this.address_width = Math.ceil(bit_width / 8);
		this.mask = (1 << bit_width) - 1;

		this.update(false);
	}

	eeprom.prototype.update = function(power, clk, data) {
		// Coerse clk / data lines into integer booleans
		clk = clk ? 1 : 0;
		data = data ? 1 : 0;

		var clk_d = clk - this.last_clk,
			data_d = data - this.last_data;

		this.last_pow = power;
		this.last_clk = clk;
		this.last_data = data;

		// This chip is not receiving power, so it is idle.
		if (!power) {
			this.state = DISABLED;
			this.output = 1; // NACK
			return ;
		}

		// There has been no bus change (idle)
		if (!clk_d && !data_d) { return ; }

		// Give friendly warning about the host behaving poorly
		if (clk_d && data_d) {
			console.error("WARNING: Data and clock lines are transitioning at the same time");
		}
	
		// Data transition while CLK is high
		if (clk && data_d) {
			if (data_d > 0) { 
				if (this.state === WRITE && window.localStorage) {
					window.localStorage.eeprom_data = encode(this.data);
				}

				// Stop
				this.state = DISABLED;
				this.output = 0;
			} else {
				// Start
				this.state = COMMAND;
				this.output = 0;

				this.bits_tx = 0;
				this.read = 0;
			}
		}

		// We are not processing any data right now
		if (this.state === DISABLED) { return ; }

		if (clk_d > 0) {
			// Rising edge clock (input)
			this.read = ((this.read << 1) & 0xFF) | (data ? 1 : 0);
		} else if (clk_d < 0) {
			// Falling edge (delivery)
			if (this.bits_tx < 8) {
				// Simply update output buffer
				if (this.state === READ) {
					this.output = ((this.data[this.address] << this.bits_tx) & 0x80) ? 1 : 0;
				} else {
					this.output = 1;
				}
			} else if (this.bits_tx === 8) {
				this.output = 0; // ACK

				// We have received a full command / output a value
				switch (this.state) {
				case COMMAND:
					switch(this.read & 0xF1) {
					case 0xA0: // Write
						this.state = ADDRESS;
						this.addressbyte = 0;
						this.address = 0;
						break ;
					case 0xA1: // Read
						this.state = READ;
						break ;
					default:
						this.output = 1; // NACK
						break ;
					}
					break ;
				case ADDRESS:
					// Update address
					this.address = (this.address << 8) | this.read;
					if (++this.addressbyte >= this.address_width) {
						this.state = WRITE;
					}
					break ;
				case WRITE:
					this.data[this.address] = this.read & 0xFF;
					this.address = (this.address + 1) & this.mask;
					break ;
				case READ:
					this.address = (this.address + 1) & this.mask;
					break ;
				}
			}

			// Increment bit clock
			this.bits_tx = (this.bits_tx + 1) % 9;
		}
	}

	return {
		eeprom: eeprom
	};
})();
