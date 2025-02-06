interface DataPoint {
  [key: string]: number | undefined;
}

export function kMeans(
  data: DataPoint[],
  k: number = 5,
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
      return (val - min) / (max - min || 1); // Normalize to [0,1]
    })
  );

  // Initialize centroids using k-means++ initialization
  let centroids = [points[Math.floor(Math.random() * points.length)]];

  while (centroids.length < k) {
    const distances = points.map(point => {
      const minDist = Math.min(...centroids.map(c => euclideanDistance(point, c)));
      return minDist * minDist; // Square the distance
    });

    const sum = distances.reduce((a, b) => a + b, 0);
    const probs = distances.map(d => d / sum);

    let r = Math.random();
    let i = 0;
    while (r > 0 && i < probs.length) {
      r -= probs[i];
      i++;
    }
    centroids.push([...points[i - 1]]);
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

  return assignments;
}

function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(
    a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
  );
} 