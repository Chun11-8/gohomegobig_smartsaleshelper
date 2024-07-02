import java.util.Arrays;

public class KNN {
        private float[][] featureList;  // Load your precomputed feature vectors
        private int k;

        public KNN(float[][] featureList, int k) {
            this.featureList = featureList;
            this.k = k;
        }

        public int[] findNearestNeighbors(float[] feature) {
            double[] distances = new double[featureList.length];
            for (int i = 0; i < featureList.length; i++) {
                distances[i] = euclideanDistance(feature, featureList[i]);
            }

            // Find the indices of the k smallest distances
            int[] nearestIndices = new int[k];
            Arrays.fill(nearestIndices, -1);
            for (int i = 0; i < k; i++) {
                double minDist = Double.MAX_VALUE;
                int minIndex = -1;
                for (int j = 0; j < distances.length; j++) {
                    if (distances[j] < minDist) {
                        minDist = distances[j];
                        minIndex = j;
                    }
                }
                nearestIndices[i] = minIndex;
                distances[minIndex] = Double.MAX_VALUE;
            }

            return nearestIndices;
        }

        private double euclideanDistance(float[] a, float[] b) {
            double sum = 0;
            for (int i = 0; i < a.length; i++) {
                sum += Math.pow(a[i] - b[i], 2);
            }
            return Math.sqrt(sum);
        }

}
