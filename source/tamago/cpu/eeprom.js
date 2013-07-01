module.exports = (function(){
	var DISABLED = 0,
		COMMAND = 1,
		ADDRESS = 2,
		READ = 3,
		WRITE = 4;

	function eeprom(bit_width) {
		bit_width || (bit_width = 12);
		var byte_size = 1 << bit_width;

		// Initalize eeprom data (4kB by default)
		this.data = new Uint8Array(byte_size);
		this.address_width = Math.ceil(bit_width / 8);

		// TODO: EEPROM SHOULD BE STORED SOMEWHERE

		this.update(false);
	}

	eeprom.prototype.update = function(power, clk, data) {
		// This chip is not receiving power, so it 
		if (!power) {
			this._state = DISABLED;
			this._last_data = 0;
			this._last_clk = 0;
			this._output = 0
			return ;
		}

		var clk_d = clk - this._last_clk,
			data_d = data - this._last_data;

		this._last_clk = clk;
		this._last_data = data;

		// There has been no bus change (idle)
		if (!clk_d && !data_d) { return ; }

		// Give friendly warning about the host behaving poorly
		if (clk_d && data_d) {
			//console.error("WARNING: Data and clock lines are transitioning at the same time");
		}
	
		// Data transition while CLK is high
		if (clk && data_d) {
			console.log(data_d > 0 ? "STOP" : "START");
			if (data_d > 0) { 
				// Stop
				this._state = DISABLED;
				this._output = 0;
			} else {
				// Start
				this._state = COMMAND;
				this._output = 0;

				this._bits_tx = 0;
				this._read = 0;
				this._write = 0;
			}
		}

		// We are not processing any data right now
		if (this._state === DISABLED) { return ; }

		// Handle data latching
		if (clk_d > 0) {
			// Rising edge clock (input)
			this._read = ((this._read << 1) & 0xFF) | (data ? 1 : 0);
			this._bits_tx++;
		} else if (clk_d < 0) {
			// Falling edge (delivery)

			if (this._bits_tx < 8) {
				// Simply update output buffer
				this._output = (this._write & 0x80) ? 1 : 0;
				this._write = this._write << 1;
			} else {
				console.log("STATE:", this._state, this._read.toString(16));
				// We have received a full command / output a value
				switch (this._state) {
				case COMMAND:
					console.log("EEPROM CMD:", this._read.toString(16));
					
					switch(this._read & 0xF1) {
					case 0xA0: // Write
						this._state = ADDRESS;
						this._addressbyte = 0;
						this._address = 0;
						break ;
					case 0xA1: // Read
						this._state = READ;
						break ;
					}
					break ;
				case ADDRESS:
					// Update address
					this._address = ((this._address << 8) | this._read) % this.data.length;
					if (++this._addressbyte >= this.address_width) {
						console.log(this._address.toString(16))
						this._state = WRITE;
					}
					break ;
				case READ:
					this._write = this.data[this._address];
					this._address = (this._address + 1) % this.data.length;
					break ;
				case WRITE:
					this.data[this._address] = this._read;
					this._address = (this._address + 1) % this.data.length;
					break ;
				}

				this._output = 0; // ACK (always)
				this._bits_tx = 0;
			}
		}
	}

	Object.defineProperty(eeprom, "output", {
		get: function () { return this._output; }
	})

	return {
		eeprom: eeprom
	};
})();
