// Cyberpunk color palette
export const COLORS = {
  // Cell colors
  cellTypes: {
    erythrocyte: '#FF1493',  // Hot pink
    neutrophil: '#9932CC',   // Bright purple
    lymphocyte: '#39FF14',   // Neon green
    monocyte: '#FFFF00',     // Bright yellow
    eosinophil: '#FF0000',   // Pure red
    basophil: '#FF8C00',     // Vibrant orange
  },

  // Theme colors
  theme: {
    primary: '#ff4081',
    secondary: '#00ffc8',
    accent: '#ff9100',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    border: '#404040',
    text: '#ffffff',
    textMuted: '#808080',
  }
} as const;

export const CELL_COLORS = [
  COLORS.cellTypes.erythrocyte,
  COLORS.cellTypes.neutrophil,
  COLORS.cellTypes.lymphocyte,
  COLORS.cellTypes.monocyte,
  COLORS.cellTypes.eosinophil,
  COLORS.cellTypes.basophil,
]; 