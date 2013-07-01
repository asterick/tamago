/**
 ** This calculates effective address for various modes
 ** NOTE: I always return addr for future auto-inlining
 **/

module.exports = {
	implied: function (cpu) {
		var addr = null;
		return addr;
	}, 

	accumulator: function (cpu) {
		var addr = null;
		return addr;
	}, 

	immediate: function (cpu) {
		var addr = cpu.pc++;
		cpu.pc &= 0xFFFF;
		return addr;
	}, 

	relative: function (cpu) {
		// Sign extend 8-bit value, and add it to the now incremented PC.
		var addr = ((cpu.next() << 24 >> 24) + cpu.pc) & 0xFFFF;

		return addr;
	}, 

	zeropage: function (cpu) {
		var addr = cpu.next();
		return addr;
	},

	zeropageX: function (cpu) {
		var addr = (cpu.next() + cpu.x) & 0xFF;
		return addr;
	}, 

	zeropageY: function (cpu) {
		var addr = (cpu.next() + cpu.y) & 0xFF;
		return addr;
	},

	absolute: function (cpu) {
		var addr = cpu.next_16();
		return addr;
	},

	absoluteX: function (cpu) {
		var addr = (cpu.next_16() + cpu.x) & 0xFFFF;
		return addr;
	}, 

	absoluteY: function (cpu) {
		var addr = (cpu.next_16() + cpu.y) & 0xFFFF;
		return addr;
	},

	indirect: function (cpu) {
		var addr = cpu.next_16(),
			addr_l = cpu.read(addr),
			addr_h;

		addr = ((addr + 1) & 0x00FF) | (addr & 0xFF00);
		addr_h = cpu.read(addr);
		addr = addr_l | (addr_h << 8);

		return addr;
	}, 

	indirectX: function (cpu) {
		var addr = (cpu.next() + cpu.x) & 0xFF,
			addr_l = cpu.read(addr),
			addr_h = cpu.read(++addr & 0xFF);
		
		addr = addr_l | (addr_h << 8);
		return addr;
	},

	indirectY: function (cpu) {
		var addr = cpu.next(),
			addr_l = cpu.read(addr),
			addr_h = cpu.read(++addr & 0xFF);

		addr = ((addr_l | (addr_h << 8)) + cpu.y) & 0xFFFF;
		return addr;
	}
};
