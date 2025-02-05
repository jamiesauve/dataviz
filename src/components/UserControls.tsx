import React from 'react';
import { AxisOption, AxisSelections } from '../types/graph';

interface UserControlsProps {
  axisSelections: AxisSelections;
  onAxisChange: (selections: AxisSelections) => void;
  onShow: () => void;
}

const UserControls: React.FC<UserControlsProps> = ({
  axisSelections,
  onAxisChange,
  onShow
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
      padding: '20px',
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        width: '300px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '60px' }}>X-axis:</label>
          <select
            value={xAxis}
            onChange={(e) => handleAxisChange('xAxis', e.target.value as AxisOption)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">Select X variable</option>
            {getAvailableOptions('xAxis').map(option => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '60px' }}>Y-axis:</label>
          <select
            value={yAxis}
            onChange={(e) => handleAxisChange('yAxis', e.target.value as AxisOption)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">Select Y variable</option>
            {getAvailableOptions('yAxis').map(option => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '60px' }}>Z-axis:</label>
          <select
            value={zAxis}
            onChange={(e) => handleAxisChange('zAxis', e.target.value as AxisOption)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">Select Z variable</option>
            {getAvailableOptions('zAxis').map(option => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={onShow}
          disabled={!xAxis || !yAxis || !zAxis}
          style={{
            backgroundColor: '#475569',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: (!xAxis || !yAxis || !zAxis) ? 'not-allowed' : 'pointer',
            marginTop: '10px',
            opacity: (!xAxis || !yAxis || !zAxis) ? 0.6 : 1
          }}
        >
          Show
        </button>
      </form>
    </div>
  );
};

export default UserControls; 