/**
 ** These operate on the effective address
 **/
module.exports = (function () {
    function set_nz(cpu, d) {
        cpu.n = d & 0x80;
        cpu.z = !d;
    }

    return {
        // Other(verified)
        NOP: function (cpu, addr) {},

        // Flags(verified)
        CLC: function (cpu, addr) {
            cpu.c = 0;
        },
        CLI: function (cpu, addr) {
            cpu.i = 0;
        },
        CLV: function (cpu, addr) {
            cpu.v = 0;
        },
        CLD: function (cpu, addr) {
            cpu.d = 0;
        },
        SEC: function (cpu, addr) {
            cpu.c = 1;
        },
        SED: function (cpu, addr) {
            cpu.d = 1;
        },
        SEI: function (cpu, addr) {
            cpu.i = 1;
        },

        // Transfer (verified)
        TXA: function (cpu, addr) {
            set_nz(cpu, cpu.a = cpu.x);
        },
        TYA: function (cpu, addr) {
            set_nz(cpu, cpu.a = cpu.y);
        },
        TXS: function (cpu, addr) {
            cpu.s = cpu.x;
        },
        TAX: function (cpu, addr) {
            set_nz(cpu, cpu.x = cpu.a);
        },
        TAY: function (cpu, addr) {
            set_nz(cpu, cpu.y = cpu.a);
        },
        TSX: function (cpu, addr) {
            set_nz(cpu, cpu.x = cpu.s);
        },
        LDA: function (cpu, addr) {
            set_nz(cpu, cpu.a = cpu.read(addr));
        },
        LDX: function (cpu, addr) {
            set_nz(cpu, cpu.x = cpu.read(addr));
        },
        LDY: function (cpu, addr) {
            set_nz(cpu, cpu.y = cpu.read(addr));
        },
        STA: function (cpu, addr) {
            cpu.write(addr, cpu.a);
        },
        STX: function (cpu, addr) {
            cpu.write(addr, cpu.x);
        },
        STY: function (cpu, addr) {
            cpu.write(addr, cpu.y);
        },

        // Bit Operations
        BIT: function (cpu, addr) {
            var data = cpu.read(addr);
            cpu.n = data & 0x80;
            cpu.v = data & 0x40;
            cpu.z = !(cpu.a & data);
        },
        ORA: function (cpu, addr) {
            set_nz(cpu, cpu.a |= cpu.read(addr));
        },
        EOR: function (cpu, addr) {
            set_nz(cpu, cpu.a ^= cpu.read(addr));
        },
        AND: function (cpu, addr) {
            set_nz(cpu, cpu.a &= cpu.read(addr));
        },

        // Shifter
        ASL: function (cpu, addr) {
            var data = cpu.read(addr),
                out = (data << 1) & 0xFF;

            cpu.c = data & 0x80;

            set_nz(cpu, out);
            cpu.write(addr, out);
        },
        LSR: function (cpu, addr) {
            var data = cpu.read(addr),
                out = data >> 1;

            cpu.c = data & 0x01;

            set_nz(cpu, out);
            cpu.write(addr, out);
        },

        ROL: function (cpu, addr) {
            var data = cpu.read(addr),
                out = ((data << 1) & 0xFF) | (cpu.c ? 1 : 0);

            cpu.c = data & 0x80;

            set_nz(cpu, out);
            cpu.write(addr, out);
        },

        ROR: function (cpu, addr) {
            var data = cpu.read(addr),
                out = (data >> 1) | (cpu.c ? 0x80 : 0);

            cpu.c = data & 0x01;

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
        ADC: function (cpu, addr) {
            var data = cpu.read(addr),
                o = cpu.a + data + (cpu.c ? 1 : 0);

            if (cpu.d) {
                var al = (cpu.a & 0x0F) + (data & 0x0F) + (cpu.c ? 1 : 0),
                    ah = (cpu.a & 0xF0) + (data & 0xF0);

                // These are not affected by decimal mode
                cpu.v = ~ (cpu.a ^ data) & (o ^ data) & 0x80;
                cpu.n = o & 0x80;

                // Decimal mode fixup
                if (al > 0x09) {
                    al += 0x06;
                }
                if (ah > 0x90) {
                    ah += 0x60;
                }

                // Result is the sum of the nibbles, combine and set flags
                o = al + ah;
                cpu.c = o & ~0xFF;
                cpu.z = !(cpu.a = o & 0xFF);
            } else {
                cpu.v = ~ (cpu.a ^ data) & (o ^ data) & 0x80;
                cpu.c = o & ~0xFF;
                set_nz(cpu, cpu.a = o & 0xFF);
            }
        },
        SBC: function (cpu, addr) {
            var data = cpu.read(addr),
                o = cpu.a - data - (cpu.c ? 0 : 1);

            // All flags are like binary mode
            cpu.v = (cpu.a ^ data) & (o ^ data) & 0x80;
            cpu.c = o & ~0xFF;
            set_nz(cpu, o & 0xFF);

            if (cpu.d) {
                // Calculate fix up decimal mode
                var al = (cpu.a & 0x0F) - (data & 0x0F) - (cpu.c ? 1 : 0),
                    ah = (cpu.a & 0xF0) - (data & 0xF0);

                if (al < 0x00) {
                    al -= 0x06;
                }
                if (ah < 0x00) {
                    ah -= 0x60;
                }

                cpu.a = (al + ah) & 0xFF;
            } else {
                cpu.a = o & 0xFF;
            }
        },
        CMP: function (cpu, addr) {
            var data = cpu.a - cpu.read(addr);

            cpu.c = data & ~0xFF;
            set_nz(cpu, data & 0xFF);
        },
        CPX: function (cpu, addr) {
            var data = cpu.x - cpu.read(addr);

            cpu.c = data & ~0xFF;
            set_nz(cpu, data & 0xFF);
        },
        CPY: function (cpu, addr) {
            var data = cpu.y - cpu.read(addr);

            cpu.c = data & ~0xFF;
            set_nz(cpu, data & 0xFF);
        },

        // Stack Operations
        PHP: function (cpu, addr) {
            cpu.push(cpu.p);
        },
        PHA: function (cpu, addr) {
            cpu.push(cpu.a);
        },
        PLA: function (cpu, addr) {
            set_nz(cpu, cpu.a = cpu.pull());
        },
        PLP: function (cpu, addr) {
            cpu.p = cpu.pull();
        },

        // Interrupts / Branch
        JMP: function (cpu, addr) {
            cpu.pc = addr;
        },
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
            // This should probably actually find out which IRQ to service
            this.irq(true);
        },

        BNE: function (cpu, addr) {
            if (!cpu.z) cpu.pc = addr;
        },
        BEQ: function (cpu, addr) {
            if (cpu.z) cpu.pc = addr;
        },
        BPL: function (cpu, addr) {
            if (!cpu.n) cpu.pc = addr;
        },
        BMI: function (cpu, addr) {
            if (cpu.n) cpu.pc = addr;
        },
        BCC: function (cpu, addr) {
            if (!cpu.c) cpu.pc = addr;
        },
        BCS: function (cpu, addr) {
            if (cpu.c) cpu.pc = addr;
        },
        BVC: function (cpu, addr) {
            if (!cpu.v) cpu.pc = addr;
        },
        BVS: function (cpu, addr) {
            if (cpu.v) cpu.pc = addr;
        }
    };
})();
