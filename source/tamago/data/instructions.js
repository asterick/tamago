/** 
  *  Instruction defintion table
  */

module.exports = {
    0: {
        instruction: "BRK",
        addressing: "implied"
    },
    1: {
        instruction: "ORA",
        addressing: "indirectX"
    },
    5: {
        instruction: "ORA",
        addressing: "zeropage"
    },
    6: {
        instruction: "ASL",
        addressing: "zeropage"
    },
    8: {
        instruction: "PHP",
        addressing: "implied"
    },
    9: {
        instruction: "ORA",
        addressing: "immediate"
    },
    10: {
        instruction: "ASL",
        addressing: "accumulator"
    },
    13: {
        instruction: "ORA",
        addressing: "absolute"
    },
    14: {
        instruction: "ASL",
        addressing: "absolute"
    },
    16: {
        instruction: "BPL",
        addressing: "relative"
    },
    17: {
        instruction: "ORA",
        addressing: "indirectY"
    },
    21: {
        instruction: "ORA",
        addressing: "zeropageX"
    },
    22: {
        instruction: "ASL",
        addressing: "zeropageX"
    },
    24: {
        instruction: "CLC",
        addressing: "implied"
    },
    25: {
        instruction: "ORA",
        addressing: "absoluteY"
    },
    29: {
        instruction: "ORA",
        addressing: "absoluteX"
    },
    30: {
        instruction: "ASL",
        addressing: "absoluteX"
    },
    32: {
        instruction: "JSR",
        addressing: "absolute"
    },
    33: {
        instruction: "AND",
        addressing: "indirectX"
    },
    36: {
        instruction: "BIT",
        addressing: "zeropage"
    },
    37: {
        instruction: "AND",
        addressing: "zeropage"
    },
    38: {
        instruction: "ROL",
        addressing: "zeropage"
    },
    40: {
        instruction: "PLP",
        addressing: "implied"
    },
    41: {
        instruction: "AND",
        addressing: "immediate"
    },
    42: {
        instruction: "ROL",
        addressing: "accumulator"
    },
    44: {
        instruction: "BIT",
        addressing: "absolute"
    },
    45: {
        instruction: "AND",
        addressing: "absolute"
    },
    46: {
        instruction: "ROL",
        addressing: "absolute"
    },
    48: {
        instruction: "BMI",
        addressing: "relative"
    },
    49: {
        instruction: "AND",
        addressing: "indirectY"
    },
    53: {
        instruction: "AND",
        addressing: "zeropageX"
    },
    54: {
        instruction: "ROL",
        addressing: "zeropageX"
    },
    56: {
        instruction: "SEC",
        addressing: "implied"
    },
    57: {
        instruction: "AND",
        addressing: "absoluteY"
    },
    61: {
        instruction: "AND",
        addressing: "absoluteX"
    },
    62: {
        instruction: "ROL",
        addressing: "absoluteX"
    },
    64: {
        instruction: "RTI",
        addressing: "implied"
    },
    65: {
        instruction: "EOR",
        addressing: "indirectX"
    },
    69: {
        instruction: "EOR",
        addressing: "zeropage"
    },
    70: {
        instruction: "LSR",
        addressing: "zeropage"
    },
    72: {
        instruction: "PHA",
        addressing: "implied"
    },
    73: {
        instruction: "EOR",
        addressing: "immediate"
    },
    74: {
        instruction: "LSR",
        addressing: "accumulator"
    },
    76: {
        instruction: "JMP",
        addressing: "absolute"
    },
    77: {
        instruction: "EOR",
        addressing: "absolute"
    },
    78: {
        instruction: "LSR",
        addressing: "absolute"
    },
    80: {
        instruction: "BVC",
        addressing: "relative"
    },
    81: {
        instruction: "EOR",
        addressing: "indirectY"
    },
    85: {
        instruction: "EOR",
        addressing: "zeropageX"
    },
    86: {
        instruction: "LSR",
        addressing: "zeropageX"
    },
    88: {
        instruction: "CLI",
        addressing: "implied"
    },
    89: {
        instruction: "EOR",
        addressing: "absoluteY"
    },
    93: {
        instruction: "EOR",
        addressing: "absoluteX"
    },
    94: {
        instruction: "LSR",
        addressing: "absoluteX"
    },
    96: {
        instruction: "RTS",
        addressing: "implied"
    },
    97: {
        instruction: "ADC",
        addressing: "indirectX"
    },
    101: {
        instruction: "ADC",
        addressing: "zeropage"
    },
    102: {
        instruction: "ROR",
        addressing: "zeropage"
    },
    104: {
        instruction: "PLA",
        addressing: "implied"
    },
    105: {
        instruction: "ADC",
        addressing: "immediate"
    },
    106: {
        instruction: "ROR",
        addressing: "accumulator"
    },
    108: {
        instruction: "JMP",
        addressing: "indirect"
    },
    109: {
        instruction: "ADC",
        addressing: "absolute"
    },
    110: {
        instruction: "ROR",
        addressing: "absolute"
    },
    112: {
        instruction: "BVC",
        addressing: "relative"
    },
    113: {
        instruction: "ADC",
        addressing: "indirectY"
    },
    117: {
        instruction: "ADC",
        addressing: "zeropageX"
    },
    118: {
        instruction: "ROR",
        addressing: "zeropageX"
    },
    120: {
        instruction: "SEI",
        addressing: "implied"
    },
    121: {
        instruction: "ADC",
        addressing: "absoluteY"
    },
    125: {
        instruction: "ADC",
        addressing: "absoluteX"
    },
    126: {
        instruction: "ROR",
        addressing: "absoluteX"
    },
    129: {
        instruction: "STA",
        addressing: "indirectX"
    },
    132: {
        instruction: "STY",
        addressing: "zeropage"
    },
    133: {
        instruction: "STA",
        addressing: "zeropage"
    },
    134: {
        instruction: "STX",
        addressing: "zeropage"
    },
    136: {
        instruction: "DEY",
        addressing: "implied"
    },
    138: {
        instruction: "TXA",
        addressing: "implied"
    },
    140: {
        instruction: "STY",
        addressing: "absolute"
    },
    141: {
        instruction: "STA",
        addressing: "absolute"
    },
    142: {
        instruction: "STX",
        addressing: "absolute"
    },
    144: {
        instruction: "BCC",
        addressing: "relative"
    },
    145: {
        instruction: "STA",
        addressing: "indirectY"
    },
    148: {
        instruction: "STY",
        addressing: "zeropageX"
    },
    149: {
        instruction: "STA",
        addressing: "zeropageX"
    },
    150: {
        instruction: "STX",
        addressing: "zeropageY"
    },
    152: {
        instruction: "TYA",
        addressing: "implied"
    },
    153: {
        instruction: "STA",
        addressing: "absoluteY"
    },
    154: {
        instruction: "TXS",
        addressing: "implied"
    },
    157: {
        instruction: "STA",
        addressing: "absoluteX"
    },
    160: {
        instruction: "LDY",
        addressing: "immediate"
    },
    161: {
        instruction: "LDA",
        addressing: "indirectX"
    },
    162: {
        instruction: "LDX",
        addressing: "immediate"
    },
    164: {
        instruction: "LDY",
        addressing: "zeropage"
    },
    165: {
        instruction: "LDA",
        addressing: "zeropage"
    },
    166: {
        instruction: "LDX",
        addressing: "zeropage"
    },
    168: {
        instruction: "TAY",
        addressing: "implied"
    },
    169: {
        instruction: "LDA",
        addressing: "immediate"
    },
    170: {
        instruction: "TAX",
        addressing: "implied"
    },
    172: {
        instruction: "LDY",
        addressing: "absolute"
    },
    173: {
        instruction: "LDA",
        addressing: "absolute"
    },
    174: {
        instruction: "LDX",
        addressing: "absolute"
    },
    176: {
        instruction: "BCS",
        addressing: "relative"
    },
    177: {
        instruction: "LDA",
        addressing: "indirectY"
    },
    180: {
        instruction: "LDY",
        addressing: "zeropageX"
    },
    181: {
        instruction: "LDA",
        addressing: "zeropageX"
    },
    182: {
        instruction: "LDX",
        addressing: "zeropageY"
    },
    184: {
        instruction: "CLV",
        addressing: "implied"
    },
    185: {
        instruction: "LDA",
        addressing: "absoluteY"
    },
    186: {
        instruction: "TSX",
        addressing: "implied"
    },
    188: {
        instruction: "LDY",
        addressing: "absoluteX"
    },
    189: {
        instruction: "LDA",
        addressing: "absoluteX"
    },
    190: {
        instruction: "LDX",
        addressing: "absoluteY"
    },
    192: {
        instruction: "CPY",
        addressing: "immediate"
    },
    193: {
        instruction: "CMP",
        addressing: "indirectX"
    },
    196: {
        instruction: "CPY",
        addressing: "zeropage"
    },
    197: {
        instruction: "CMP",
        addressing: "zeropage"
    },
    198: {
        instruction: "DEC",
        addressing: "zeropage"
    },
    200: {
        instruction: "INY",
        addressing: "implied"
    },
    201: {
        instruction: "CMP",
        addressing: "immediate"
    },
    202: {
        instruction: "DEX",
        addressing: "implied"
    },
    204: {
        instruction: "CPY",
        addressing: "absolute"
    },
    205: {
        instruction: "CMP",
        addressing: "absolute"
    },
    206: {
        instruction: "DEC",
        addressing: "absolute"
    },
    208: {
        instruction: "BNE",
        addressing: "relative"
    },
    209: {
        instruction: "CMP",
        addressing: "indirectY"
    },
    213: {
        instruction: "CMP",
        addressing: "zeropageX"
    },
    214: {
        instruction: "DEC",
        addressing: "zeropageX"
    },
    216: {
        instruction: "CLD",
        addressing: "implied"
    },
    217: {
        instruction: "CMP",
        addressing: "absoluteY"
    },
    221: {
        instruction: "CMP",
        addressing: "absoluteX"
    },
    222: {
        instruction: "DEC",
        addressing: "absoluteX"
    },
    224: {
        instruction: "CPX",
        addressing: "immediate"
    },
    225: {
        instruction: "SBC",
        addressing: "indirectX"
    },
    228: {
        instruction: "CPX",
        addressing: "zeropage"
    },
    229: {
        instruction: "SBC",
        addressing: "zeropage"
    },
    230: {
        instruction: "INC",
        addressing: "zeropage"
    },
    232: {
        instruction: "INX",
        addressing: "implied"
    },
    233: {
        instruction: "SBC",
        addressing: "immediate"
    },
    234: {
        instruction: "NOP",
        addressing: "implied"
    },
    236: {
        instruction: "CPX",
        addressing: "absolute"
    },
    237: {
        instruction: "SBC",
        addressing: "absolute"
    },
    238: {
        instruction: "INC",
        addressing: "absolute"
    },
    240: {
        instruction: "BEQ",
        addressing: "relative"
    },
    241: {
        instruction: "SBC",
        addressing: "indirectY"
    },
    245: {
        instruction: "SBC",
        addressing: "zeropageX"
    },
    246: {
        instruction: "INC",
        addressing: "zeropageX"
    },
    248: {
        instruction: "SED",
        addressing: "implied"
    },
    249: {
        instruction: "SBC",
        addressing: "absoluteY"
    },
    253: {
        instruction: "SBC",
        addressing: "absoluteX"
    },
    254: {
        instruction: "INC",
        addressing: "absoluteX"
    }
};
