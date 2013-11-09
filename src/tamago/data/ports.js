/** 
  *  Port name definition table
  */

module.exports = {
	// System block
	0x3000: { 
		name: "P_CPU_Bank_Ctrl", 
		fields: [
			{ name:"bank", start: 0, length: 8 }
		]
	},
	0x3001: { 
		name: "P_CPU_Clk_Ctrl", 
	},
	0x3002: { 
		name: "P_32768_EN", 
	},
	0x3004: { 
		name: "Watchdog Timer?",
	},
	0x3006: {
		name: "Sound Related?",
	},
	0x3007: { 
		name: "P_Wakeup_Ctrl",
	},

	// Port block
	0x3010: { 
		name: "P_PortA_Config",
	},
	0x3011: { 
		name: "P_PortA_Dir",
		fields: [
			{ name:"IR Transmit", start: 7, length: 1 },
			{ name:"Cart CD2", start: 6, length: 1 },
			{ name:"Cart CD1", start: 5, length: 1 },
			{ name:"Cart Power", start: 4, length: 1 },
			{ name:"Reset", start: 3, length: 1 },
			{ name:"C", start: 2, length: 1 },
			{ name:"B", start: 1, length: 1 },
			{ name:"A", start: 0, length: 1 }
		]
	},
	0x3012: { 
		name: "P_PortA_Data",
		fields: [
			{ name:"IR Rx", start: 7, length: 1 },
			{ name:"Cart CD2", start: 6, length: 1 },
			{ name:"Cart CD1", start: 5, length: 1 },
			{ name:"Cart Power", start: 4, length: 1 },
			{ name:"Reset", start: 3, length: 1 },
			{ name:"C", start: 2, length: 1 },
			{ name:"B", start: 1, length: 1 },
			{ name:"A", start: 0, length: 1 }
		]
	},
	0x3013: { 
		name: "P_PortA_Strobe",
	},
	0x3014: { 
		name: "P_PortB_Config",
	},
	0x3015: { 
		name: "P_PortB_Dir",
		fields: [
			{ name:"SPI Rx", start: 7, length: 1 },
			{ name:"SPI Tx", start: 6, length: 1 },
			{ name:"SPI Clk", start: 5, length: 1 },
			{ name:"SPI CSN", start: 4, length: 1 },
			{ name:"IR Tx", start: 3, length: 1 },
			{ name:"I2C Power", start: 2, length: 1 },
			{ name:"I2C Clk", start: 1, length: 1 },
			{ name:"I2C Data", start: 0, length: 1 }
		]
	},
	0x3016: { 
		name: "P_PortB_Data",
		fields: [
			{ name:"SPI Rx", start: 7, length: 1 },
			{ name:"SPI Tx", start: 6, length: 1 },
			{ name:"SPI Clk", start: 5, length: 1 },
			{ name:"SPI CSN", start: 4, length: 1 },
			{ name:"IR Tx", start: 3, length: 1 },
			{ name:"I2C Power", start: 2, length: 1 },
			{ name:"I2C Clk", start: 1, length: 1 },
			{ name:"I2C Data", start: 0, length: 1 }
		]
	},

	// Timer control block
	0x3030: { 
		name: "Timer Control 0?",
	},
	0x3031: { 
		name: "Timer Control 1?",
	},
	0x3032: { 
		name: "Timer Output 0 low?",
	},
	0x3033: { 
		name: "Timer Output 0 high?",
	},
	0x3034: { 
		name: "Timer Output 1 low?",
	},
	0x3035: { 
		name: "Timer Output 1 high?",
	},
	0x303E: { 
		name: "P_Seg0_Scan_Ctrl",
	},
	0x303F: { 
		name: "P_Seg8_Scan_Ctrl",
	},

	// LCD Control block
	0x3040: { 
		name: "P_LCD_Setup1",
	},
	0x3041: { 
		name: "P_LCD_Setup2",
	},
	0x3042: { 
		name: "P_LCD_Clock1",
	},
	0x3043: { 
		name: "P_LCD_Clock2",
	},
	0x3044: { 
		name: "P_LCD_SEG_Num",
	},
	0x3045: { 
		name: "P_LCD_COM_Num",
	},
	0x3047: { 
		name: "P_LCD_Buffer_Ctrl",
	},
	0x3048: {
		name: "P_Contrast_Ctrl",
	},
	0x3049: { 
		name: "P_LCD_Pump_Ctrl",
	},

	// Sound control block
	0x3060: {
		name: "Sound Related?",
	},
	0x3062: {
		name: "Sound Related?",
	},
	0x3064: {
		name: "Sound Related?",
	},
	0x3065: {
		name: "Sound Related?",
	},

	// Interrupt control block
	0x3070: { 
		name: "P_INT_Ctrl0",
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
	},
	0x3073: { 
		name: "P_INT_Flag0",
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
	},
	0x3076: { 
		name: "P_NMI_Ctrl",
	},

	// SPI 
	0x30B0: {
		name: "P_SPI_Ctrl ?",
	},
	0x30B1: {
		name: "SPI related",
	},
	0x30B2: {
		name: "SPI related ?",
	},
	0x30B3: {
		name: "P_SPI_Write ?",
	},
	0x30B4: {
		name: "SPI related ?",
	},
	0x30B5: {
		name: "SPI related ?",
	},
	0x30B6: {
		name: "P_SPI_Read ?",
	},
	0x30B7: {
		name: "P_SPI_Status ?",
	},
	0x30BA: {
		name: "SPI related ?"
	},
};
