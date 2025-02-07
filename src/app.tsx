import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DataGeneratorProvider } from './contexts/DataGeneratorContext';
import GraphContainer from './components/GraphContainer';
import Graph2DContainer from './components/Graph2DContainer';
import UserControls from './components/UserControls';
import User2DControls from './components/User2DControls';
import { AxisSelections } from './types/graph';
import CellTypePieChart from './components/CellTypePieChart';
import { useClusterStats } from './hooks/useClusterStats';
import { ClusterStat } from './types/stats';
import CellTypeStats from './components/CellTypeStats';

import './app.css';
import './styles/variables.css';

const queryClient = new QueryClient();

export const AppContent: React.FC = () => {
  const [axis3D, setAxis3D] = useState<AxisSelections>({
    xAxis: '',
    yAxis: '',
    zAxis: ''
  });
  const [axis2D, setAxis2D] = useState<{
    xAxis: string | null;
    yAxis: string | null;
  }>({
    xAxis: null as string | null,
    yAxis: null as string | null
  });

  const stats = useClusterStats();

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="stats-section">
          <CellTypePieChart />
          <CellTypeStats stats={stats} />
        </div>

        <hr className="divider" />

        <div className="plot-controls-container">
          <div className="plot-controls-layout">
            <div>
              <GraphContainer axisSelections={axis3D} />
              <UserControls
                axisSelections={axis3D}
                onAxisChange={setAxis3D}
              />
            </div>
            <div>
              <Graph2DContainer
                xAxis={axis2D.xAxis}
                yAxis={axis2D.yAxis}
              />
              <User2DControls
                xAxis={axis2D.xAxis}
                yAxis={axis2D.yAxis}
                onAxisChange={setAxis2D}
              />
            </div>
          </div>
        </div>
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
