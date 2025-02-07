import React from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';
import { useDataGenerator } from '../contexts/DataGeneratorContext';
import { CELL_TYPE_NAMES, CELL_COLORS } from '../utils/cellTypes';
import { DARK_THEME } from '../utils/plotTheme';

const CellTypePieChart: React.FC = () => {
  const { getData } = useDataGenerator();
  const data = getData();

  const plotData: Data[] = [{
    type: 'pie',
    values: CELL_TYPE_NAMES.map((_, index) =>
      data.filter(d => d.cluster === index).length
    ),
    labels: CELL_TYPE_NAMES,
    marker: {
      colors: CELL_COLORS
    },
    textinfo: 'label+text+percent',
    hoverinfo: 'label+text+percent',
    text: CELL_TYPE_NAMES.map((_, index) => {
      const count = data.filter(d => d.cluster === index).length;
      return `Count: ${count}`;
    }),
    textposition: 'outside',
    textfont: {
      family: 'Chakra Petch',
      size: 16,
      color: DARK_THEME.text
    },
    automargin: true,
    direction: 'clockwise',
    sort: false
  }];

  const layout: Partial<Layout> = {
    width: 500,
    height: 420,
    paper_bgcolor: DARK_THEME.bg,
    plot_bgcolor: DARK_THEME.surface,
    margin: { t: 100, b: 30, l: 50, r: 50 },
    showlegend: false,
    title: {
      text: 'Cell Type Distribution',
      font: {
        family: 'Chakra Petch',
        size: 24,
        color: DARK_THEME.text
      },
      y: 0.98,
    }
  };

  return (
    <div>
      <Plot
        data={plotData}
        layout={layout}
        config={{
          displayModeBar: false,
          responsive: true
        }}
        style={{ background: DARK_THEME.bg }}
      />
    </div>
  );
};

export default CellTypePieChart; 