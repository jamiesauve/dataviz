import { useQuery } from '@tanstack/react-query';
import { fetchMetadata } from '../client';

export function useMetadata() {
  return useQuery({
    queryKey: ['metadata'],
    queryFn: fetchMetadata
  });
} 