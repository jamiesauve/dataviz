import { screen, fireEvent } from '@testing-library/react';
import UserControls from '../UserControls';
import { defaultAxisSelections } from '../../test-utils/testData';
import { useMetadata } from '../../api/hooks/useMetadata';
import { renderWithProviders } from '../../test-utils/TestProviders';

// Mock the useMetadata hook
jest.mock('../../api/hooks/useMetadata');

describe('UserControls', () => {
  const mockOnAxisChange = jest.fn();

  beforeEach(() => {
    mockOnAxisChange.mockClear();
    (useMetadata as jest.Mock).mockReturnValue({
      refetch: jest.fn().mockResolvedValue({ data: { version: '1.0.0' } })
    });
  });

  it('renders all axis selection dropdowns', () => {
    renderWithProviders(
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
    renderWithProviders(
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
    renderWithProviders(
      <UserControls
        axisSelections={defaultAxisSelections}
        onAxisChange={mockOnAxisChange}
      />
    );

    expect(screen.getByLabelText(/x-axis/i)).toHaveValue('a');
    expect(screen.getByLabelText(/y-axis/i)).toHaveValue('b');
    expect(screen.getByLabelText(/z-axis/i)).toHaveValue('c');
  });

  it('handles API test button click', async () => {
    const mockRefetch = jest.fn().mockResolvedValue({ data: { version: '1.0.0' } });
    (useMetadata as jest.Mock).mockReturnValue({ refetch: mockRefetch });

    renderWithProviders(
      <UserControls
        axisSelections={defaultAxisSelections}
        onAxisChange={() => { }}
      />
    );

    const button = screen.getByText(/test api/i);
    await fireEvent.click(button);

    expect(mockRefetch).toHaveBeenCalled();
  });
}); 