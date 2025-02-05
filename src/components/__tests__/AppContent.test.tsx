import { render, screen } from '@testing-library/react';
import { AppContent } from '../../app';

// Mock child components
jest.mock('../GraphContainer', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-graph">Graph Container</div>
}));

jest.mock('../UserControls', () => ({
  __esModule: true,
  default: ({ axisSelections }: any) => (
    <div data-testid="mock-controls">
      User Controls
      <div data-testid="axis-values">{JSON.stringify(axisSelections)}</div>
    </div>
  )
}));

describe('AppContent', () => {
  it('renders both graph and controls components', () => {
    render(<AppContent />);

    expect(screen.getByTestId('mock-graph')).toBeInTheDocument();
    expect(screen.getByTestId('mock-controls')).toBeInTheDocument();
  });

  it('initializes with default axis selections', () => {
    render(<AppContent />);

    const axisValues = screen.getByTestId('axis-values');
    expect(JSON.parse(axisValues.textContent || '')).toEqual({
      xAxis: 'a',
      yAxis: 'b',
      zAxis: 'c'
    });
  });
}); 