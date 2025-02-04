import { useState } from 'react';

interface Point {
  x: number;
  y: number;
  z: number;
  values: {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
  };
}

const useDataGenerator = () => {
  const [data, setData] = useState<Point[]>([]);

  const generateNewData = () => {
    const newData = Array.from({ length: 50 }, () => {
      const values = {
        a: Math.random() * 10,
        b: Math.random() * 10,
        c: Math.random() * 10,
        d: Math.random() * 10,
        e: Math.random() * 10,
      };

      return {
        x: Math.random() * 10,
        y: Math.random() * 10,
        z: Math.random() * 10,
        values,
      };
    });

    setData(newData);
  };

  const getData = () => data;

  return { generateNewData, getData };
};

export default useDataGenerator; 