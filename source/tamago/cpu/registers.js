module.exports = (function () {
	var ports = require("tamago/data/ports.js"),
		object = require("util/object.js");

	// ==== Bank Switch ====
	function write_bank(reg, value) {
		this._cpureg[reg] = value;
		this.set_rom_page(value);
	}

	// ==== IRQ Logic ===
	function write_int_flag(reg, value) {
		this._cpureg[reg] &= ~value;
	}

	// ==== PortA ====
	function write_porta_dir_data(reg, value) {
		this._cpureg[reg] = value;
		// no writes yet.
	}

	function read_porta_data(reg, value) {
		var mask = this._cpureg[0x11],
			input = 
				this._keys |
				0xF0;

		return (mask & this._cpureg[0x12]) | (~mask & input);
	}

	// ==== PortB ====
	function write_portb_dir_data(reg, value) {
		var mask = this._cpureg[0x15],
			d = mask & this._cpureg[0x16];
		this._eeprom.update(d&4, d&2, d&1);
		this._cpureg[reg] = value;
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
		console.log(
			pad(this._cpureg[0].toString(16), 2),
			this.pc.toString(16),
			"Unhandled register read  (" + (0x3000+reg).toString(16) + ")", 
			"             ", 
			(ports[reg|0x3000] || {}).name || "---");

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
			(ports[reg|0x3000] || {}).name || "---");
		this._cpureg[reg] = data;
	}

	var register_layout = {
		0x00: { write: write_bank },
		0x01: {}, // SILENCE CLK CTRL
		0x04: {}, // SILENCE

		// --- DATA Ports
		0x10: {}, // SILENCE CONFIG
		0x11: { write: write_porta_dir_data },
		0x12: { write: write_porta_dir_data, read: read_porta_data },
		0x14: {}, // SILENCE CONFIG
		0x15: { write: write_portb_dir_data },
		0x16: { write: write_portb_dir_data, read: read_portb_data },

		// --- IRQ Block
		0x70: {}, // IRQ Enables are normal 
		0x71: {}, // IRQ Enables are normal 
		0x73: { write: write_int_flag },
		0x74: { write: write_int_flag },
		0x76: {}, // NMI Enables are normal
	}, undef_register = {
		read: undef_read, 
		write: undef_write 
	};

	return {
		map_registers: function () {
			// Start mapping out registers
			for (var i = 0; i < 0x100; i++) {
				// This is normally considered dangerous, but I need the closure
				~function () {
					var layout = register_layout[i] || undef_register,
						read   = layout.read || function (reg) { return this._cpureg[reg]; },
						write  = layout.write || function (reg, data) { this._cpureg[reg] = data; };

					// Map registers to their mirrors as well
					for (var a = 0x3000; a < 0x4000; a += 0x100) {
						this._readbank[a+i] = read;
						this._writebank[a+i] = write;
					}
				}.call(this);
			}
		}
	};
})();