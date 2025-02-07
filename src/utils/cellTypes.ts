export interface CellTypeInfo {
  name: string;
  color: string;
  naturalFrequency: number;  // Percentage in healthy blood
  characteristics: {
    [key: string]: {
      mean: number;
      stdDev: number;
    };
  };
}

export const CELL_TYPES: { [key: string]: CellTypeInfo } = {
  erythrocyte: {
    name: 'Erythrocyte',
    color: '#FF4B4B',
    naturalFrequency: 0.97,  // ~97% of blood cells
    characteristics: {
      area_msd: { mean: 40, stdDev: 5 },    // These values are placeholders
      deform: { mean: 0.3, stdDev: 0.05 },  // Would need real clinical data
      bright_avg: { mean: 0.8, stdDev: 0.1 }
    }
  },
  neutrophil: {
    name: 'Neutrophil',
    color: '#4B4BFF',
    naturalFrequency: 0.02,  // ~2%
    characteristics: {
      area_msd: { mean: 80, stdDev: 10 },
      deform: { mean: 0.2, stdDev: 0.05 },
      bright_avg: { mean: 0.6, stdDev: 0.1 }
    }
  },
  lymphocyte: {
    name: 'Lymphocyte',
    color: '#4BFF4B',
    naturalFrequency: 0.005,  // ~0.5%
    characteristics: {
      area_msd: { mean: 60, stdDev: 8 },
      deform: { mean: 0.25, stdDev: 0.05 },
      bright_avg: { mean: 0.7, stdDev: 0.1 }
    }
  },
  monocyte: {
    name: 'Monocyte',
    color: '#FFB74B',
    naturalFrequency: 0.003,  // ~0.3%
    characteristics: {
      area_msd: { mean: 90, stdDev: 12 },
      deform: { mean: 0.15, stdDev: 0.05 },
      bright_avg: { mean: 0.5, stdDev: 0.1 }
    }
  },
  eosinophil: {
    name: 'Eosinophil',
    color: '#FF4BFF',
    naturalFrequency: 0.001,  // ~0.1%
    characteristics: {
      area_msd: { mean: 70, stdDev: 9 },
      deform: { mean: 0.18, stdDev: 0.05 },
      bright_avg: { mean: 0.65, stdDev: 0.1 }
    }
  },
  basophil: {
    name: 'Basophil',
    color: '#4BFFFF',
    naturalFrequency: 0.001,  // ~0.1%
    characteristics: {
      area_msd: { mean: 65, stdDev: 8 },
      deform: { mean: 0.22, stdDev: 0.05 },
      bright_avg: { mean: 0.55, stdDev: 0.1 }
    }
  }
};

export const CELL_TYPE_NAMES = [
  'Erythrocytes',
  'Neutrophils',
  'Lymphocytes',
  'Monocytes',
  'Eosinophils',
  'Neutrophils'
] as const;

export const CELL_COLORS = CELL_TYPE_NAMES.map((_, i) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--cell-color-${i}`).trim()
); 