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
        addressing: "(indirect,X)"
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
        addressing: "immidiate"
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
        addressing: "(indirect),Y"
    },
    21: {
        instruction: "ORA",
        addressing: "zeropage,X"
    },
    22: {
        instruction: "ASL",
        addressing: "zeropage,X"
    },
    24: {
        instruction: "CLC",
        addressing: "implied"
    },
    25: {
        instruction: "ORA",
        addressing: "absolute,Y"
    },
    29: {
        instruction: "ORA",
        addressing: "absolute,X"
    },
    30: {
        instruction: "ASL",
        addressing: "absolute,X"
    },
    32: {
        instruction: "JSR",
        addressing: "absolute"
    },
    33: {
        instruction: "AND",
        addressing: "(indirect,X)"
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
        instruction: "PHP",
        addressing: "implied"
    },
    41: {
        instruction: "AND",
        addressing: "immidiate"
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
        addressing: "(indirect),Y"
    },
    53: {
        instruction: "AND",
        addressing: "zeropage,X"
    },
    54: {
        instruction: "ROL",
        addressing: "zeropage,X"
    },
    56: {
        instruction: "SEC",
        addressing: "implied"
    },
    57: {
        instruction: "AND",
        addressing: "absolute,Y"
    },
    61: {
        instruction: "AND",
        addressing: "absolute,X"
    },
    62: {
        instruction: "ROL",
        addressing: "absolute,X"
    },
    64: {
        instruction: "RTI",
        addressing: "implied"
    },
    65: {
        instruction: "EOR",
        addressing: "(indirect,X)"
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
        addressing: "immidiate"
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
        addressing: "(indirect),Y"
    },
    85: {
        instruction: "EOR",
        addressing: "zeropage,X"
    },
    86: {
        instruction: "LSR",
        addressing: "zeropage,X"
    },
    88: {
        instruction: "CLI",
        addressing: "implied"
    },
    89: {
        instruction: "EOR",
        addressing: "absolute,Y"
    },
    93: {
        instruction: "EOR",
        addressing: "absolute,X"
    },
    94: {
        instruction: "LSR",
        addressing: "absolute,X"
    },
    96: {
        instruction: "RTS",
        addressing: "implied"
    },
    97: {
        instruction: "ADC",
        addressing: "(indirect,X)"
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
        addressing: "immidiate"
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
        addressing: "(indirect),Y"
    },
    117: {
        instruction: "ADC",
        addressing: "zeropage,X"
    },
    118: {
        instruction: "ROR",
        addressing: "zeropage,X"
    },
    120: {
        instruction: "SEI",
        addressing: "implied"
    },
    121: {
        instruction: "ADC",
        addressing: "absolute,Y"
    },
    125: {
        instruction: "ADC",
        addressing: "absolute,X"
    },
    126: {
        instruction: "ROR",
        addressing: "absolute,X"
    },
    129: {
        instruction: "STA",
        addressing: "(indirect,X)"
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
        instruction: "DEC",
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
        addressing: "(indirect),Y"
    },
    148: {
        instruction: "STY",
        addressing: "zeropage,X"
    },
    149: {
        instruction: "STA",
        addressing: "zeropage,X"
    },
    150: {
        instruction: "STX",
        addressing: "zeropage,Y"
    },
    152: {
        instruction: "TYA",
        addressing: "implied"
    },
    153: {
        instruction: "STA",
        addressing: "absolute,Y"
    },
    154: {
        instruction: "TXS",
        addressing: "implied"
    },
    157: {
        instruction: "STA",
        addressing: "absolute,X"
    },
    160: {
        instruction: "LDY",
        addressing: "immidiate"
    },
    161: {
        instruction: "LDA",
        addressing: "(indirect,X)"
    },
    162: {
        instruction: "LDX",
        addressing: "immidiate"
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
        addressing: "immidiate"
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
        addressing: "(indirect),Y"
    },
    180: {
        instruction: "LDY",
        addressing: "zeropage,X"
    },
    181: {
        instruction: "LDA",
        addressing: "zeropage,X"
    },
    182: {
        instruction: "LDX",
        addressing: "zeropage,Y"
    },
    184: {
        instruction: "CLV",
        addressing: "implied"
    },
    185: {
        instruction: "LDA",
        addressing: "absolute,Y"
    },
    186: {
        instruction: "TSX",
        addressing: "implied"
    },
    188: {
        instruction: "LDY",
        addressing: "absolute,X"
    },
    189: {
        instruction: "LDA",
        addressing: "absolute,X"
    },
    190: {
        instruction: "LDX",
        addressing: "absolute,Y"
    },
    192: {
        instruction: "CPY",
        addressing: "immidiate"
    },
    193: {
        instruction: "CMP",
        addressing: "(indirect,X)"
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
        addressing: "immidiate"
    },
    202: {
        instruction: "DEC",
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
        addressing: "(indirect),Y"
    },
    213: {
        instruction: "CMP",
        addressing: "zeropage,X"
    },
    214: {
        instruction: "DEC",
        addressing: "zeropage,X"
    },
    216: {
        instruction: "CLD",
        addressing: "implied"
    },
    217: {
        instruction: "CMP",
        addressing: "absolute,Y"
    },
    221: {
        instruction: "CMP",
        addressing: "absolute,X"
    },
    222: {
        instruction: "DEC",
        addressing: "absolute,X"
    },
    224: {
        instruction: "CPX",
        addressing: "immidiate"
    },
    225: {
        instruction: "SBC",
        addressing: "(indirect,X)"
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
        addressing: "immidiate"
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
        addressing: "(indirect),Y"
    },
    245: {
        instruction: "SBC",
        addressing: "zeropage,X"
    },
    246: {
        instruction: "INC",
        addressing: "zeropage,X"
    },
    248: {
        instruction: "SED",
        addressing: "implied"
    },
    249: {
        instruction: "SBC",
        addressing: "absolute,Y"
    },
    253: {
        instruction: "SBC",
        addressing: "absolute,X"
    },
    254: {
        instruction: "INC",
        addressing: "absolute,X"
    }
};
