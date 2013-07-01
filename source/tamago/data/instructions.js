/** 
  *  Instruction defintion table
  */

module.exports = (function() {
    return {
        0: {
            "addressing": "implied",
            "instruction": "BRK",
            "cycles": "7"
        },
        1: {
            "addressing": "indirectX",
            "instruction": "ORA",
            "cycles": "6"
        },
        5: {
            "addressing": "zeropage",
            "instruction": "ORA",
            "cycles": "3"
        },
        6: {
            "addressing": "zeropage",
            "instruction": "ASL",
            "cycles": "5"
        },
        8: {
            "addressing": "implied",
            "instruction": "PHP",
            "cycles": "3"
        },
        9: {
            "addressing": "immediate",
            "instruction": "ORA",
            "cycles": "2"
        },
        10: {
            "addressing": "accumulator",
            "instruction": "ASL",
            "cycles": "2"
        },
        13: {
            "addressing": "absolute",
            "instruction": "ORA",
            "cycles": "4"
        },
        14: {
            "addressing": "absolute",
            "instruction": "ASL",
            "cycles": "6"
        },
        16: {
            "addressing": "relative",
            "instruction": "BPL",
            "cycles": "2"
        },
        17: {
            "addressing": "indirectY",
            "instruction": "ORA",
            "cycles": "5"
        },
        21: {
            "addressing": "zeropageX",
            "instruction": "ORA",
            "cycles": "4"
        },
        22: {
            "addressing": "zeropageX",
            "instruction": "ASL",
            "cycles": "6"
        },
        24: {
            "addressing": "implied",
            "instruction": "CLC",
            "cycles": "2"
        },
        25: {
            "addressing": "absoluteY",
            "instruction": "ORA",
            "cycles": "4"
        },
        29: {
            "addressing": "absoluteX",
            "instruction": "ORA",
            "cycles": "4"
        },
        30: {
            "addressing": "absoluteX",
            "instruction": "ASL",
            "cycles": "7"
        },
        32: {
            "addressing": "absolute",
            "instruction": "JSR",
            "cycles": "6"
        },
        33: {
            "addressing": "indirectX",
            "instruction": "AND",
            "cycles": "6"
        },
        36: {
            "addressing": "zeropage",
            "instruction": "BIT",
            "cycles": "3"
        },
        37: {
            "addressing": "zeropage",
            "instruction": "AND",
            "cycles": "3"
        },
        38: {
            "addressing": "zeropage",
            "instruction": "ROL",
            "cycles": "5"
        },
        40: {
            "addressing": "implied",
            "instruction": "PLP",
            "cycles": "4"
        },
        41: {
            "addressing": "immediate",
            "instruction": "AND",
            "cycles": "2"
        },
        42: {
            "addressing": "accumulator",
            "instruction": "ROL",
            "cycles": "2"
        },
        44: {
            "addressing": "absolute",
            "instruction": "BIT",
            "cycles": "4"
        },
        45: {
            "addressing": "absolute",
            "instruction": "AND",
            "cycles": "4"
        },
        46: {
            "addressing": "absolute",
            "instruction": "ROL",
            "cycles": "6"
        },
        48: {
            "addressing": "relative",
            "instruction": "BMI",
            "cycles": "2"
        },
        49: {
            "addressing": "indirectY",
            "instruction": "AND",
            "cycles": "5"
        },
        53: {
            "addressing": "zeropageX",
            "instruction": "AND",
            "cycles": "4"
        },
        54: {
            "addressing": "zeropageX",
            "instruction": "ROL",
            "cycles": "6"
        },
        56: {
            "addressing": "implied",
            "instruction": "SEC",
            "cycles": "2"
        },
        57: {
            "addressing": "absoluteY",
            "instruction": "AND",
            "cycles": "4"
        },
        61: {
            "addressing": "absoluteX",
            "instruction": "AND",
            "cycles": "4"
        },
        62: {
            "addressing": "absoluteX",
            "instruction": "ROL",
            "cycles": "7"
        },
        64: {
            "addressing": "implied",
            "instruction": "RTI",
            "cycles": "6"
        },
        65: {
            "addressing": "indirectX",
            "instruction": "EOR",
            "cycles": "6"
        },
        69: {
            "addressing": "zeropage",
            "instruction": "EOR",
            "cycles": "3"
        },
        70: {
            "addressing": "zeropage",
            "instruction": "LSR",
            "cycles": "5"
        },
        72: {
            "addressing": "implied",
            "instruction": "PHA",
            "cycles": "3"
        },
        73: {
            "addressing": "immediate",
            "instruction": "EOR",
            "cycles": "2"
        },
        74: {
            "addressing": "accumulator",
            "instruction": "LSR",
            "cycles": "2"
        },
        76: {
            "addressing": "absolute",
            "instruction": "JMP",
            "cycles": "3"
        },
        77: {
            "addressing": "absolute",
            "instruction": "EOR",
            "cycles": "4"
        },
        78: {
            "addressing": "absolute",
            "instruction": "LSR",
            "cycles": "6"
        },
        80: {
            "addressing": "relative",
            "instruction": "BVC",
            "cycles": "2"
        },
        81: {
            "addressing": "indirectY",
            "instruction": "EOR",
            "cycles": "5"
        },
        85: {
            "addressing": "zeropageX",
            "instruction": "EOR",
            "cycles": "4"
        },
        86: {
            "addressing": "zeropageX",
            "instruction": "LSR",
            "cycles": "6"
        },
        88: {
            "addressing": "implied",
            "instruction": "CLI",
            "cycles": "2"
        },
        89: {
            "addressing": "absoluteY",
            "instruction": "EOR",
            "cycles": "4"
        },
        93: {
            "addressing": "absoluteX",
            "instruction": "EOR",
            "cycles": "4"
        },
        94: {
            "addressing": "absoluteX",
            "instruction": "LSR",
            "cycles": "7"
        },
        96: {
            "addressing": "implied",
            "instruction": "RTS",
            "cycles": "6"
        },
        97: {
            "addressing": "indirectX",
            "instruction": "ADC",
            "cycles": "6"
        },
        101: {
            "addressing": "zeropage",
            "instruction": "ADC",
            "cycles": "3"
        },
        102: {
            "addressing": "zeropage",
            "instruction": "ROR",
            "cycles": "5"
        },
        104: {
            "addressing": "implied",
            "instruction": "PLA",
            "cycles": "4"
        },
        105: {
            "addressing": "immediate",
            "instruction": "ADC",
            "cycles": "2"
        },
        106: {
            "addressing": "accumulator",
            "instruction": "ROR",
            "cycles": "2"
        },
        108: {
            "addressing": "indirect",
            "instruction": "JMP",
            "cycles": "5"
        },
        109: {
            "addressing": "absolute",
            "instruction": "ADC",
            "cycles": "4"
        },
        110: {
            "addressing": "absolute",
            "instruction": "ROR",
            "cycles": "6"
        },
        112: {
            "addressing": "relative",
            "instruction": "BVS",
            "cycles": "2"
        },
        113: {
            "addressing": "indirectY",
            "instruction": "ADC",
            "cycles": "5"
        },
        117: {
            "addressing": "zeropageX",
            "instruction": "ADC",
            "cycles": "4"
        },
        118: {
            "addressing": "zeropageX",
            "instruction": "ROR",
            "cycles": "6"
        },
        120: {
            "addressing": "implied",
            "instruction": "SEI",
            "cycles": "2"
        },
        121: {
            "addressing": "absoluteY",
            "instruction": "ADC",
            "cycles": "4"
        },
        125: {
            "addressing": "absoluteX",
            "instruction": "ADC",
            "cycles": "4"
        },
        126: {
            "addressing": "absoluteX",
            "instruction": "ROR",
            "cycles": "7"
        },
        129: {
            "addressing": "indirectX",
            "instruction": "STA",
            "cycles": "6"
        },
        132: {
            "addressing": "zeropage",
            "instruction": "STY",
            "cycles": "3"
        },
        133: {
            "addressing": "zeropage",
            "instruction": "STA",
            "cycles": "3"
        },
        134: {
            "addressing": "zeropage",
            "instruction": "STX",
            "cycles": "3"
        },
        136: {
            "addressing": "implied",
            "instruction": "DEY",
            "cycles": "2"
        },
        138: {
            "addressing": "implied",
            "instruction": "TXA",
            "cycles": "2"
        },
        140: {
            "addressing": "absolute",
            "instruction": "STY",
            "cycles": "4"
        },
        141: {
            "addressing": "absolute",
            "instruction": "STA",
            "cycles": "4"
        },
        142: {
            "addressing": "absolute",
            "instruction": "STX",
            "cycles": "4"
        },
        144: {
            "addressing": "relative",
            "instruction": "BCC",
            "cycles": "2"
        },
        145: {
            "addressing": "indirectY",
            "instruction": "STA",
            "cycles": "6"
        },
        148: {
            "addressing": "zeropageX",
            "instruction": "STY",
            "cycles": "4"
        },
        149: {
            "addressing": "zeropageX",
            "instruction": "STA",
            "cycles": "4"
        },
        150: {
            "addressing": "zeropageY",
            "instruction": "STX",
            "cycles": "4"
        },
        152: {
            "addressing": "implied",
            "instruction": "TYA",
            "cycles": "2"
        },
        153: {
            "addressing": "absoluteY",
            "instruction": "STA",
            "cycles": "5"
        },
        154: {
            "addressing": "implied",
            "instruction": "TXS",
            "cycles": "2"
        },
        157: {
            "addressing": "absoluteX",
            "instruction": "STA",
            "cycles": "5"
        },
        160: {
            "addressing": "immediate",
            "instruction": "LDY",
            "cycles": "2"
        },
        161: {
            "addressing": "indirectX",
            "instruction": "LDA",
            "cycles": "6"
        },
        162: {
            "addressing": "immediate",
            "instruction": "LDX",
            "cycles": "2"
        },
        164: {
            "addressing": "zeropage",
            "instruction": "LDY",
            "cycles": "3"
        },
        165: {
            "addressing": "zeropage",
            "instruction": "LDA",
            "cycles": "3"
        },
        166: {
            "addressing": "zeropage",
            "instruction": "LDX",
            "cycles": "3"
        },
        168: {
            "addressing": "implied",
            "instruction": "TAY",
            "cycles": "2"
        },
        169: {
            "addressing": "immediate",
            "instruction": "LDA",
            "cycles": "2"
        },
        170: {
            "addressing": "implied",
            "instruction": "TAX",
            "cycles": "2"
        },
        172: {
            "addressing": "absolute",
            "instruction": "LDY",
            "cycles": "4"
        },
        173: {
            "addressing": "absolute",
            "instruction": "LDA",
            "cycles": "4"
        },
        174: {
            "addressing": "absolute",
            "instruction": "LDX",
            "cycles": "4"
        },
        176: {
            "addressing": "relative",
            "instruction": "BCS",
            "cycles": "2"
        },
        177: {
            "addressing": "indirectY",
            "instruction": "LDA",
            "cycles": "5"
        },
        180: {
            "addressing": "zeropageX",
            "instruction": "LDY",
            "cycles": "4"
        },
        181: {
            "addressing": "zeropageX",
            "instruction": "LDA",
            "cycles": "4"
        },
        182: {
            "addressing": "zeropageY",
            "instruction": "LDX",
            "cycles": "4"
        },
        184: {
            "addressing": "implied",
            "instruction": "CLV",
            "cycles": "2"
        },
        185: {
            "addressing": "absoluteY",
            "instruction": "LDA",
            "cycles": "4"
        },
        186: {
            "addressing": "implied",
            "instruction": "TSX",
            "cycles": "2"
        },
        188: {
            "addressing": "absoluteX",
            "instruction": "LDY",
            "cycles": "4"
        },
        189: {
            "addressing": "absoluteX",
            "instruction": "LDA",
            "cycles": "4"
        },
        190: {
            "addressing": "absoluteY",
            "instruction": "LDX",
            "cycles": "4"
        },
        192: {
            "addressing": "immediate",
            "instruction": "CPY",
            "cycles": "2"
        },
        193: {
            "addressing": "indirectX",
            "instruction": "CMP",
            "cycles": "6"
        },
        196: {
            "addressing": "zeropage",
            "instruction": "CPY",
            "cycles": "3"
        },
        197: {
            "addressing": "zeropage",
            "instruction": "CMP",
            "cycles": "3"
        },
        198: {
            "addressing": "zeropage",
            "instruction": "DEC",
            "cycles": "5"
        },
        200: {
            "addressing": "implied",
            "instruction": "INY",
            "cycles": "2"
        },
        201: {
            "addressing": "immediate",
            "instruction": "CMP",
            "cycles": "2"
        },
        202: {
            "addressing": "implied",
            "instruction": "DEX",
            "cycles": "2"
        },
        204: {
            "addressing": "absolute",
            "instruction": "CPY",
            "cycles": "4"
        },
        205: {
            "addressing": "absolute",
            "instruction": "CMP",
            "cycles": "4"
        },
        206: {
            "addressing": "absolute",
            "instruction": "DEC",
            "cycles": "3"
        },
        208: {
            "addressing": "relative",
            "instruction": "BNE",
            "cycles": "2"
        },
        209: {
            "addressing": "indirectY",
            "instruction": "CMP",
            "cycles": "5"
        },
        213: {
            "addressing": "zeropageX",
            "instruction": "CMP",
            "cycles": "4"
        },
        214: {
            "addressing": "zeropageX",
            "instruction": "DEC",
            "cycles": "6"
        },
        216: {
            "addressing": "implied",
            "instruction": "CLD",
            "cycles": "2"
        },
        217: {
            "addressing": "absoluteY",
            "instruction": "CMP",
            "cycles": "4"
        },
        221: {
            "addressing": "absoluteX",
            "instruction": "CMP",
            "cycles": "4"
        },
        222: {
            "addressing": "absoluteX",
            "instruction": "DEC",
            "cycles": "7"
        },
        224: {
            "addressing": "immediate",
            "instruction": "CPX",
            "cycles": "2"
        },
        225: {
            "addressing": "indirectX",
            "instruction": "SBC",
            "cycles": "6"
        },
        228: {
            "addressing": "zeropage",
            "instruction": "CPX",
            "cycles": "3"
        },
        229: {
            "addressing": "zeropage",
            "instruction": "SBC",
            "cycles": "3"
        },
        230: {
            "addressing": "zeropage",
            "instruction": "INC",
            "cycles": "5"
        },
        232: {
            "addressing": "implied",
            "instruction": "INX",
            "cycles": "2"
        },
        233: {
            "addressing": "immediate",
            "instruction": "SBC",
            "cycles": "2"
        },
        234: {
            "addressing": "implied",
            "instruction": "NOP",
            "cycles": "2"
        },
        236: {
            "addressing": "absolute",
            "instruction": "CPX",
            "cycles": "4"
        },
        237: {
            "addressing": "absolute",
            "instruction": "SBC",
            "cycles": "4"
        },
        238: {
            "addressing": "absolute",
            "instruction": "INC",
            "cycles": "6"
        },
        240: {
            "addressing": "relative",
            "instruction": "BEQ",
            "cycles": "2"
        },
        241: {
            "addressing": "indirectY",
            "instruction": "SBC",
            "cycles": "5"
        },
        245: {
            "addressing": "zeropageX",
            "instruction": "SBC",
            "cycles": "4"
        },
        246: {
            "addressing": "zeropageX",
            "instruction": "INC",
            "cycles": "6"
        },
        248: {
            "addressing": "implied",
            "instruction": "SED",
            "cycles": "2"
        },
        249: {
            "addressing": "absoluteY",
            "instruction": "SBC",
            "cycles": "4"
        },
        253: {
            "addressing": "absoluteX",
            "instruction": "SBC",
            "cycles": "4"
        },
        254: {
            "addressing": "absoluteX",
            "instruction": "INC",
            "cycles": "7"
        }
    };
})();

