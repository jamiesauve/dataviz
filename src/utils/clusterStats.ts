import { useDataGenerator } from '../contexts/DataGeneratorContext';
import { CELL_TYPE_NAMES } from './cellTypes';

export const getClusterStats = () => {
  const { getData } = useDataGenerator();
  const data = getData();

  const total = data.length;
  return CELL_TYPE_NAMES.map((name, index) => {
    const count = data.filter(d => d.cluster === index).length;
    const percentage = ((count / total) * 100).toFixed(1);
    return { name, count, percentage };
  });
}; 