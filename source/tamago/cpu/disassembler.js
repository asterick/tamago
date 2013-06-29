module.exports = (function(){
	var instructions = require("tamago/data/instructions.js"),
		ports = require("tamago/data/ports.js"),
		config = require("tamago/config.js");
	
	function disassemble(count, address, cpu) {
		var i = [];

		function z16(addr) {
			var l = cpu.read(addr & 0xFF),
				h = cpu.read((addr+1) & 0xFF);

			return l | (h << 8);
		}

		function g16(addr) {
			var l = cpu.read(addr & 0xFFFF),
				h = cpu.read((addr+1) & 0xFFFF);

			return l | (h << 8);
		}

		function r8() {
			return cpu.read(address++);
		}

		function r16() {
			var l = r8(),
				h = r8();
			
			return l | (h << 8);
		}

		while (count-- > 0) {
			var pos = address,
				op = instructions[r8()],
				output;
			
			// Undefined operation
			if (!op) { break ; }

			switch (op.addressing) {
			case "implied":
				output = { 
					instruction: op.instruction,
					data: null,
					address: null
				};
				break ;
			case "accumulator":
				output = {
					instruction: op.instruction,
					address: null,
					data: "A"
				};
				break ;
			case "immediate":
				output = {
					instruction: op.instruction,
					address: address,
					data: r8()
				};
				break ;
			case "indirect":
				d = r16();
				output = {
					instruction: op.instruction,
					address: g16(d),
					data: d
				};
				break ;
			case "indirectX":
				d = r8();
				output = {
					instruction: op.instruction,
					address: z16(d + cpu.x),
					data: d
				};
				break ;
			case "indirectY":
				d = r8();
				output = {
					instruction: op.instruction,
					address: (z16(d) + cpu.y) & 0xFFFF,
					data: d
				};
				break ;
			case "zeropage":
				d = r8();
				output = {
					instruction: op.instruction,
					address: d,
					data: d
				};
				break ;
			case "zeropageX":
				d = r8();
				output = {
					instruction: op.instruction,
					address: (d + cpu.x) & 0xFF,
					data: d
				};
				break ;
			case "zeropageY":
				d = r8();
				output = {
					instruction: op.instruction,
					address: (d + cpu.y) & 0xFF,
					data: d
				};
				break ;
			case "absolute":
				d = r16();
				output = {
					instruction: op.instruction,
					address: d,
					data: d
				};
				break ;
			case "absoluteX":
				d = r16();
				output = {
					instruction: op.instruction,
					address: (d + cpu.x) & 0xFFFF,
					data: d
				};
				break ;
			case "absoluteY":
				d = r16();
				output = {
					instruction: op.instruction,
					address: (d + cpu.y) & 0xFFFF,
					data: d
				};
				break ;
			case "relative":
				d = r8();
				output = {
					instruction: op.instruction,
					address: (d + cpu.pc) & 0xFFFF,
					data: (d & 0x80) ? (d - 0x100) : d
				};
				break ;
			default:
				throw new Error("Unhandled addressing mode: " + op.addressing);
			}

			if (pos === cpu.pc) { output.active = true ; }
			output.port = ports[output.address];
			output.mode = op.addressing;
			output.location = pos;

			output.bytes = []
			while (pos < address) {
				output.bytes.push(config.toHex(2, cpu.read(pos++)));
			}
			output.bytes = output.bytes.join(" ");

			i.push(output);
		}

		return i;
	}

	return {
		disassemble: disassemble
	};
})();