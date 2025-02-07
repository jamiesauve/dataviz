import React from 'react';
import { ClusterStat } from '../types/stats';
import './CellTypeStats.css';

interface CellTypeStatsProps {
  stats: ClusterStat[];
}

const CellTypeStats: React.FC<CellTypeStatsProps> = ({ stats }) => {
  return (
    <div className="cell-type-stats">
      {stats.map((stat: ClusterStat, index: number) => (
        <div
          key={stat.name}
          className={`stat-item stat-item-${index}`}
        >
          <div className={`stat-label stat-label-${index}`}>
            {stat.name}
          </div>
          <div className="stat-count">
            <div className="stat-value">{stat.count}</div>
            <div className="stat-total">total</div>
          </div>
          <div className="stat-percentage">{stat.percentage}%</div>
        </div>
      ))}
    </div>
  );
};

export default CellTypeStats; 