import React, { createContext, useContext, useState, useEffect } from 'react';
import { useData } from '../api/hooks/useData';
import { kMeans } from '../utils/clustering';

interface DataPoint {
  [key: string]: number | undefined;
  cluster?: number;
}

interface DataGeneratorContextType {
  getData: () => DataPoint[];
  getFeatures: () => string[];
  reclusterData: (dimensions: string[]) => void;
  isLoading: boolean;
}

const DataGeneratorContext = createContext<DataGeneratorContextType | null>(null);

export const DataGeneratorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const { data, isLoading } = useData();

  useEffect(() => {
    if (data?.data && data?.features) {
      setDataPoints(data.data as DataPoint[]);
      setFeatures(data.features);

      // Run initial clustering on the first three features
      const initialDimensions = ['area_msd', 'bright_avg', 'deform'];
      const clusters = kMeans(data.data as DataPoint[], 6, 10, initialDimensions);
      setDataPoints((data.data as DataPoint[]).map((point, i) => ({
        ...point,
        cluster: clusters[i]
      })));
    }
  }, [data]);

  const getData = () => {
    return dataPoints;
  };

  const getFeatures = () => {
    return features;
  };

  const reclusterData = (dimensions: string[]) => {
    if (dataPoints.length === 0 || dimensions.some(d => !d)) return;

    // Create a copy of dataPoints without the cluster property for k-means
    const pointsForClustering = dataPoints.map(point => {
      const { cluster, ...rest } = point;
      return rest;
    });

    const clusters = kMeans(pointsForClustering, 6, 10, dimensions);
    setDataPoints(dataPoints.map((point, i) => ({
      ...point,
      cluster: clusters[i]
    })));
  };

  return (
    <DataGeneratorContext.Provider value={{ getData, getFeatures, reclusterData, isLoading }}>
      {children}
    </DataGeneratorContext.Provider>
  );
};

export const useDataGenerator = () => {
  const context = useContext(DataGeneratorContext);
  if (!context) {
    throw new Error('useDataGenerator must be used within a DataGeneratorProvider');
  }
  return context;
}; 