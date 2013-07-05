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

		this._cpuacc = new Uint8Array(0x10000);		// Access flags

		this._cpureg = new Uint8Array(0x100);		// Control registers
		this._dram   = new Uint8Array(0x200);		// Display memory
		this._wram	 = new Uint8Array(0x600);		// System memory
		this._eeprom = new eeprom.eeprom(12);		// new 32kb eeprom
		this._irqs = new Uint16Array(0x10000);

		this.keys	 = 0xF;

		// Convert a 16bit mask into a priority encoded IRQ table
		var irqs = new Uint16Array(this.bios, 0x3FC0, 16);
		for (var i = 0; i < this._irqs.length; i++) {
			this._irqs[i] = irqs[15 - Math.floor(i ? (Math.log(i) / Math.log(2)) : 0)];
		}

		// Configure and reset
		this.init();
		this.reset();

		this.previous_clock = 0;
		this.inserted_figure = 0;
		
		this._tbh_timer = 0; 	// HACK
	}

	ready(function() {
		system.prototype = Object.create(r6502.r6502);	
		object.extend(system.prototype, registers);

		system.prototype.PALETTE = [0xffdddddd, 0xff9e9e9e, 0xff606060, 0xff222222];

		system.prototype.CLOCK_RATE = 4000000; // 4MHz
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
				d = Math.min(this.MAX_ADVANCE, t - this.previous_clock) || 0;

			this.previous_clock = t;
			this.cycles += this.CLOCK_RATE * d;

			var ticks = Math.floor(this.cycles);

			this._tbh_timer += ticks;

			// Animation rate counter (HACk)
			var TBH_RATE = this.CLOCK_RATE / 2;
			while (this._tbh_timer >= TBH_RATE) {
				this.fire_irq(13);
				this._tbh_timer -= TBH_RATE;
			}

			// Fire every frame (rate unknown, HACK)
			this.fire_irq(10);
			this.fire_nmi(6);

			while(this.cycles > 0) { this.step(); }
		}

		system.prototype.fire_nmi = function (i) {
			// NMI was not enabled
			if (~this._cpureg[0x76] & (0x80 >> i)) { return ; }

			this.nmi();
		}

		system.prototype.pending_irq = function () {
			return (this._cpureg[0x73] << 8) | this._cpureg[0x74];
		}

		system.prototype.fire_irq = function (i) {
			// Map the pending interrupt
			var mask = (this._cpureg[0x70] << 8) | this._cpureg[0x71];

			// This IRQ is disabled
			if ((0x8000 >> i) & ~mask) { return ; }

			// Set pending IRQ to fire
			this._cpureg[0x73 + (i >> 3)] |= 0x80 >> (i & 7);
		}

		system.prototype.init = function () {
			var i, data;

			r6502.r6502.init.call(this);

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

			this._readbank[0xFFFE] = function () { return this._irqs[this.pending_irq()] & 0xFF; }
			this._readbank[0xFFFF] = function () { return this._irqs[this.pending_irq()] >> 8; }

			// Bankable rom
			this.set_rom_page(0);	// Clear current rom page
		}

		system.prototype.read = function(addr, noack) {
			// A addressing
			if (addr === null) {
				return this.a;
			}

			if(!noack) this._cpuacc[addr] |= ACCESS_READ;

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
