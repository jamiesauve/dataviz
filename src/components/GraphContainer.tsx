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
    color: (number | undefined)[];
    colorscale: string;
  };
}

const GraphContainer: React.FC<GraphContainerProps> = ({
  axisSelections,
}) => {
  const { getData, isLoading } = useDataGenerator();
  const { xAxis, yAxis, zAxis } = axisSelections;

  const data = getData();

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  const plotData: PlotDataPoint[] = [{
    type: 'scatter3d',
    mode: 'markers',
    x: data.map(d => xAxis ? (d[xAxis] as number) : null),
    y: data.map(d => yAxis ? (d[yAxis] as number) : null),
    z: data.map(d => zAxis ? (d[zAxis] as number) : null),
    marker: {
      size: 5,
      color: data.map(d => d.cluster ?? 0),
      colorscale: 'Viridis'
    }
  }];

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
          margin: { t: 50, b: 20, l: 20, r: 20 },
          autosize: true,
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