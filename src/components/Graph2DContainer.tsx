import React from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';
import { useDataGenerator } from '../contexts/DataGeneratorContext';
import { CELL_TYPE_NAMES, CELL_COLORS } from '../utils/cellTypes';
import { DARK_THEME } from '../utils/plotTheme';
import './Graph2DContainer.css';

interface Graph2DContainerProps {
  xAxis: string | null;
  yAxis: string | null;
}

const Graph2DContainer: React.FC<Graph2DContainerProps> = ({
  xAxis,
  yAxis,
}) => {
  const { getData, isLoading } = useDataGenerator();
  const data = getData();

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  const plotData: Data[] = CELL_TYPE_NAMES.map((cellType, clusterIndex) => ({
    type: 'scatter' as const,
    mode: 'markers' as const,
    x: data.filter(d => d.cluster === clusterIndex).map(d => xAxis ? (d[xAxis] as number) : null),
    y: data.filter(d => d.cluster === clusterIndex).map(d => yAxis ? (d[yAxis] as number) : null),
    marker: {
      size: 7,
      color: CELL_COLORS[clusterIndex],
      opacity: 0.7,
      line: {
        color: 'white',
        width: 1
      }
    },
    name: cellType,
    showlegend: true,
    hovertemplate: `${cellType}<br>${xAxis}: %{x}<br>${yAxis}: %{y}<extra></extra>`,
    text: data.filter(d => d.cluster === clusterIndex).map(() => cellType)
  }));

  const layout: Partial<Layout> = {
    width: Math.min(800, window.innerWidth - 380),
    height: Math.min(window.innerHeight - 40, (window.innerWidth - 380) * 0.75),
    paper_bgcolor: DARK_THEME.bg,
    plot_bgcolor: DARK_THEME.surface,
    font: {
      color: DARK_THEME.text,
      size: 12
    },
    title: {
      text: `2D Plot (${xAxis?.toUpperCase() || 'X'} vs ${yAxis?.toUpperCase() || 'Y'})`,
      font: {
        size: 16,
        color: DARK_THEME.text
      }
    },
    showlegend: true,
    legend: {
      x: 1.1,
      y: 0.5,
      bgcolor: DARK_THEME.bg,
      bordercolor: DARK_THEME.grid,
      font: {
        color: DARK_THEME.text
      }
    },
    margin: { l: 50, r: 100, t: 50, b: 50 },
    xaxis: {
      showgrid: true,
      gridcolor: DARK_THEME.grid,
      gridwidth: 1,
      zeroline: false,
      title: {
        text: xAxis?.toUpperCase() || 'X',
        font: {
          color: DARK_THEME.text
        }
      },
      tickfont: {
        color: DARK_THEME.mutedText
      }
    },
    yaxis: {
      showgrid: true,
      gridcolor: DARK_THEME.grid,
      gridwidth: 1,
      zeroline: false,
      title: {
        text: yAxis?.toUpperCase() || 'Y',
        font: {
          color: DARK_THEME.text
        }
      },
      tickfont: {
        color: DARK_THEME.mutedText
      }
    }
  };

  return (
    <div className="plot-container">
      <Plot
        data={plotData}
        layout={layout}
        config={{
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['lasso2d', 'select2d'],
          toImageButtonOptions: {
            format: 'svg',
            filename: '2d_plot'
          },
          responsive: true
        }}
        style={{ background: DARK_THEME.bg }}
      />
    </div>
  );
};

export default Graph2DContainer; 