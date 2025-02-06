import React, { useEffect } from 'react';
import { AxisOption, AxisSelections } from '../types/graph';
import { useDataGenerator } from '../contexts/DataGeneratorContext';
import { useMetadata } from '../api/hooks/useMetadata';
import { useData } from '../api/hooks/useData';

interface UserControlsProps {
  axisSelections: AxisSelections;
  onAxisChange: (selections: AxisSelections) => void;
}

const UserControls: React.FC<UserControlsProps> = ({
  axisSelections,
  onAxisChange,
}) => {
  const { reclusterData, getFeatures, isLoading } = useDataGenerator();
  const { refetch: refetchMetadata } = useMetadata();
  const { refetch: refetchData } = useData();
  const features = getFeatures();

  // Initialize axis selections when features are available
  useEffect(() => {
    if (!isLoading && features.length > 0 && !axisSelections.xAxis) {
      onAxisChange({
        xAxis: features[0],
        yAxis: features[1] || features[0],
        zAxis: features[2] || features[0]
      });
    }
  }, [features, axisSelections.xAxis, onAxisChange, isLoading]);

  const allOptions = features;

  const { xAxis, yAxis, zAxis } = axisSelections;

  const getAvailableOptions = (currentAxis: 'xAxis' | 'yAxis' | 'zAxis') => {
    const currentValue = axisSelections[currentAxis];
    return allOptions.filter(option =>
      option === currentValue || // Always include the current selection
      (option !== xAxis && option !== yAxis && option !== zAxis) // Include unselected options
    );
  };

  const handleAxisChange = (axis: keyof AxisSelections, value: AxisOption | '') => {
    onAxisChange({
      ...axisSelections,
      [axis]: value
    });
  };

  const handleRecluster = () => {
    const selectedDimensions = [xAxis, yAxis, zAxis];
    reclusterData(selectedDimensions);
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
            value={xAxis}
            onChange={(e) => handleAxisChange('xAxis', e.target.value as AxisOption)}
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
            value={yAxis}
            onChange={(e) => handleAxisChange('yAxis', e.target.value as AxisOption)}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="z-axis" style={{ width: '60px' }}>Z-axis:</label>
          <select
            id="z-axis"
            value={zAxis}
            onChange={(e) => handleAxisChange('zAxis', e.target.value as AxisOption)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            {getAvailableOptions('zAxis').map(option => (
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

        <button
          type="button"
          onClick={async () => {
            const result = await refetchMetadata();
            console.log('Metadata result:', result.data);
          }}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Test Metadata API
        </button>

        <button
          type="button"
          onClick={async () => {
            const result = await refetchData();
            console.log('Data result:', result.data);
          }}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Test Data API
        </button>
      </form>
    </div>
  );
};

export default UserControls; 