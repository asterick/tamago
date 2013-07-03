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
	},
	0x3002: { 
		name: "P_32768_EN", 
		description: "32kHZ Timer Control",
	},
	0x3004: { 
		name: "Timer1 counter?",
		description: "",
	},
	0x3007: { 
		name: "P_Wakeup_Ctrl",
		description: "",
	},

	0x3010: { 
		name: "P_PortA_Config",
		description: "",
	},
	0x3011: { 
		name: "P_PortA_Dir",
		description: "",
	},
	0x3012: { 
		name: "P_PortA_Data",
		description: "",
	},
	0x3013: { 
		name: "P_PortA_Strobe",
		description: "",
	},
	0x3014: { 
		name: "P_PortB_Config",
		description: "",
	},
	0x3015: { 
		name: "P_PortB_Dir",
		description: "",
	},
	0x3016: { 
		name: "P_PortB_Data",
		description: "",
	},

	0x3031: { 
		name: "Timer Control ?",
		description: "",
	},
	0x3032: { 
		name: "Timer Output 1?",
		description: "",
	},
	0x3033: { 
		name: "Timer Output 2?",
		description: "",
	},
	0x3034: { 
		name: "Timer Output 3? ",
		description: "",
	},
	0x3035: { 
		name: "Timer Output 4?",
		description: "",
	},
	0x303E: { 
		name: "P_Seg0_Scan_Ctrl",
		description: "",
	},
	0x303F: { 
		name: "P_Seg8_Scan_Ctrl",
		description: "",
	},
	0x3040: { 
		name: "P_LCD_Setup1",
		description: "",
	},
	0x3041: { 
		name: "P_LCD_Setup2",
		description: "",
	},
	0x3042: { 
		name: "P_LCD_Clock1",
		description: "",
	},
	0x3043: { 
		name: "P_LCD_Clock2",
		description: "",
	},
	0x3044: { 
		name: "P_LCD_SEG_Num",
		description: "",
	},
	0x3045: { 
		name: "P_LCD_COM_Num",
		description: "",
	},
	0x3047: { 
		name: "P_LCD_Buffer_Ctrl",
		description: "",
	},
	0x3049: { 
		name: "P_LCD_Pump_Ctrl",
		description: "",
	},

	0x3070: { 
		name: "P_INT_Ctrl0",
		description: "",
		fields: [
			{ name:"Enable TM0", start: 7, length: 1 },
			{ name:"Enable IRQ1", start: 6, length: 1 },
			{ name:"Enable IRQ2", start: 5, length: 1 },
			{ name:"Enable 2048", start: 4, length: 1 },
			{ name:"Enable 8192", start: 3, length: 1 },
			{ name:"Enable SPU", start: 2, length: 1 },
			{ name:"Enable SPI", start: 1, length: 1 },
			{ name:"Enable FP", start: 0, length: 1 }
		]
	},
	0x3071: { 
		name: "P_INT_Ctrl1",
		description: "",
		fields: [
			{ name:"Enable IRQ8", start: 7, length: 1 },
			{ name:"Enable IRQ9", start: 6, length: 1 },
			{ name:"Enable TM1", start: 5, length: 1 },
			{ name:"Enable IRQ11", start: 4, length: 1 },
			{ name:"Enable TBH", start: 3, length: 1 },
			{ name:"Enable TBL", start: 2, length: 1 },
			{ name:"Enable IRQ14", start: 1, length: 1 },
			{ name:"Enable IRQ15", start: 0, length: 1 }
		]
	},
	0x3072: { 
		name: "P_INT_Ctrl2 ?",
		description: "",
	},
	0x3073: { 
		name: "P_INT_Flag0",
		description: "",
		fields: [
			{ name:"Pending TM0", start: 7, length: 1 },
			{ name:"Pending IRQ1", start: 6, length: 1 },
			{ name:"Pending IRQ2", start: 5, length: 1 },
			{ name:"Pending 2048", start: 4, length: 1 },
			{ name:"Pending 8192", start: 3, length: 1 },
			{ name:"Pending SPU", start: 2, length: 1 },
			{ name:"Pending SPI", start: 1, length: 1 },
			{ name:"Pending FP", start: 0, length: 1 }
		]
	},
	0x3074: { 
		name: "P_INT_Flag1",
		description: "",
		fields: [
			{ name:"Pending IRQ8", start: 7, length: 1 },
			{ name:"Pending IRQ9", start: 6, length: 1 },
			{ name:"Pending TM1", start: 5, length: 1 },
			{ name:"Pending IRQ11", start: 4, length: 1 },
			{ name:"Pending TBH", start: 3, length: 1 },
			{ name:"Pending TBL", start: 2, length: 1 },
			{ name:"Pending IRQ14", start: 1, length: 1 },
			{ name:"Pending IRQ15", start: 0, length: 1 }
		]
	},
	0x3075: { 
		name: "P_INT_Flag2 ?",
		description: "",
	},
	0x3076: { 
		name: "P_NMI_Ctrl",
		description: "",
	},
};
