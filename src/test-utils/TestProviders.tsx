import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DataGeneratorProvider } from '../contexts/DataGeneratorContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

export const TestProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <DataGeneratorProvider>
      {children}
    </DataGeneratorProvider>
  </QueryClientProvider>
);

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: TestProviders });
}; 