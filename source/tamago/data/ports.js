/** 
  *  Port name definition table
  */

module.exports = {
	0x3000: { 
		name: "P_CPU_Bank_Ctrl", 
		description: "Bank Control",
		fields: [
			{ name:"bank", start: 0, length: 8 }
		]
	},
	0x3001: { 
		name: "P_CPU_Clk_Ctrl", 
		description: "CPU Control",
		fields: []
	},
	0x3002: { 
		name: "P_32768_EN", 
		description: "32kHZ Timer Control",
		fields: []
	},
	0x3004: { 
		name: "Sound Waveform?",
		description: "",
		fields: []
	},
	0x3007: { 
		name: "P_Wakeup_Ctrl",
		description: "",
		fields: []
	},

	0x3010: { 
		name: "P_PortA_Config",
		description: "",
		fields: []
	},
	0x3011: { 
		name: "P_PortA_Dir",
		description: "",
		fields: []
	},
	0x3012: { 
		name: "P_PortA_Data",
		description: "",
		fields: []
	},
	0x3013: { 
		name: "P_PortA_Strobe",
		description: "",
		fields: []
	},
	0x3014: { 
		name: "P_PortB_Config",
		description: "",
		fields: []
	},
	0x3015: { 
		name: "P_PortB_Dir",
		description: "",
		fields: []
	},
	0x3016: { 
		name: "P_PortB_Data",
		description: "",
		fields: []
	},

	0x3031: { 
		name: "Timer Control ?",
		description: "",
		fields: []
	},
	0x3032: { 
		name: "Timer Output 1?",
		description: "",
		fields: []
	},
	0x3033: { 
		name: "Timer Output 2?",
		description: "",
		fields: []
	},
	0x3034: { 
		name: "Timer Output 3? ",
		description: "",
		fields: []
	},
	0x3035: { 
		name: "Timer Output 4?",
		description: "",
		fields: []
	},
	0x303E: { 
		name: "P_Seg0_Scan_Ctrl",
		description: "",
		fields: []
	},
	0x303F: { 
		name: "P_Seg8_Scan_Ctrl",
		description: "",
		fields: []
	},
	0x3040: { 
		name: "P_LCD_Setup1",
		description: "",
		fields: []
	},
	0x3041: { 
		name: "P_LCD_Setup2",
		description: "",
		fields: []
	},
	0x3042: { 
		name: "P_LCD_Clock1",
		description: "",
		fields: []
	},
	0x3043: { 
		name: "P_LCD_Clock2",
		description: "",
		fields: []
	},
	0x3044: { 
		name: "P_LCD_SEG_Num",
		description: "",
		fields: []
	},
	0x3045: { 
		name: "P_LCD_COM_Num",
		description: "",
		fields: []
	},
	0x3047: { 
		name: "P_LCD_Buffer_Ctrl",
		description: "",
		fields: []
	},
	0x3049: { 
		name: "P_LCD_Pump_Ctrl",
		description: "",
		fields: []
	},

	0x3070: { 
		name: "P_INT_Ctrl0",
		description: "",
		fields: []
	},
	0x3071: { 
		name: "P_INT_Ctrl1",
		description: "",
		fields: []
	},
	0x3072: { 
		name: "P_INT_Ctrl2 ?",
		description: "",
		fields: []
	},
	0x3073: { 
		name: "P_INT_Flag0",
		description: "",
		fields: []
	},
	0x3074: { 
		name: "P_INT_Flag1",
		description: "",
		fields: []
	},
	0x3075: { 
		name: "P_INT_Flag2 ?",
		description: "",
		fields: []
	},
	0x3076: { 
		name: "P_NMI_Ctrl",
		description: "",
		fields: []
	},
};
