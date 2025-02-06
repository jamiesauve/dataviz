import { CELL_TYPES } from './cellTypes';

interface DataPoint {
  [key: string]: number | undefined;
}

export function kMeans(
  data: DataPoint[],
  k: number = 6,
  iterations: number = 10,
  dimensions: string[]
): number[] {
  // Normalize the data for each dimension
  const dimensionStats = dimensions.map(dim => {
    const values = data.map(d => d[dim] as number);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max };
  });

  // Extract and normalize the values we want to cluster
  const points = data.map(d =>
    dimensions.map((dim, i) => {
      const val = d[dim] as number;
      const { min, max } = dimensionStats[i];
      return (val - min) / (max - min || 1);
    })
  );

  // Initialize centroids deterministically
  let centroids: number[][] = [];
  for (let i = 0; i < k; i++) {
    const centroid = dimensions.map((_, dimIndex) => {
      // Spread centroids evenly across the normalized space
      // Add some offset based on other dimensions to make them unique
      const baseValue = (i + 1) / (k + 1);
      const offset = dimIndex * 0.1;
      return (baseValue + offset) % 1;
    });
    centroids.push(centroid);
  }

  // Assign points to clusters
  const assignments = new Array(points.length).fill(0);

  // Run k-means for specified number of iterations
  for (let iter = 0; iter < iterations; iter++) {
    // Assign points to nearest centroid
    points.forEach((point, i) => {
      let minDist = Infinity;
      let cluster = 0;

      centroids.forEach((centroid, j) => {
        const dist = euclideanDistance(point, centroid);
        if (dist < minDist) {
          minDist = dist;
          cluster = j;
        }
      });

      assignments[i] = cluster;
    });

    // Update centroids
    const newCentroids = Array.from({ length: k }, () =>
      new Array(dimensions.length).fill(0)
    );
    const counts = new Array(k).fill(0);

    points.forEach((point, i) => {
      const cluster = assignments[i];
      counts[cluster]++;
      point.forEach((val, dim) => {
        newCentroids[cluster][dim] += val;
      });
    });

    centroids = newCentroids.map((centroid, i) =>
      centroid.map(sum => sum / (counts[i] || 1))
    );
  }

  // Sort clusters by their first dimension average
  const clusterStats = centroids.map((centroid, index) => ({
    index,
    value: centroid[0]  // Use first dimension (typically area_msd) for sorting
  }));

  clusterStats.sort((a, b) => b.value - a.value);

  const clusterMapping = Object.fromEntries(
    clusterStats.map((c, i) => [c.index, i])
  );

  return assignments.map(cluster => clusterMapping[cluster]);
}

function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(
    a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
  );
}

function gaussianProbability(value: number, mean: number, stdDev: number): number {
  const exponent = -Math.pow(value - mean, 2) / (2 * Math.pow(stdDev, 2));
  return Math.exp(exponent) / (stdDev * Math.sqrt(2 * Math.PI));
}

export function assignCellTypes(
  data: DataPoint[],
  dimensions: string[]
): number[] {
  return data.map(point => {
    // Calculate probability of point belonging to each cell type
    const probabilities = Object.values(CELL_TYPES).map((cellType, index) => {
      // Multiply probabilities from each dimension
      const dimensionProbabilities = dimensions.map(dim => {
        const characteristic = cellType.characteristics[dim];
        if (!characteristic) return 1; // Skip if no characteristic data

        return gaussianProbability(
          point[dim] as number,
          characteristic.mean,
          characteristic.stdDev
        );
      });

      // Combine dimension probabilities and natural frequency
      return dimensionProbabilities.reduce((a, b) => a * b, 1) * cellType.naturalFrequency;
    });

    // Return index of highest probability
    return probabilities.indexOf(Math.max(...probabilities));
  });
}

function getClusterCharacteristic(points: number[][], dimensions: string[]): number {
  // Calculate average values for each dimension
  const dimensionAverages = points[0].map((_, dimIndex) => {
    const values = points.map(p => p[dimIndex]);
    return values.reduce((a, b) => a + b, 0) / values.length;
  });

  // Weight the dimensions differently to create a unique signature
  // area_msd gets highest weight, then deform, then brightness
  const weights = [1.0, 0.5, 0.3];

  // Combine the weighted averages
  return dimensionAverages.reduce((sum, avg, i) =>
    sum + avg * (weights[i] || 0.1), 0);
} 