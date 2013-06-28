var config = require ("tamago/config.js"),
	system = require("tamago/cpu/system.js"),
	disassemble = require("tamago/disassembler.js"),
	ejs = require("util/ejs.js"),
	tmpl = requireText("tamago/templates/main.html");

ready(function () {
	tmpl = ejs.parse(tmpl);
})

module.exports = (function() {
	var instructions;

	function Tamago(element, bios) {
		element.innerHTML = tmpl(config);

		this.element = element;
		this.bios = new Uint8Array(bios);

		this.bind();

		var u8 = new Uint8Array(bios);

		this.cpu = {
			pc: 0xCC00,
			a: 0,
			x: 0,
			y: 0,
			s: 0,
			c: 0,
			z: 0,
			i: 0,
			d: 0,
			c: 0,
			v: 0,
			n: 0,
			read: function (addr) {
				// THIS IS TEMPORARY
				if (addr < 0x4000) { return addr&0xFF; }
				if (addr >= 0xC000) { return u8[addr&0x3FFF]; }
				return u8[addr - 0x4000];
			}
		};

		this.refresh();
	}

	Tamago.prototype.refresh = function () {
		var that = this;

		var disasm = disassemble.disassemble(config.instructionCount, this.cpu.pc, this.cpu);

		this.body.memory.forEach(function (m, i) {
			m.innerHTML = config.toHex(2, that.cpu.read(i));
		})

		this.body.control.forEach(function (m, i) {
			m.innerHTML = config.toHex(2, that.cpu.read(i+0x3000));
		})

		disasm.forEach(function (g, i) {
			var row = that.body.instructions[i];

			row.location.innerHTML = config.toHex(4, g.location)
			row.opcode.innerHTML = g.instruction;
			row.addressing.innerHTML = ((g.data === null) ? "" : g.data).toString(16).toUpperCase();
			row.data.innerHTML = g.bytes;

			function attr(node, attr, value) {
				if(value !== undefined) { node.setAttribute(attr, value) }
				else node.removeAttribute(attr);
			}

			row.instruction.classList.toggle("active", g.active === true);
			attr(row.addressing, 'mode', g.mode);
			attr(row.addressing, 'address', g.address);
			attr(row.instruction, 'port', g.port);
		});
	}

	Tamago.prototype.bind = function() {
		// Bind to HTML
		this.body = {
			instructions: [].map.call(this.element.querySelectorAll("instruction"), function (i) {
				return {
					instruction: i,
					location: i.querySelector("location"),
					opcode: i.querySelector("opcode"),
					data: i.querySelector("data"),
					addressing: i.querySelector("addressing"),
				};
			}),
			control: [].map.call(this.element.querySelectorAll("control byte"), function (b) {
				return b;
			}),
			memory: [].map.call(this.element.querySelectorAll("memory byte"), function (b) {
				return b;
			})
		};
	};

	function start(bios) {
		new Tamago(document.querySelector("tamago"), bios);
	}

	return {
		start: start
	};
})();