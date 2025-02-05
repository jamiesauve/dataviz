import React, { createContext, useContext, ReactNode } from 'react';
import useDataGeneratorHook from '../utils/GenerateData';

interface DataGeneratorContextType {
  generateNewData: (props?: { dimensions?: string[] }) => void;
  getData: () => Array<{
    values: { [key: string]: number };
    cluster?: number;
  }>;
  reclusterData: (dimensions: string[]) => void;
}

const DataGeneratorContext = createContext<DataGeneratorContextType | null>(null);

export const DataGeneratorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dataGenerator = useDataGeneratorHook();

  return (
    <DataGeneratorContext.Provider value={dataGenerator}>
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