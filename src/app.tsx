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

import './app.css';
import './styles/variables.css';

const queryClient = new QueryClient();

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'3d' | '2d'>('3d');
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
      <div className="tab-section">
        <button
          onClick={() => setActiveTab('3d')}
          className={`tab-button ${activeTab === '3d' ? 'tab-button-active' : ''}`}
        >
          3D View
        </button>
        <button
          onClick={() => setActiveTab('2d')}
          className={`tab-button ${activeTab === '2d' ? 'tab-button-active' : ''}`}
        >
          2D View
        </button>
      </div>

      <div className="main-content">
        <div className="plot-controls-container">
          <div className="plot-controls-layout">
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

        <hr className="divider" />

        <div className="stats-section">
          <div className="stats-container">
            {stats.map((stat: ClusterStat, index: number) => (
              <div
                key={stat.name}
                className={`stat-item stat-item-${index}`}
              >
                <div className={`stat-label stat-label-${index}`}>
                  {stat.name}
                </div>
                <div className="stat-value">{stat.count}</div>
                <div className="stat-percentage">{stat.percentage}%</div>
              </div>
            ))}
          </div>
          <CellTypePieChart />
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
