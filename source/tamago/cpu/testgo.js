module.exports = (function(){
	var r6502 = require("tamago/cpu/6502.js");

	var ACCESS_READ		= 0x01,
		ACCESS_WRITE	= 0x02;

	function system() {
		this._readbank = new Array(0x10000);
		this._writebank = new Array(0x10000);

		this._cpuacc = new Uint8Array(0x10000);	// Access flags

		this._memory = new Uint8Array(this.bios)
		this._cpureg = new Uint8Array(this.bios, 0x3000, 0x100);
		this._dram   = new Uint8Array(this.bios, 0x1000, 0x200);
		this._wram	 = new Uint8Array(this.bios, 0, 0x600);

		// Configure and reset
		this.init();
		this.reset();

		this.cycles_error = 0;
		this.previous_clock = 0;
	}

	ready(function() {
		system.prototype = Object.create(r6502.r6502);	

		system.prototype.CLOCK_RATE = 10000;
		system.prototype.MAX_ADVANCE = 1;

		system.prototype.LCD_ORDER = [
			0x068, 0x0C0, 0x0CC, 0x0D8,
			0x0E4, 0x0F0, 0x1FC, 0x108,
			0x114, 0x120, 0x12C, 0x138,
			0x144, 0x150, 0x15C, 0x168,
			0x074, 0x0B4, 0x0A8, 0x09C,
			0x090, 0x084, 0x078, 0x06C,
			0x060, 0x054, 0x048, 0x03C,
			0x030, 0x024, 0x018];

		system.prototype.reset = function () {
			r6502.r6502.reset.call(this);
			this.pc = 0x1000;
		}

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
			for (i = 0x0000; i < 0x10000; i+=0x0100) {
				this.ram(i>>8, new Uint8Array(this.bios, i, 0x100));
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

		system.prototype.read = function(addr) {
			// A addressing
			if (addr === null) {
				return this.a;
			}

			this._cpuacc[addr] |= ACCESS_READ;

			return this._readbank[addr](addr & 0xFF);
		};

		system.prototype.write = function (addr, data) {
			if (addr === null) {
				this.a = data; 
				return ;
			}

			this._cpuacc[addr] |= ACCESS_WRITE;

			return this._writebank[addr](addr & 0xFF, data);
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
	});

	return {
		ACCESS_WRITE: ACCESS_WRITE,
		ACCESS_READ: ACCESS_READ,
		system: system
	};
})();
