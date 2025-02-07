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
  const normalizationStats = dimensions.map(dim => {
    const values = data.map(d => d[dim] as number);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max };
  });

  // Extract and normalize the values we want to cluster
  const points = data.map(d =>
    dimensions.map((dim, i) => {
      const val = d[dim] as number;
      const { min, max } = normalizationStats[i];
      return (val - min) / (max - min || 1);
    })
  );

  // Initialize centroids using data statistics
  let centroids: number[][] = [];

  // Calculate statistics for centroid initialization
  const centroidStats = points.map((_, dimIndex) => {
    const values = points.map(p => p[dimIndex]);
    const sorted = values.sort((a, b) => a - b);
    return {
      min: sorted[0],
      max: sorted[sorted.length - 1],
      median: sorted[Math.floor(sorted.length / 2)]
    };
  });

  // Initialize centroids with controlled spacing
  for (let i = 0; i < k; i++) {
    const centroid = dimensions.map((_, dimIndex) => {
      const { min, max } = centroidStats[dimIndex];
      const range = max - min;

      // Create an offset that depends on both cluster index and dimension
      const phase = (dimIndex + 1) / dimensions.length;
      const position = (i + phase) / k;

      // Use sigmoid distribution for non-linear spacing
      const sigmoid = 1 / (1 + Math.exp(-6 * (position - 0.5)));
      const value = min + range * sigmoid;

      // Add tiny deterministic variation
      const variation = 0.05 * range * Math.cos(Math.PI * position * (dimIndex + 1));

      return value + variation;
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
    value: centroid[0]
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
    const probabilities = Object.values(CELL_TYPES).map((cellType) => {
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