import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMetadata } from '../useMetadata';
import { fetchMetadata } from '../../client';

// Mock the API client
jest.mock('../../client');
const mockFetchMetadata = fetchMetadata as jest.MockedFunction<typeof fetchMetadata>;

// Create a wrapper with React Query provider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useMetadata', () => {
  beforeEach(() => {
    mockFetchMetadata.mockClear();
  });

  it('fetches metadata successfully', async () => {
    const mockData = { version: '1.0.0' };
    mockFetchMetadata.mockResolvedValue(mockData);

    const { result } = renderHook(() => useMetadata(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it('handles error state', async () => {
    const error = new Error('Failed to fetch');
    mockFetchMetadata.mockRejectedValue(error);

    const { result } = renderHook(() => useMetadata(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
}); 