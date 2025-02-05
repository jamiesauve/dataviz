import { render, screen, fireEvent } from '@testing-library/react';
import UserControls from '../UserControls';
import { defaultAxisSelections } from '../../test-utils/testData';

describe('UserControls', () => {
  const mockOnAxisChange = jest.fn();

  beforeEach(() => {
    mockOnAxisChange.mockClear();
  });

  it('renders all axis selection dropdowns', () => {
    render(
      <UserControls
        axisSelections={defaultAxisSelections}
        onAxisChange={mockOnAxisChange}
      />
    );

    expect(screen.getByLabelText(/x-axis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/y-axis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/z-axis/i)).toBeInTheDocument();
  });

  it('calls onAxisChange when selection changes', () => {
    render(
      <UserControls
        axisSelections={defaultAxisSelections}
        onAxisChange={mockOnAxisChange}
      />
    );

    fireEvent.change(screen.getByLabelText(/x-axis/i), {
      target: { value: 'd' }
    });

    expect(mockOnAxisChange).toHaveBeenCalledWith({
      ...defaultAxisSelections,
      xAxis: 'd'
    });
  });

  it('displays current axis selections', () => {
    render(
      <UserControls
        axisSelections={defaultAxisSelections}
        onAxisChange={mockOnAxisChange}
      />
    );

    expect(screen.getByLabelText(/x-axis/i)).toHaveValue('a');
    expect(screen.getByLabelText(/y-axis/i)).toHaveValue('b');
    expect(screen.getByLabelText(/z-axis/i)).toHaveValue('c');
  });
}); 