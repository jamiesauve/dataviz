import { screen, fireEvent } from '@testing-library/react';
import { AppContent } from '../../app';
import { renderWithProviders } from '../../test-utils/TestProviders';

jest.mock('../../api/hooks/useMetadata', () => ({
  useMetadata: () => ({
    refetch: jest.fn().mockResolvedValue({ data: { version: '1.0.0' } })
  })
}));

describe('App Integration', () => {
  it('renders graph and controls', () => {
    renderWithProviders(<AppContent />);

    expect(screen.getByTestId('mock-plot')).toBeInTheDocument();
    expect(screen.getByLabelText(/x-axis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/y-axis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/z-axis/i)).toBeInTheDocument();
    expect(screen.getByText(/recluster points/i)).toBeInTheDocument();
    expect(screen.getByText(/test api/i)).toBeInTheDocument();
  });

  it('allows changing axis selections', () => {
    renderWithProviders(<AppContent />);

    const xAxisSelect = screen.getByLabelText(/x-axis/i);
    fireEvent.change(xAxisSelect, { target: { value: 'd' } });

    expect(xAxisSelect).toHaveValue('d');
  });
}); 