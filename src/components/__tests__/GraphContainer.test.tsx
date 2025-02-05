import { render, screen } from '@testing-library/react';
import GraphContainer from '../GraphContainer';
import { defaultAxisSelections } from '../../test-utils/testData';

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

// Mock Plotly since it's not compatible with jsdom
jest.mock('react-plotly.js', () => ({
  __esModule: true,
  default: ({ data, layout }: any) => (
    <div data-testid="mock-plot">
      <div data-testid="plot-data">{JSON.stringify(data)}</div>
      <div data-testid="plot-layout">{JSON.stringify(layout)}</div>
    </div>
  )
}));

describe('GraphContainer', () => {
  it('renders plot with correct data based on axis selections', () => {
    render(<GraphContainer axisSelections={defaultAxisSelections} />);

    const plotData = JSON.parse(screen.getByTestId('plot-data').textContent || '');

    expect(plotData[0].x).toEqual([1]); // mockData.values.a
    expect(plotData[0].y).toEqual([2]); // mockData.values.b
    expect(plotData[0].z).toEqual([3]); // mockData.values.c
  });

  it('updates plot when axis selections change', () => {
    const { rerender } = render(
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