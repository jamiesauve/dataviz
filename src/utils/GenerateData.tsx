import { useCallback, useState } from 'react';
import { kMeans } from './clustering';

interface DataPoint {
  values: {
    [key: string]: number;
  };
  cluster?: number;
}

interface GenerateDataProps {
  dimensions?: string[];
}

const useDataGenerator = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  const generateNewData = useCallback((props?: GenerateDataProps) => {
    const newData: DataPoint[] = Array.from({ length: 500 }, () => ({
      values: {
        a: Math.random() * 10,
        b: Math.random() * 10,
        c: Math.random() * 10,
        d: Math.random() * 10,
        e: Math.random() * 10
      }
    }));

    // Apply clustering using only selected dimensions
    const clusters = kMeans(newData, 5, 150, props?.dimensions);
    newData.forEach((point, i) => {
      point.cluster = clusters[i];
    });

    setData(newData);
  }, []);

  const reclusterData = useCallback((dimensions: string[]) => {
    if (data.length === 0) return;

    const clusters = kMeans(data, 5, 150, dimensions);
    setData(data.map((point, i) => ({
      ...point,
      cluster: clusters[i]
    })));
  }, [data]);

  const getData = () => data;

  return { generateNewData, getData, reclusterData };
};

export default useDataGenerator; 