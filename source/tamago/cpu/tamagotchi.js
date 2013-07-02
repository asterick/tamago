module.exports = (function(){
	var r6502 = require("tamago/cpu/6502.js"),
		eeprom = require("tamago/cpu/eeprom.js"),
		registers = require("tamago/cpu/registers.js"),
		object = require("util/object.js");

	var ACCESS_READ		= 0x01,
		ACCESS_WRITE	= 0x02;

	function system() {
		var that = this;

		this._readbank = new Array(0x10000);
		this._writebank = new Array(0x10000);

		this._cpuacc = new Uint8Array(0x10000);	// Access flags

		this._cpureg = new Uint8Array(0x100);	// Control registers
		this._dram   = new Uint8Array(0x200);	// Display memory
		this._wram	 = new Uint8Array(0x600);	// System memory
		this._eeprom = new eeprom.eeprom(12);	// new 32kb eeprom
		this._keys	 = 0xF;

		// Configure and reset
		this.init();
		this.reset();

		this.cycles_error = 0;
		this.previous_clock = 0;

		document.addEventListener("keyup", function (e) {
			that._keys |= that.mapping[e.keyCode] || 0;
		});
		document.addEventListener("keydown", function (e) {
			that._keys &= ~that.mapping[e.keyCode] || 0xFF;
		});
	}

	ready(function() {
		system.prototype = Object.create(r6502.r6502);	
		object.extend(system.prototype, registers);

		system.prototype.mapping = { 65: 1, 83: 2, 68: 4, 82: 8 };
		system.prototype.CLOCK_RATE = 4000000;
		system.prototype.MAX_ADVANCE = 1;
		system.prototype.LCD_ORDER = [
			0x0C0, 0x0CC, 0x0D8, 0x0E4, 
			0x0F0, 0x0FC, 0x108, 0x114, 
			0x120, 0x12C, 0x138, 0x144, 
			0x150, 0x15C, 0x168, 0x174, 
			0x0B4, 0x0A8, 0x09C, 0x090, 
			0x084, 0x078, 0x06C, 0x060, 
			0x054, 0x048, 0x03C, 0x030, 
			0x024, 0x018, 0x00C];

		system.prototype.step_realtime = function () {
			var t = +new Date() / 1000,
				d = Math.min(this.MAX_ADVANCE, t - this.previous_clock) || 0,
				a = this.cycles_error + (this.CLOCK_RATE * d),
				o = Math.floor(a);

			this.previous_clock = t;
			this.cycles += o;
			this.cycles_error = a - o;
			
			while(this.cycles > 0) { this.step(); }
		}

		system.prototype.map_irq = function (i) {
			var b = new Uint16Array(this.bios, 0x3FC0, 0x20);
			b[31] = b[i];
		}

		system.prototype.init = function () {
			var i, data;

			// Work ram
			for (i = 0x0000; i < 0x1000; i+=0x0100) {
				data = new Uint8Array(this._wram.buffer, i % this._wram.length, 0x100);
				this.ram(i>>8, data);
			}

			// Display memory
			for (i = 0x1000; i < 0x3000; i+=0x0100) {
				data = new Uint8Array(this._dram.buffer, i % this._dram.length, 0x100);
				this.ram(i>>8, data);
			}

			// CPU registers
			this.map_registers();

			// Static rom
			for (var i = 0; i < 0x40; i ++) {
				this.rom(i + 0xC0, new Uint8Array(this.bios, i << 8, 0x100));
			}

			// Bankable rom
			this.set_rom_page(0);	// Clear current rom page
		}

		system.prototype.read = function(addr) {
			// A addressing
			if (addr === null) {
				return this.a;
			}

			this._cpuacc[addr] |= ACCESS_READ;

			return this._readbank[addr].call(this, addr & 0xFF);
		};

		system.prototype.write = function (addr, data) {
			if (addr === null) {
				this.a = data; 
				return ;
			}

			this._cpuacc[addr] |= ACCESS_WRITE;

			return this._writebank[addr].call(this, addr & 0xFF, data);
		};

		// Start helper functions for mapping to memory
		system.prototype.set_rom_page = function (bank) {
			var offset = 0x8000 * (bank % 20);

			for (var i = 0; i < 0x80; i ++) {
				this.rom(i + 0x40, new Uint8Array(this.bios, offset + (i << 8), 0x100));
			}
		}
		system.prototype.ram = function (bank, data) {
			function read(reg) {
				return data[reg];
			}

			function write(reg, value) {
				data[reg] = value;
			}

			bank <<= 8;
			for (var i = 0; i < 0x100; i++) {
				this._readbank[bank+i] = read;
				this._writebank[bank+i] = write;
			}
		};

		system.prototype.rom = function (bank, data) {
			function nullwrite() {}
			function read(addr) {
				return data[addr];
			}

			bank <<= 8;
			for (var i = 0; i < 0x100; i++) {
				this._readbank[bank+i] = read;
				this._writebank[bank+i] = nullwrite;
			}
		};
	});

	return {
		ACCESS_WRITE: ACCESS_WRITE,
		ACCESS_READ: ACCESS_READ,
		system: system
	};
})();
