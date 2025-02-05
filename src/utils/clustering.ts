interface Point {
  values: {
    [key: string]: number;
  };
}

interface Centroid {
  [key: string]: number;
}

export function kMeans(
  data: Point[],
  k: number = 3,
  maxIterations: number = 100,
  dimensions?: string[]
): number[] {
  // Initialize k centroids randomly from the data points
  const centroids: Centroid[] = data
    .sort(() => 0.5 - Math.random())
    .slice(0, k)
    .map(point => ({ ...point.values }));

  const keys = dimensions || Object.keys(data[0].values);
  let clusters: number[] = new Array(data.length).fill(0);
  let iterations = 0;
  let changed = true;

  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;

    // Assign points to nearest centroid
    data.forEach((point, i) => {
      const distances = centroids.map(centroid =>
        keys.reduce(
          (sum, key) => sum + Math.pow(point.values[key] - centroid[key], 2),
          0
        )
      );
      const nearestCentroid = distances.indexOf(Math.min(...distances));

      if (clusters[i] !== nearestCentroid) {
        clusters[i] = nearestCentroid;
        changed = true;
      }
    });

    // Update centroids
    centroids.forEach((centroid, i) => {
      const clusterPoints = data.filter((_, index) => clusters[index] === i);
      if (clusterPoints.length > 0) {
        Object.keys(centroid).forEach(key => {
          centroid[key] = clusterPoints.reduce((sum, point) => sum + point.values[key], 0) / clusterPoints.length;
        });
      }
    });
  }

  return clusters;
} 