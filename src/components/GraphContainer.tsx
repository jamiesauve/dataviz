import React from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout, Config, ModeBarDefaultButtons } from 'plotly.js';
import { useDataGenerator } from '../contexts/DataGeneratorContext';
import { CELL_TYPE_NAMES, CELL_COLORS } from '../utils/cellTypes';
import { DARK_THEME } from '../utils/plotTheme';
import { AxisSelections } from '../types/graph';
import './GraphContainer.css';

interface GraphContainerProps {
  axisSelections: AxisSelections;
}

interface DataPoint {
  cluster: number;
  [key: string]: number | string;
}

const GraphContainer: React.FC<GraphContainerProps> = ({ axisSelections }) => {
  const { getData, isLoading } = useDataGenerator();
  const data = getData() as DataPoint[];

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  const { xAxis, yAxis, zAxis } = axisSelections;

  const plotData: Data[] = CELL_TYPE_NAMES.map((cellType, clusterIndex) => ({
    type: 'scatter3d' as const,
    mode: 'markers' as const,
    x: data
      .filter(d => d.cluster === clusterIndex)
      .map(d => xAxis ? Number(d[xAxis]) : 0),
    y: data
      .filter(d => d.cluster === clusterIndex)
      .map(d => yAxis ? Number(d[yAxis]) : 0),
    z: data
      .filter(d => d.cluster === clusterIndex)
      .map(d => zAxis ? Number(d[zAxis]) : 0),
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
    hovertemplate: `${cellType}<br>${xAxis}: %{x}<br>${yAxis}: %{y}<br>${zAxis}: %{z}<extra></extra>`,
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
      text: `3D Plot (${xAxis?.toUpperCase() || 'X'} vs ${yAxis?.toUpperCase() || 'Y'} vs ${zAxis?.toUpperCase() || 'Z'})`,
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
        color: DARK_THEME.text,
        size: 16
      }
    },
    margin: { l: 50, r: 100, t: 50, b: 50 },
    scene: {
      xaxis: {
        title: {
          text: xAxis?.toUpperCase() || 'X',
          font: {
            color: DARK_THEME.text
          }
        },
        gridcolor: DARK_THEME.grid,
        showgrid: true,
        zeroline: false,
        showline: true,
        tickfont: {
          color: DARK_THEME.mutedText
        },
        backgroundcolor: DARK_THEME.surface
      },
      yaxis: {
        title: {
          text: yAxis?.toUpperCase() || 'Y',
          font: {
            color: DARK_THEME.text
          }
        },
        gridcolor: DARK_THEME.grid,
        showgrid: true,
        zeroline: false,
        showline: true,
        tickfont: {
          color: DARK_THEME.mutedText
        },
        backgroundcolor: DARK_THEME.surface
      },
      zaxis: {
        title: {
          text: zAxis?.toUpperCase() || 'Z',
          font: {
            color: DARK_THEME.text
          }
        },
        gridcolor: DARK_THEME.grid,
        showgrid: true,
        zeroline: false,
        showline: true,
        tickfont: {
          color: DARK_THEME.mutedText
        },
        backgroundcolor: DARK_THEME.surface
      },
      bgcolor: DARK_THEME.surface
    }
  };


  const config: Partial<Config> = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['select3d', 'lasso3d'] as unknown as ModeBarDefaultButtons[],
    toImageButtonOptions: {
      format: 'svg' as const,
      filename: '3d_plot'
    },
    responsive: true
  };

  return (
    <div className="plot-container">
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        className="plot-background"
      />
    </div>
  );
};

export default GraphContainer; 