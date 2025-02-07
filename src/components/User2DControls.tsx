import React, { useEffect } from 'react';
import { useDataGenerator } from '../contexts/DataGeneratorContext';

interface User2DControlsProps {
  xAxis: string | null;
  yAxis: string | null;
  onAxisChange: (selections: { xAxis: string | null; yAxis: string | null }) => void;
}

const User2DControls: React.FC<User2DControlsProps> = ({
  xAxis,
  yAxis,
  onAxisChange,
}) => {
  const { getFeatures, isLoading } = useDataGenerator();
  const features = getFeatures();

  useEffect(() => {
    if (!isLoading && features.length > 0 && !xAxis && !yAxis) {
      onAxisChange({
        xAxis: 'deform',
        yAxis: 'area_um'
      });
    }
  }, [features, xAxis, yAxis, onAxisChange, isLoading]);

  const allOptions = features;

  const getAvailableOptions = (currentAxis: 'xAxis' | 'yAxis') => {
    const currentValue = currentAxis === 'xAxis' ? xAxis : yAxis;
    return allOptions.filter(option =>
      option === currentValue ||
      (option !== xAxis && option !== yAxis)
    );
  };

  return (
    <div className="controls-container">
      <form className="controls-form">
        <div className="axis-control">
          <label htmlFor="x-axis" className="axis-label">X-axis:</label>
          <select
            id="x-axis"
            value={xAxis || ''}
            onChange={(e) => onAxisChange({ xAxis: e.target.value || null, yAxis })}
            className="axis-select"
          >
            <option value="">Select X Axis</option>
            {getAvailableOptions('xAxis').map(option => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="axis-control">
          <label htmlFor="y-axis" className="axis-label">Y-axis:</label>
          <select
            id="y-axis"
            value={yAxis || ''}
            onChange={(e) => onAxisChange({ xAxis, yAxis: e.target.value || null })}
            className="axis-select"
          >
            <option value="">Select Y Axis</option>
            {getAvailableOptions('yAxis').map(option => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default User2DControls; 