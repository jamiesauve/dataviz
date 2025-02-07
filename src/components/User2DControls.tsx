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
  const { getFeatures, isLoading, reclusterData } = useDataGenerator();
  const features = getFeatures();

  useEffect(() => {
    if (!isLoading && features.length > 0 && !xAxis) {
      onAxisChange({
        xAxis: 'area_msd',
        yAxis: 'bright_avg'
      });
    }
  }, [features, xAxis, onAxisChange, isLoading]);

  const handleRecluster = () => {
    const selectedDimensions = [xAxis, yAxis];
    reclusterData(selectedDimensions);
  };

  const allOptions = features;

  const getAvailableOptions = (currentAxis: 'xAxis' | 'yAxis') => {
    const currentValue = currentAxis === 'xAxis' ? xAxis : yAxis;
    return allOptions.filter(option =>
      option === currentValue ||
      (option !== xAxis && option !== yAxis)
    );
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      width: '300px',
    }}>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="x-axis" style={{ width: '60px' }}>X-axis:</label>
          <select
            id="x-axis"
            value={xAxis || ''}
            onChange={(e) => onAxisChange({ xAxis: e.target.value, yAxis })}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            {getAvailableOptions('xAxis').map(option => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="y-axis" style={{ width: '60px' }}>Y-axis:</label>
          <select
            id="y-axis"
            value={yAxis || ''}
            onChange={(e) => onAxisChange({ xAxis, yAxis: e.target.value })}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            {getAvailableOptions('yAxis').map(option => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleRecluster}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Recluster Points
        </button>
      </form>
    </div>
  );
};

export default User2DControls; 