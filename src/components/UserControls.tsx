import React, { useEffect } from 'react';
import { AxisOption, AxisSelections } from '../types/graph';
import { useDataGenerator } from '../contexts/DataGeneratorContext';
import { useMetadata } from '../api/hooks/useMetadata';
import { useData } from '../api/hooks/useData';
import './UserControls.css';

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
        xAxis: 'deform',
        yAxis: 'bright_avg',
        zAxis: 'area_um'
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
    const dimensions = [axisSelections.xAxis, axisSelections.yAxis, axisSelections.zAxis]
      .filter((dim): dim is string => dim !== null && dim !== '');
    reclusterData(dimensions);
  };

  return (
    <div className="controls-container">
      <form className="controls-form">
        <div className="axis-control">
          <label htmlFor="x-axis" className="axis-label">X-axis:</label>
          <select
            id="x-axis"
            value={axisSelections.xAxis || ''}
            onChange={(e) => onAxisChange({ ...axisSelections, xAxis: e.target.value || null })}
            className="axis-select"
          >
            <option value="">Select X Axis</option>
            {features.map(feature => (
              <option key={feature} value={feature}>
                {feature.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="axis-control">
          <label htmlFor="y-axis" className="axis-label">Y-axis:</label>
          <select
            id="y-axis"
            value={axisSelections.yAxis || ''}
            onChange={(e) => onAxisChange({ ...axisSelections, yAxis: e.target.value || null })}
            className="axis-select"
          >
            <option value="">Select Y Axis</option>
            {features.map(feature => (
              <option key={feature} value={feature}>
                {feature.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="axis-control">
          <label htmlFor="z-axis" className="axis-label">Z-axis:</label>
          <select
            id="z-axis"
            value={axisSelections.zAxis || ''}
            onChange={(e) => onAxisChange({ ...axisSelections, zAxis: e.target.value || null })}
            className="axis-select"
          >
            <option value="">Select Z Axis</option>
            {features.map(feature => (
              <option key={feature} value={feature}>
                {feature.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleRecluster}
          className="recluster-button"
          disabled={!axisSelections.xAxis || !axisSelections.yAxis || !axisSelections.zAxis}
        >
          Recluster Points
        </button>

        <button
          type="button"
          onClick={async () => {
            const result = await refetchMetadata();
            console.log('Metadata result:', result.data);
          }}
          className="api-test-button"
        >
          Test Metadata API
        </button>

        <button
          type="button"
          onClick={async () => {
            const result = await refetchData();
            console.log('Data result:', result.data);
          }}
          className="api-test-button"
        >
          Test Data API
        </button>
      </form>
    </div>
  );
};

export default UserControls; 