var r6502 = require("tamago/cpu/6502.js");

module.exports = (function(){
	function system() {
		this._readbank = new Array(0x100)
		this._writebank = new Array(0x100)

		this._cpureg = new Uint8Array(0x100);	// Control registers
		this._dram   = new Uint8Array(0x200);	// Display memory
		this._wram	 = new Uint8Array(0x600);	// System memory

		// Configure and reset
		this.init();
		this.reset();
	}

	system.prototype = Object.create(r6502);
	system.prototype.CLOCK_RATE = 32768;

	system.prototype.step_frame = function () {
		var t = + new Date(),
			d = this.previous_clock - t,
			a = this.cycles_error + (this.CLOCK_RATE * d),
			o = Math.floor(a);

		this.previous_clock = t;
		this.cycles += o;
		this.cycles_error = a - o;
		
		for (var i = 0; i < this._dram.length; i++) {this._dram[i] = Math.random() * 0x100; }

		while(this.cycles > 0) { this.step(); }
	}

	system.prototype.init = function () {
		var i, data;

		// Work ram
		for (i = 0x0000; i < 0x1000; i+=0x0100) {
			data = new Uint8Array(this._wram, i % this._wram.length, 0x100);
			this.ram(i>>8, data);
		}

		// Display memory
		for (i = 0x1000; i < 0x3000; i+=0x0100) {
			data = new Uint8Array(this._dram, i % this._dram.length, 0x100);
			this.ram(i>>8, data);
		}

		// CPU registers
		for (i = 0x3000; i < 0x4000; i+=0x0100) {
			this._readbank[i>>8] = this.reg_read.bind(this);
			this._writebank[i>>8] = this.reg_write.bind(this);
		}

		// Static rom
		for (var i = 0; i < 0x40; i ++) {
			this.rom(i + 0xC0, new Uint8Array(this.bios, i << 8, 0x100));
		}

		// Bankable rom
		this.set_rom_page(0);	// Clear current rom page
	}

	system.prototype.set_rom_page = function (bank) {
		var offset = 0x8000 * (bank % 20);

		for (var i = 0; i < 0x80; i ++) {
			this.rom(i + 0x40, new Uint8Array(this.bios, offset + i<< 8, 0x100));
		}
	}

	system.prototype.reg_read = function (reg) {
		// TODO
		return this._cpureg[reg];
	};

	system.prototype.reg_write = function (reg, data) {
		switch (reg) {
		case 0x00: // P_CPU_Bank_Ctrl
			this.set_rom_page(data);
			break ;
			// TODO: Additional registers
		}
		this._cpureg[reg] = data;
	};

	system.prototype.read = function(addr) {
		var bank = addr >> 8,
			byte = addr & 0xFF;

		return this._readbank[bank](byte);
	};

	system.prototype.write = function (addr, data) {
		var bank = addr >> 8,
			byte = addr & 0xFF;

		return this._writebank[bank](byte, data);
	};

	system.prototype.ram = function (bank, data) {
		function read(reg) {
			return data[reg];
		}

		function write(reg, data) {
			data[reg] = data;
		}

		this._readbank[bank] = read;
		this._writebank[bank] = write;
	};

	system.prototype.rom = function (bank, data) {
		function nullwrite() {}
		function read(addr) {
			return data[addr];
		}

		this._readbank[bank] = read;
		this._writebank[bank] = nullwrite;
	};

	return {
		system: system
	};
})();
