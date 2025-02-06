import { screen } from '@testing-library/react';
import GraphContainer from '../GraphContainer';
import { defaultAxisSelections } from '../../test-utils/testData';
import { renderWithProviders } from '../../test-utils/TestProviders';

// Create mock data
const mockData = [
  {
    values: {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5
    }
  }
];

// Mock the useDataGenerator hook
jest.mock('../../utils/GenerateData', () => ({
  __esModule: true,
  default: () => ({
    generateNewData: jest.fn(),
    getData: jest.fn(() => mockData)
  })
}));

describe('GraphContainer', () => {
  it('renders plot with correct data based on axis selections', () => {
    renderWithProviders(<GraphContainer axisSelections={defaultAxisSelections} />);

    const plotData = JSON.parse(screen.getByTestId('plot-data').textContent || '');

    expect(plotData[0].x).toEqual([1]); // mockData.values.a
    expect(plotData[0].y).toEqual([2]); // mockData.values.b
    expect(plotData[0].z).toEqual([3]); // mockData.values.c
  });

  it('updates plot when axis selections change', () => {
    const { rerender } = renderWithProviders(
      <GraphContainer axisSelections={defaultAxisSelections} />
    );

    rerender(
      <GraphContainer
        axisSelections={{
          ...defaultAxisSelections,
          xAxis: 'd'
        }}
      />
    );

    const plotData = JSON.parse(screen.getByTestId('plot-data').textContent || '');
    expect(plotData[0].x).toEqual([4]); // mockData.values.d
  });
}); 