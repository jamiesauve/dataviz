import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import useDataGenerator from '../utils/GenerateData';

const GraphContainer: React.FC = () => {
  const { generateNewData, getData } = useDataGenerator();

  // Generate initial data on mount
  useEffect(() => {
    generateNewData();
  }, []);

  const data = getData();

  return (
    <div>
      <Plot
        data={[{
          type: 'scatter3d',
          mode: 'markers',
          x: data.map(point => point.x),
          y: data.map(point => point.y),
          z: data.map(point => point.z),
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
          width: Math.min(1024, window.innerWidth - 40), // 20px padding on each side
          height: Math.min(window.innerHeight * 0.8, (window.innerWidth - 40) * 0.75), // 4:3 aspect ratio capped at 80% of viewport height
          title: '3D Scatter Plot with 5 Variables',
          margin: { t: 50, b: 20, l: 20, r: 20 }, // Reduced margins
          autosize: true
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