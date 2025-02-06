import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../client';

export function useData() {
  const query = useQuery({
    queryKey: ['data'],
    queryFn: fetchData
  });
  console.log('useData hook result:', { data: query.data, isLoading: query.isLoading });
  return query;
} 