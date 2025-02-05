import { AxisOption, AxisSelections } from '../types/graph';

const generateMockData = (value: number) =>
  Array.from({ length: 500 }, () => value);

export const mockAxisData = {
  a: generateMockData(5),
  b: generateMockData(5),
  c: generateMockData(5),
  d: generateMockData(5)
};

export const defaultAxisSelections: AxisSelections = {
  xAxis: 'a' as AxisOption,
  yAxis: 'b' as AxisOption,
  zAxis: 'c' as AxisOption
}; 