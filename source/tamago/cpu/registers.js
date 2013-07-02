module.exports = (function () {
	var ports = require("tamago/data/ports.js"),
		object = require("util/object.js");

	// --- Actual registers ---
	// Mapped register actions
	function write_bank(reg, value) {
		this.set_rom_page(value);
	}

	
	// PortA
	function write_porta_dir_data(reg, value) {
		// TODO
	}

	function read_porta_data(reg, value) {
		var mask = this._cpureg[0x11],
			input = 
				this._keys;
		
		return (mask & this._cpureg[0x12]) | (~mask & input);
	}

	// PortB
	function write_portb_dir_data(reg, value) {
		var mask = this._cpureg[0x15],
			d = mask & this._cpureg[0x16];
		this._eeprom.update(d&4, d&2, d&1);
	}

	function read_portb_data(reg, value) {
		var mask = this._cpureg[0x15],
			input = 
				(this._eeprom._output ? 1 : 0);
		
		return (mask & this._cpureg[0x16]) | (~mask & input);
	}

	// --- REGISTER LAYOUT ---
	function pad(s, l) {
		return "00000000".substr(0, l).substr(s.length) + s;
	}

	// Default register actions
	function undef_read(reg) {
		/*
		console.log(
			pad(this._cpureg[0].toString(16), 2),
			this.pc.toString(16),
			"Unhandled register read  (" + (0x3000+reg).toString(16) + ")", 
			"             ", 
			ports[reg|0x3000] || "---");
		*/
		return this._cpureg[reg];
	}

	function undef_write(reg, data) {
		console.log(
			pad(this._cpureg[0].toString(16), 2),					
			this.pc.toString(16),
			"Unhandled register write (" + (0x3000+reg).toString(16) + ")", 
			pad(data.toString(16),2), 
			"-", 
			pad(data.toString(2), 8), 
			ports[reg|0x3000] || "---");
	}

	var register_layout = {
		 "0x00": { write: write_bank },
		"0x11": { write: write_porta_dir_data },
		"0x12": { write: write_porta_dir_data, read: read_porta_data },
		"0x15": { write: write_portb_dir_data },
		"0x16": { write: write_portb_dir_data, read: read_portb_data }
	}, undef_register = {
		read: undef_read, 
		write: undef_write 
	};

	return {
		map_registers: function () {
			object.each(register_layout, function (v, k, o) {
				o[Number(k)] = v;
				delete o[k];
			});

			// Start mapping out registers
			for (var i = 0; i < 0x100; i++) {
				// This is normally considered dangerous, but I need the closure
				~function () {
					var layout = register_layout[i] || undef_register,
						read   = layout.read || function (reg) { return this._cpureg[reg]; },
						write  = layout.write,
						acc_write = function (reg, data) {
							this._cpureg[reg] = data;
							if (write) { write.call(this, reg, data); }
						};

					// Map registers to their mirrors as well
					for (var a = 0x3000; a < 0x4000; a += 0x100) {
						this._readbank[a+i] = read;
						this._writebank[a+i] = acc_write;
					}
				}.call(this);
			}
		}
	};
})();