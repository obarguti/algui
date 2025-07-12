import algorithmsData from '../data/algorithms.json';

export interface Algorithm {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface AlgorithmsData {
  algorithms: Algorithm[];
}

class AlgorithmService {
  private data: AlgorithmsData = algorithmsData;

  /**
   * Get all algorithms
   * @returns Array of all algorithms
   */
  getAllAlgorithms(): Algorithm[] {
    return this.data.algorithms;
  }

  /**
   * Get a single algorithm by ID
   * @param id - The algorithm ID to search for
   * @returns The algorithm if found, undefined otherwise
   */
  getAlgorithmById(id: string): Algorithm | undefined {
    return this.data.algorithms.find(algorithm => algorithm.id === id);
  }
}

// Export a singleton instance
export const algorithmService = new AlgorithmService();
export default algorithmService;
