module.exports = (function() {
	var config = require ("tamago/config.js"),
		tamagotchi = require("tamago/cpu/tamagotchi.js"),
		disassemble = require("tamago/cpu/disassembler.js"),
		ports = require("tamago/data/ports.js"),

		object = require("util/object.js"),
		ejs = require("util/ejs.js"),
		
		mainTemplate, portTemplate;

	ready(function () {
		// compile our templates
		mainTemplate = ejs.parse(requireText("tamago/templates/main.html"));
		portTemplate = ejs.parse(requireText("tamago/templates/port.html"));
	})

	function toHex(w, i) { 
		i = i.toString(16).toUpperCase();

		var zeros = "0";
		while (zeros.length < w) { zeros += zeros; }

		return zeros.substr(0, w).substr(i.length) + i;
	}

	function start(bios) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "files/tamago.bin", true);

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

		this._pixeldata = this.body.display.getImageData(0,0,64,31);
		this._pixels = new Uint32Array(this._pixeldata.data.buffer);
		this._disasmOffset = 0;

		this.refresh();
	}

	Tamago.prototype.step = function (e) {
		this.system.step();
		this.refresh();
	}

	Tamago.prototype.irq = function (e) {
		this.system.fire_irq(parseInt(this.body.selects.irq.value,10));
		this.refresh();
	}

	Tamago.prototype.nmi = function (e) {
		this.system.fire_nmi(6);
		this.refresh();
	}

	Tamago.prototype.run = function (e) {
		var that = this;

		function frame() {
			if (!that.running) { return ; }

			that.system.step_realtime();
			that.refresh();
			requestAnimationFrame(frame);
		}

		this.running = !this.running;	
		frame();

		if (e) { e.target.attributes.value.value = this.running ? "stop" : "run"; }
	}

	Tamago.prototype.reset = function (e) {
		this.system.reset();
		this.refresh();		
	}

	Tamago.prototype.refresh_simple = function () {
		var a = 4, b = 0, g = 0;

		while (g < 10) {
			var glyph = (this.system._dram[a] >> b) & 3;
			if ((b -= 2) < 0) { b = 6; a++; }

			this.body.glyphs[g++].style.color = "#" + (this.system.PALETTE[glyph] & 0xFFFFFF).toString(16);
		}

		var px = 0;
		for (var y = 0; y < 31; y++) {
			var a = this.system.LCD_ORDER[y]; 

			for (var x = 0; x < 64; x += 4) {
				var d = this.system._dram[a++], b = 6;

				while (b >= 0) {
					this._pixels[px++] = this.system.PALETTE[(d >> b) & 3];
					b -= 2;
				}
			}
		}
	
		this.body.display.putImageData(this._pixeldata, 0, 0);
	}

	Tamago.prototype.update_control = function (e) {
		if (e) {
			this._debug_port = parseInt(e.target.dataset.address);
		}
	
		var port = ports[this._debug_port];
		if (!port) {
			port = {
				name: "Unknown",
				description: "",
			}
		}
		if (!port.fields) {
			port.fields = [{ name:"data", start: 0, length: 8 }];
		}

		port = Object.create(port);
		port.address = this._debug_port.toString(16);

		if (port.address.length < 2) port.address = "0" + port.address;

		this.body.port.innerHTML = portTemplate(port);
		this.body.fields = this.body.port.querySelectorAll("field");
		
		this.refresh_port();
	}

	Tamago.prototype.refresh_port = function () {
		var d = this.system.read(this._debug_port, true);

		function pad(s, l) {
			return "00000000".substr(0, l).substr(s.length) + s;
		}

		[].forEach.call(this.body.fields, function (f) {
			var l = Number(f.dataset.length),
				s = Number(f.dataset.start),
				m = (d >> s) & ((1 << l) - 1),
				b = f.querySelector("bin"),
				h = f.querySelector("hex");

			b.innerHTML = pad(m.toString(2), l);
			h.innerHTML = pad(m.toString(16), Math.ceil(l / 4));
		})
	}

	Tamago.prototype.refresh_debugger = function () {
		var that = this;

		// Update basic views
		object.each(this.body.registers, function (elem, register) {
			elem.innerHTML = toHex(2, that.system[register]);
		});

		object.each(this.body.flags, function (elem, flag) {
			elem.classList.toggle("active", Boolean(that.system[flag]));
		});

		this.body.memory.forEach(function (m, i) {
			m.innerHTML = toHex(2, that.system._wram[i]);
		});

		this.body.control.forEach(function (m, i) {
			var acc = that.system._cpuacc[i+0x3000];
			that.system._cpuacc[i+0x3000] = 0;
			m.classList.toggle('read', acc & tamagotchi.ACCESS_READ);
			m.classList.toggle('write', acc & tamagotchi.ACCESS_WRITE);
			m.innerHTML = toHex(2, that.system._cpureg[i]);
		});


		var disasm = disassemble.disassemble(config.instructionCount, this._disasmOffset, this.system),
			bias = Math.floor(config.instructionCount / 2),
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

			row.location.innerHTML = toHex(4, g.location)
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

		this.refresh_port();
		this.refresh_simple();
	}

	Tamago.prototype.configure = function(element) {
		var data = Object.create(config),
			that = this;

		data.toHex = toHex;
		data.ramBytes = this.system._wram.length;
		data.registerBytes = this.system._cpureg.length;

		data.debug = Boolean(element.attributes.debugger);

		element.innerHTML = mainTemplate(data);

		// Bind to HTML
		if (data.debug) {
			[].forEach.call(document.querySelectorAll("input[type=button]"), function (el) {
				el.addEventListener("click", that[el.attributes.action.value].bind(that))
			});

			this.body = {
				glyphs: element.querySelectorAll("i.glyph"),
				port: element.querySelector("port"),
				selects: [].reduce.call(element.querySelectorAll("select"), function (acc, f) { 
					acc[f.attributes.action.value.toLowerCase()] = f;
					return acc; 
				}, {}),
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
					b.addEventListener("click", that.update_control.bind(that));

					return b;
				}),
				memory: [].map.call(element.querySelectorAll("memory byte"), function (b) {
					return b;
				}),
				display: element.querySelector("display canvas").getContext("2d")
			};

			document.querySelector("select[action=figure]").addEventListener("change", function(e) {
				that.system.inserted_figure = Number(e.target.value);
			});

			this._debug_port = 0x3000;
			this.update_control();

			this.refresh = this.refresh_debugger;
		} else {
			this.body = { 
				glyphs: element.querySelectorAll("i.glyph"),
				display: element.querySelector("display canvas").getContext("2d")
			};

			this.refresh = this.refresh_simple;
			// Start running soon
			setTimeout(function() { that.run(); }, 10);
		}
	};

	return {
		start: start
	};
})();