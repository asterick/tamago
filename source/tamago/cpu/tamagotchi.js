module.exports = (function(){
	var r6502 = require("tamago/cpu/6502.js"),
		disassembler = require("tamago/cpu/disassembler.js"),
		ports = require("tamago/data/ports.js");

	function system() {
		this._readbank = new Array(0x100)
		this._writebank = new Array(0x100)

		this._cpureg = new Uint8Array(0x100);	// Control registers
		this._dram   = new Uint8Array(0x200);	// Display memory
		this._wram	 = new Uint8Array(0x600);	// System memory

		function random(a) { for (var i = a.length-1; i >= 0; i--) a[i] = Math.random()*0x100; }
		random(this._dram);
		random(this._wram);

		// Configure and reset
		this.init();
		this.reset();

		this.cycles_error = 0;
		this.previous_clock = 0;

		this.p = 0xFF;
	}

	system.prototype = Object.create(r6502);

	system.prototype.CLOCK_RATE = 1000000;
	system.prototype.MAX_ADVANCE = 1;

	system.prototype.step_realtime = function (trace) {
		var t = +new Date() / 1000,
			d = Math.min(this.MAX_ADVANCE, t - this.previous_clock) || 0,
			a = this.cycles_error + (this.CLOCK_RATE * d),
			o = Math.floor(a);

		this.previous_clock = t;
		this.cycles += o;
		this.cycles_error = a - o;
		
		if (trace) {
			while(this.cycles > 0) { 
				this.trace();
				this.step();
			}
		} else {
			while(this.cycles > 0) { this.step(); }
		}
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
			this.rom(i + 0x40, new Uint8Array(this.bios, offset + (i << 8), 0x100));
		}
	}

	function pad(s, l) {
		return "00000000".substr(0, l).substr(s.length) + s;
	}

	system.prototype.reg_read = function (reg) {
		switch (reg) {
		case 0x00:
			break ;
		default:
			console.log(
				"Unhandled register read  (" + (0x3000+reg).toString(16) + ")", 
				"             ", 
				ports[reg|0x3000] || "---");
		}

		return this._cpureg[reg];
	};


	system.prototype.reg_write = function (reg, data) {
		switch (reg) {
		case 0x00: // P_CPU_Bank_Ctrl
			this.set_rom_page(data);
			break ;
		default:
			console.log(
				"Unhandled register write (" + (0x3000+reg).toString(16) + ")", 
				pad(data.toString(16),2), 
				"-", 
				pad(data.toString(2), 8), 
				ports[reg|0x3000] || "---");
		}
		this._cpureg[reg] = data;
	};

	system.prototype.read = function(addr) {
		// A addressing
		if (addr === null) {
			return this.a;
		}

		var bank = addr >> 8,
			byte = addr & 0xFF;

		return this._readbank[bank](byte);
	};

	system.prototype.write = function (addr, data) {
		if (addr === null) {
			this.a = data; 
			return ;
		}

		var bank = addr >> 8,
			byte = addr & 0xFF;

		return this._writebank[bank](byte, data);
	};

	system.prototype.ram = function (bank, data) {
		function read(reg) {
			return data[reg];
		}

		function write(reg, value) {
			data[reg] = value;
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

	system.prototype.trace = function () {
		var op = disassembler.disassemble(1, this.pc, this)[0];

		var addr = "$" + (op.data || 0).toString(16);

		switch (op.mode) {
			case "implied":
				addr = "";
				break ;
			case "accumulator": 
				addr = "A";
				break ;
			case "relative": 
				addr = "$" + op.location.toString(16);
				break ;
			case "immediate": 
			case "absolute": 
			case "zeropage": 
				break ;
			case "zeropageX": 
			case "absoluteX": 
				addr += ", X";
				break ;
			case "zeropageY": 
			case "absoluteY": 
				addr += ", Y";
				break ;
			case "indirect": 
				addr = "(" + addr + ")";
				break ;
			case "indirectX": 
				addr = "(" + addr + ", X)";
				break ;
			case "indirectY": 
				addr = "(" + addr + "), Y";
				break ;
		}

		// TODO: BITS AND JUNK
		console.log(op.instruction, addr);
	}

	return {
		system: system
	};
})();
