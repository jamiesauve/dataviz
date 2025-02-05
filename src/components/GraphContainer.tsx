import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import useDataGenerator from '../utils/GenerateData';
import { AxisSelections } from '../types/graph';

interface GraphContainerProps {
  axisSelections: AxisSelections;
}

const GraphContainer: React.FC<GraphContainerProps> = ({
  axisSelections,
}) => {
  const { generateNewData, getData } = useDataGenerator();
  const { xAxis, yAxis, zAxis } = axisSelections;

  // Generate initial data on mount
  useEffect(() => {
    generateNewData();
  }, []);

  const data = getData();

  const getAxisData = (axisSelection: keyof typeof axisSelections) => {
    const selection = axisSelections[axisSelection];
    return selection ? data.map(point => point.values[selection]) : data.map(point => point.x);
  };

  return (
    <div>
      <Plot
        data={[{
          type: 'scatter3d',
          mode: 'markers',
          x: getAxisData('xAxis'),
          y: getAxisData('yAxis'),
          z: getAxisData('zAxis'),
          marker: {
            size: 5,
            color: data.map(point => point.values.e),
            colorscale: 'Viridis',
            opacity: 0.8
          },
          text: data.map((point, i) =>
            `Point ${i + 1}<br>` +
            `A: ${point.values.a.toFixed(2)}<br>` +
            `B: ${point.values.b.toFixed(2)}<br>` +
            `C: ${point.values.c.toFixed(2)}<br>` +
            `D: ${point.values.d.toFixed(2)}<br>` +
            `E: ${point.values.e.toFixed(2)}`
          ),
          hoverinfo: 'text'
        }]}
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