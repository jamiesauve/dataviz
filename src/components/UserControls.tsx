import React from 'react';
import { AxisOption, AxisSelections } from '../types/graph';

interface UserControlsProps {
  axisSelections: AxisSelections;
  onAxisChange: (selections: AxisSelections) => void;
}

const UserControls: React.FC<UserControlsProps> = ({
  axisSelections,
  onAxisChange,
}) => {
  const { xAxis, yAxis, zAxis } = axisSelections;

  const allOptions: AxisOption[] = ['a', 'b', 'c', 'd', 'e'];

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
      </form>
    </div>
  );
};

export default UserControls; 