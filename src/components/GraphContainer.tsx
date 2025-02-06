import React from 'react';
import Plot from 'react-plotly.js';
import { useDataGenerator } from '../contexts/DataGeneratorContext';
import { AxisSelections } from '../types/graph';

interface GraphContainerProps {
  axisSelections: AxisSelections;
}

interface PlotDataPoint {
  type: 'scatter3d';
  mode: 'markers';
  x: (number | null)[];
  y: (number | null)[];
  z: (number | null)[];
  marker: {
    size: number;
    color: string;
  };
  name: string;
  showlegend: boolean;
  hovertemplate: string;
  text: string[];
}

const CELL_TYPES = [
  'Erythrocyte',
  'Neutrophil',
  'Lymphocyte',
  'Monocyte',
  'Eosinophil',
  'Basophil'
];

const GraphContainer: React.FC<GraphContainerProps> = ({
  axisSelections,
}) => {
  const { getData, isLoading } = useDataGenerator();
  const { xAxis, yAxis, zAxis } = axisSelections;

  const data = getData();

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  // Create separate traces for each cell type for proper legend
  const plotData: PlotDataPoint[] = CELL_TYPES.map((cellType, clusterIndex) => ({
    type: 'scatter3d',
    mode: 'markers',
    x: data.filter(d => d.cluster === clusterIndex).map(d => xAxis ? (d[xAxis] as number) : null),
    y: data.filter(d => d.cluster === clusterIndex).map(d => yAxis ? (d[yAxis] as number) : null),
    z: data.filter(d => d.cluster === clusterIndex).map(d => zAxis ? (d[zAxis] as number) : null),
    marker: {
      size: 5,
      color: [
        '#FF4B4B',    // Erythrocyte - Red
        '#4B4BFF',    // Neutrophil - Blue
        '#4BFF4B',    // Lymphocyte - Green
        '#FFB74B',    // Monocyte - Orange
        '#FF4BFF',    // Eosinophil - Pink
        '#4BFFFF'     // Basophil - Cyan
      ][clusterIndex]
    },
    name: cellType,
    showlegend: true,
    hovertemplate: `%{text}<br>${xAxis}: %{x}<br>${yAxis}: %{y}<br>${zAxis}: %{z}`,
    text: data.filter(d => d.cluster === clusterIndex).map(() => cellType)
  }));

  return (
    <div>
      <Plot
        config={{
          toImageButtonOptions: {
            format: 'svg',
            filename: '3d_plot'
          }
        }}
        data={plotData}
        layout={{
          width: Math.min(800, window.innerWidth - 380),
          height: Math.min(window.innerHeight - 40, (window.innerWidth - 380) * 0.75),
          title: `3D Plot (${xAxis?.toUpperCase() || 'X'} vs ${yAxis?.toUpperCase() || 'Y'} vs ${zAxis?.toUpperCase() || 'Z'})`,
          margin: { t: 50, b: 20, l: 20, r: 100 },
          autosize: true,
          showlegend: true,
          legend: {
            x: 1.1,
            y: 0.5,
            title: { text: 'Cell Types' }
          },
          scene: {
            xaxis: {
              title: {
                text: xAxis?.toUpperCase() || 'X',
                font: {
                  size: 12,
                  color: '#7f7f7f'
                }
              }
            },
            yaxis: {
              title: {
                text: yAxis?.toUpperCase() || 'Y',
                font: {
                  size: 12,
                  color: '#7f7f7f'
                }
              }
            },
            zaxis: {
              title: {
                text: zAxis?.toUpperCase() || 'Z',
                font: {
                  size: 12,
                  color: '#7f7f7f'
                }
              }
            }
          }
        }}
        style={{
          margin: '0 auto',
          display: 'block'
        }}
      />
    </div>
  );
}

export default GraphContainer; 