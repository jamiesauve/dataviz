import React from 'react';
import Plot from 'react-plotly.js';
import { Data } from 'plotly.js';
import { useDataGenerator } from '../contexts/DataGeneratorContext';
import { CELL_TYPE_NAMES, CELL_COLORS } from '../utils/cellTypes';

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
      size: 5,
      color: CELL_COLORS[clusterIndex]
    },
    name: cellType,
    showlegend: true,
    hovertemplate: `%{text}<br>${xAxis}: %{x}<br>${yAxis}: %{y}`,
    text: data.filter(d => d.cluster === clusterIndex).map(() => cellType)
  }));

  return (
    <div>
      <Plot
        config={{
          toImageButtonOptions: {
            format: 'svg',
            filename: '2d_plot'
          }
        }}
        data={plotData}
        layout={{
          width: Math.min(800, window.innerWidth - 380),
          height: Math.min(window.innerHeight - 40, (window.innerWidth - 380) * 0.75),
          title: `2D Plot (${xAxis?.toUpperCase() || 'X'} vs ${yAxis?.toUpperCase() || 'Y'})`,
          margin: { t: 50, b: 20, l: 20, r: 100 },
          showlegend: true,
          legend: {
            x: 1.1,
            y: 0.5,
            title: { text: 'Cell Types' }
          },
          xaxis: {
            title: {
              text: xAxis?.toUpperCase() || 'X',
              font: { size: 12, color: '#7f7f7f' }
            }
          },
          yaxis: {
            title: {
              text: yAxis?.toUpperCase() || 'Y',
              font: { size: 12, color: '#7f7f7f' }
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
};

export default Graph2DContainer; 