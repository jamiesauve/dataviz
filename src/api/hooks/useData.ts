import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../client';

export function useData() {
  return useQuery({
    queryKey: ['data'],
    queryFn: fetchData
  });
} 