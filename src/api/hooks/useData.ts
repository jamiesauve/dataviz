import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../client';

export function useData() {
  const query = useQuery({
    queryKey: ['data'],
    queryFn: fetchData
  });

  return query;
} 