import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import useDataGenerator from '../utils/GenerateData';
import { AxisSelections } from '../types/graph';

interface GraphContainerProps {
  axisSelections: AxisSelections;
  showPlot: boolean;
}

const GraphContainer: React.FC<GraphContainerProps> = ({
  axisSelections,
  showPlot
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
          x: showPlot ? getAxisData('xAxis') : data.map(point => point.x),
          y: showPlot ? getAxisData('yAxis') : data.map(point => point.y),
          z: showPlot ? getAxisData('zAxis') : data.map(point => point.z),
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
          width: Math.min(800, window.innerWidth - 380), // Adjusted to account for UserControls
          height: Math.min(window.innerHeight - 40, (window.innerWidth - 380) * 0.75),
          title: showPlot ? `3D Plot (${xAxis?.toUpperCase() || 'X'} vs ${yAxis?.toUpperCase() || 'Y'} vs ${zAxis?.toUpperCase() || 'Z'})` : '3D Scatter Plot',
          margin: { t: 50, b: 20, l: 20, r: 20 },
          autosize: true,
          scene: {
            xaxis: {
              title: {
                text: showPlot ? xAxis?.toUpperCase() || 'X' : 'X',
                font: {
                  size: 12,
                  color: '#7f7f7f'
                }
              }
            },
            yaxis: {
              title: {
                text: showPlot ? yAxis?.toUpperCase() || 'Y' : 'Y',
                font: {
                  size: 12,
                  color: '#7f7f7f'
                }
              }
            },
            zaxis: {
              title: {
                text: showPlot ? zAxis?.toUpperCase() || 'Z' : 'Z',
                font: {
                  size: 12,
                  color: '#7f7f7f'
                }
              }
            }
          }
        }}
        style={{
          margin: '0 auto', // Center horizontally
          display: 'block'  // Ensures margin auto works
        }}
      />
    </div>
  );
}

export default GraphContainer; 