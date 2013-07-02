/** 
  *  Port name definition table
  */

module.exports = {
	0x3000: { name: "P_CPU_Bank_Ctrl" },
	0x3001: { name: "P_CPU_Clk_Ctrl" },
	0x3002: { name: "P_32768_EN" },
	0x3004: { name: "Sound Waveform?" },
	0x3007: { name: "P_Wakeup_Ctrl" },

	0x3010: { name: "P_PortA_Config" },
	0x3011: { name: "P_PortA_Dir" },
	0x3012: { name: "P_PortA_Data" },
	0x3013: { name: "P_PortA_Strobe" },
	0x3014: { name: "P_PortB_Config" },
	0x3015: { name: "P_PortB_Dir" },
	0x3016: { name: "P_PortB_Data" },

	0x3031: { name: "Timer Control ?" },
	0x3032: { name: "Timer Output 1?" },
	0x3033: { name: "Timer Output 2?" },
	0x3034: { name: "Timer Output 3? " },
	0x3035: { name: "Timer Output 4?" },
	0x303E: { name: "P_Seg0_Scan_Ctrl" },
	0x303F: { name: "P_Seg8_Scan_Ctrl" },
	0x3040: { name: "P_LCD_Setup1" },
	0x3041: { name: "P_LCD_Setup2" },
	0x3042: { name: "P_LCD_Clock1" },
	0x3043: { name: "P_LCD_Clock2" },
	0x3044: { name: "P_LCD_SEG_Num" },
	0x3045: { name: "P_LCD_COM_Num" },
	0x3047: { name: "P_LCD_Buffer_Ctrl" },
	0x3049: { name: "P_LCD_Pump_Ctrl" },

	0x3070: { name: "P_INT_Ctrl0" },	// Enable
	0x3071: { name: "P_INT_Ctrl1" },	// Enable
	0x3072: { name: "P_INT_Ctrl2 ?" },
	0x3073: { name: "P_INT_Flag0" },	// Clear
	0x3074: { name: "P_INT_Flag1" },	// Clear
	0x3075: { name: "P_INT_Flag2 ?" },
	0x3076: { name: "P_NMI_Ctrl" },
};
