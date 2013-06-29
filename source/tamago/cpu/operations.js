/**
 ** These operate on the effective address
 **/

module.exports = (function(){
	function set_nz(cpu, d) {
		cpu.n = d & 0x80;
		cpu.z = !d;
	}

	return {
		// Other
		NOP: function (cpu, addr) {},

		// Flags
		CLC: function (cpu, addr) { cpu.c = 0; },
		CLI: function (cpu, addr) { cpu.i = 0; },
		CLV: function (cpu, addr) { cpu.v = 0; },
		CLD: function (cpu, addr) { cpu.d = 0; },
		SEC: function (cpu, addr) { cpu.c = 1; },
		SED: function (cpu, addr) { cpu.d = 1; },
		SEI: function (cpu, addr) { cpu.i = 1; },

		// Transfer
		TXA: function (cpu, addr) { set_nz(cpu, cpu.a = cpu.x); },
		TYA: function (cpu, addr) { set_nz(cpu, cpu.a = cpu.y); },
		TXS: function (cpu, addr) { set_nz(cpu, cpu.s = cpu.x); },
		TAY: function (cpu, addr) { set_nz(cpu, cpu.y = cpu.a); },
		TAX: function (cpu, addr) { set_nz(cpu, cpu.x = cpu.a); },
		TSX: function (cpu, addr) { set_nz(cpu, cpu.x = cpu.s); },
		LDA: function (cpu, addr) { set_nz(cpu, cpu.a = cpu.read(addr)); },
		LDX: function (cpu, addr) { set_nz(cpu, cpu.x = cpu.read(addr)); },
		LDY: function (cpu, addr) { set_nz(cpu, cpu.y = cpu.read(addr)); },
		STA: function (cpu, addr) { cpu.write(addr, cpu.a); },
		STX: function (cpu, addr) { cpu.write(addr, cpu.x); },
		STY: function (cpu, addr) { cpu.write(addr, cpu.y); },

		// Bit Operations
		BIT: function (cpu, addr) {
			var data = cpu.a & cpu.read(addr);
			set_nz(cpu, data);
			cpu.v = data & 0x40;
		},
		ORA: function (cpu, addr) { set_nz(cpu, cpu.a |= cpu.read(addr)); },
		EOR: function (cpu, addr) { set_nz(cpu, cpu.a ^= cpu.read(addr)); },
		AND: function (cpu, addr) { set_nz(cpu, cpu.a &= cpu.read(addr)); },

		// Shifter
		ASL: function (cpu, addr) {
			var data = cpu.read(addr) << 1;

			cpu.c = data & ~0xFF;
			
			data &= 0xFF;
			set_nz(cpu, data);
			cpu.write(addr, data);
		},
		LSR: function (cpu, addr) {
			var data = cpu.read(addr);
			cpu.c = data & 1;
			data >>= 1;
			set_nz(cpu, data);
			cpu.write(addr, data);
		},
		ROL: function (cpu, addr) {
			var data = (cpu.read(addr) << 1) | (cpu.c ? 1 : 0);

			cpu.c = data & ~0xFF;
			
			data &= 0xFF;
			set_nz(cpu, data);
			cpu.write(addr, data);
		},
		ROR: function (cpu, addr) {
			var data = cpu.read(addr),
				out = (data >> 1) | (cpu.c ? 0x80 : 0);

			cpu.c = data & 1;
			set_nz(cpu, out);
			cpu.write(addr, out);
		},

		// Arithmatic
		DEC: function (cpu, addr) {
			var data = (cpu.read(addr) - 1) & 0xFF;
			set_nz(cpu, data);
			cpu.write(addr, data)
		},
		DEX: function (cpu, addr) {
			set_nz(cpu, cpu.x = (cpu.x - 1) & 0xFF);
		},
		DEY: function (cpu, addr) {
			set_nz(cpu, cpu.y = (cpu.y - 1) & 0xFF);
		},
		INC: function (cpu, addr) {
			var data = (cpu.read(addr) + 1) & 0xFF;
			set_nz(cpu, data);
			cpu.write(addr, data)
		},
		INX: function (cpu, addr) {
			set_nz(cpu, cpu.x = (cpu.x + 1) & 0xFF);
		},
		INY: function (cpu, addr) {
			set_nz(cpu, cpu.y = (cpu.y + 1) & 0xFF);
		},
		ADC: function (cpu, addr) { /* TODO */ },
		SBC: function (cpu, addr) { /* TODO */ },
		CMP: function (cpu, addr) { /* TODO */ },
		CPX: function (cpu, addr) { /* TODO */ },
		CPY: function (cpu, addr) { /* TODO */ },

		// Stack Operations
		PHP: function (cpu, addr) { cpu.push(cpu.p); },
		PHA: function (cpu, addr) { cpu.push(cpu.a); },
		PLA: function (cpu, addr) { set_nz(cpu, cpu.a = cpu.pull()); },
		PLP: function (cpu, addr) { cpu.p = cpu.pull(); },

		// Interrupts / Branch
		JMP: function (cpu, addr) { cpu.pc = addr; },
		JSR: function (cpu, addr) {
			cpu.push(cpu.pc >> 8);
			cpu.push(cpu.pc & 0xFF);
			cpu.pc = addr;
		},
		RTI: function (cpu, addr) {
			cpu.p = cpu.pull();
			cpu.pc = cpu.pull();
			cpu.pc |= cpu.pull() << 8;
		},
		RTS: function (cpu, addr) {
			cpu.pc = cpu.pull();
			cpu.pc |= cpu.pull() << 8;
		},
		BRK: function (cpu, addr) {
			cpu.push(cpu.pc >> 8);
			cpu.push(cpu.pc & 0xFF);
			cpu.push(cpu.p | 0x10); // Push program status 'B' set
			
			// TODO: Determine actual IRQ vector here
			cpu.pc = cpu.read(0xFFFC);
		},

		BNE: function (cpu, addr) { if(!cpu.z) cpu.pc = addr; },
		BEQ: function (cpu, addr) { if(cpu.z) cpu.pc = addr; },
		BPL: function (cpu, addr) { if(!cpu.n) cpu.pc = addr; },
		BMI: function (cpu, addr) { if(cpu.n) cpu.pc = addr; },
		BCC: function (cpu, addr) { if(!cpu.c) cpu.pc = addr; },
		BCS: function (cpu, addr) { if(cpu.c) cpu.pc = addr; },
		BVC: function (cpu, addr) { if(!cpu.v) cpu.pc = addr; },
	};
})();