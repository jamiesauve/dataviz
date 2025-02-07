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
    textinfo: 'label+percent',
    hovertemplate: '%{label}<br>Count: %{value}<br>Percentage: %{percent}<extra></extra>',
    textfont: {
      size: 14,
      color: DARK_THEME.text
    }
  }];

  const layout: Partial<Layout> = {
    width: 300,
    height: 300,
    paper_bgcolor: DARK_THEME.bg,
    plot_bgcolor: DARK_THEME.surface,
    margin: { t: 30, b: 30, l: 30, r: 30 },
    showlegend: false,
    title: {
      text: 'Cell Type Distribution',
      font: {
        size: 16,
        color: DARK_THEME.text
      }
    }
  };

  return (
    <div className="pie-chart-container">
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