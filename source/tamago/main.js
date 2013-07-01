module.exports = (function() {
	var config = require ("tamago/config.js"),
		tamagotchi = require("tamago/cpu/tamagotchi.js"),
		testgo =  require("tamago/cpu/testgo.js"),
		disassemble = require("tamago/cpu/disassembler.js"),
		
		object = require("util/object.js"),
		ejs = require("util/ejs.js"),
		template = requireText("tamago/templates/main.html");

	ready(function () {
		template = ejs.parse(template);
	})

	function start(bios) {
		var xhr = new XMLHttpRequest();
		/* TAMAGOTCHI
		xhr.open("GET", "files/tamago.bin", true);
		//*/

		///* TEST-I-GOTCHI
		tamagotchi = testgo;
		xhr.open("GET", "/files/6502_functional_test.bin", true);
		//*/

		xhr.responseType = "arraybuffer";
		xhr.send();

		xhr.onreadystatechange = function () {
			if (xhr.readyState !== 4) {
				return ;
			}

			if (xhr.status !== 200) {
				throw new Error("Could not download firmware");
			}

			// Bind to tamago system class
			tamagotchi.system.prototype.bios = xhr.response;

			// Start the application when BIOS is done
			[].forEach.call(document.querySelectorAll("tamago"), function (elem) {
				new Tamago(elem);
			});
		};
	}

	function Tamago(element) {
		var u8 = new Uint8Array(this.bios);

		this.system = new tamagotchi.system();

		this.configure(element);

		this._pixeldata = this.body.display.getImageData(0,0,64,32),
		this._pixels = new Uint32Array(this._pixeldata.data.buffer)
		this._disasmOffset = 0;

		this.refresh();
	}

	Tamago.prototype.palette = [0xFFFFFFFF,0xFFAAAAAA,0xFF555555,0xFF000000];

	Tamago.prototype.step = function (e) {
		if (this.body.trace.checked) this.system.trace();
		this.system.step();
		this.refresh();
	}

	Tamago.prototype.irq = function (e) {
		this.system.map_irq(parseInt(this.body.selects.irq.value,10));
		this.system.irq();
		this.refresh();
	}

	Tamago.prototype.nmi = function (e) {
		this.system.nmi();
		this.refresh();
	}

	Tamago.prototype.run = function (e) {
		var that = this;

		function frame() {
			that.system.step_realtime(that.body.trace.checked);
			that.refresh();

			if (that.running) {
				requestAnimationFrame(frame);
			}
		}

		this.running = !this.running;	
		frame();

		e.target.attributes.value.value = this.running ? "stop" : "run";
	}

	Tamago.prototype.reset = function (e) {
		this.system.reset();
		this.refresh();		
	}

	Tamago.prototype.refresh_simple = function () {
		var a = 0, px = 0;

		for (var y = 0; y < 31; y++) {
			var a = this.system.LCD_ORDER[y]; 

			for (var x = 0; x < 64; x += 4) {
				var d = this.system._dram[a++], b = 6;

				while (b >= 0) {
					this._pixels[px++] = this.palette[(d >> b) & 3];
					b -= 2;
				}
			}
		}
	
		this.body.display.putImageData(this._pixeldata, 0, 0);
	}

	Tamago.prototype.refresh_debugger = function () {
		var that = this;

		// Update basic views
		object.each(this.body.registers, function (elem, register) {
			elem.innerHTML = config.toHex(2, that.system[register]);
		});

		object.each(this.body.flags, function (elem, flag) {
			elem.classList.toggle("active", Boolean(that.system[flag]));
		});

		this.body.memory.forEach(function (m, i) {
			m.innerHTML = config.toHex(2, that.system._wram[i]);
		});

		this.body.control.forEach(function (m, i) {
			var acc = that.system._cpuacc[i+0x3000];
			that.system._cpuacc[i+0x3000] = 0;
			m.classList.toggle('read', acc & tamagotchi.ACCESS_READ);
			m.classList.toggle('write', acc & tamagotchi.ACCESS_WRITE);
			m.innerHTML = config.toHex(2, that.system._cpureg[i]);
		});


		var disasm = disassemble.disassemble(config.instructionCount, this._disasmOffset, this.system),
			bias = config.instructionCount / 2,
			current = disasm.reduce(function(acc, d, i){ return d.active ? i : acc; }, null);

		// PC isn't were it should be
		if (current === null) {
			this._disasmOffset = this.system.pc;
			disasm = disassemble.disassemble(config.instructionCount, this._disasmOffset, this.system);
		} else if (current >= bias && disasm.length == config.instructionCount) {
			this._disasmOffset = disasm[current-bias].location;
			disasm = disassemble.disassemble(config.instructionCount, this._disasmOffset, this.system);
		}

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
			attr(row.addressing, 'address', (g.address || 0).toString(16).toUpperCase());
			attr(row.instruction, 'port', g.port);
		});

		for (var i = disasm.length; i < config.instructionCount; i++) {
			var row = that.body.instructions[i];

			row.location.innerHTML = "";
			row.opcode.innerHTML = "";
			row.addressing.innerHTML = "";
			row.data.innerHTML = "";
			row.addressing.removeAttribute('mode');
		}

		this.refresh_simple();
	}

	Tamago.prototype.configure = function(element) {
		var data = Object.create(config);

		data.ramBytes = this.system._wram.length;
		data.registerBytes = this.system._cpureg.length;

		data.debug = Boolean(element.attributes.debugger);

		element.innerHTML = template(data);

		// Bind to HTML
		if (data.debug) {
			var that = this;

			[].forEach.call(document.querySelectorAll("input[type=button]"), function (el) {
				el.addEventListener("click", that[el.attributes.action.value].bind(that))
			});

			this.body = {
				selects: [].reduce.call(element.querySelectorAll("select"), function (acc, f) { 
					acc[f.attributes.action.value.toLowerCase()] = f;
					return acc; 
				}, {}),
				trace: element.querySelector("input[type=checkbox]"),
				flags: [].reduce.call(element.querySelectorAll("flag"), function (acc, f) { 
					acc[f.attributes.name.value.toLowerCase()] = f;
					return acc; 
				}, {}),
				registers: [].reduce.call(element.querySelectorAll("register"), function (acc, r) { 
					acc[r.attributes.name.value.toLowerCase()] = r;
					return acc; 
				}, {}),
				instructions: [].map.call(element.querySelectorAll("instruction"), function (i) {
					return {
						instruction: i,
						location: i.querySelector("location"),
						opcode: i.querySelector("opcode"),
						data: i.querySelector("data"),
						addressing: i.querySelector("addressing"),
					};
				}),
				control: [].map.call(element.querySelectorAll("control byte"), function (b) {
					return b;
				}),
				memory: [].map.call(element.querySelectorAll("memory byte"), function (b) {
					return b;
				}),
				display: element.querySelector("display canvas").getContext("2d")
			};
			this.refresh = this.refresh_debugger;
		} else {
			this.body = { display: element.querySelector("display canvas").getContext("2d") };

			this.refresh = this.refresh_simple;
			this.run();
		}
	};

	return {
		start: start
	};
})();