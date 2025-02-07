import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DataGeneratorProvider } from './contexts/DataGeneratorContext';
import GraphContainer from './components/GraphContainer';
import Graph2DContainer from './components/Graph2DContainer';
import UserControls from './components/UserControls';
import User2DControls from './components/User2DControls';
import { AxisSelections } from './types/graph';

import './app.css';

const queryClient = new QueryClient();

export const AppContent = () => {
  const [activeTab, setActiveTab] = useState<'3d' | '2d'>('3d');
  const [axis3D, setAxis3D] = useState<AxisSelections>({
    xAxis: null,
    yAxis: null,
    zAxis: null
  });
  const [axis2D, setAxis2D] = useState<{
    xAxis: string | null;
    yAxis: string | null;
  }>({
    xAxis: null,
    yAxis: null
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('3d')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === '3d' ? '#007bff' : '#f8f9fa',
            color: activeTab === '3d' ? 'white' : 'black',
            border: '1px solid #dee2e6',
            borderRadius: '4px 0 0 4px',
            cursor: 'pointer'
          }}
        >
          3D View
        </button>
        <button
          onClick={() => setActiveTab('2d')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === '2d' ? '#007bff' : '#f8f9fa',
            color: activeTab === '2d' ? 'white' : 'black',
            border: '1px solid #dee2e6',
            borderRadius: '0 4px 4px 0',
            cursor: 'pointer'
          }}
        >
          2D View
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {activeTab === '3d' ? (
          <>
            <GraphContainer axisSelections={axis3D} />
            <UserControls
              axisSelections={axis3D}
              onAxisChange={setAxis3D}
            />
          </>
        ) : (
          <>
            <Graph2DContainer
              xAxis={axis2D.xAxis}
              yAxis={axis2D.yAxis}
            />
            <User2DControls
              xAxis={axis2D.xAxis}
              yAxis={axis2D.yAxis}
              onAxisChange={setAxis2D}
            />
          </>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataGeneratorProvider>
        <AppContent />
      </DataGeneratorProvider>
    </QueryClientProvider>
  );
}

export default App;
