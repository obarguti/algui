import React from 'react';
import type { Algorithm } from '../../services/algorithmService';
import { AlgorithmTile } from '../AlgorithmTile';
import './AlgorithmGrid.scss';

interface AlgorithmGridProps {
  algorithms: Algorithm[];
  onAlgorithmClick?: (algorithm: Algorithm) => void;
}

export const AlgorithmGrid: React.FC<AlgorithmGridProps> = ({ 
  algorithms, 
  onAlgorithmClick 
}) => {
  return (
    <div className="algorithm-grid">
      {algorithms.map((algorithm) => (
        <AlgorithmTile
          key={algorithm.id}
          algorithm={algorithm}
          onClick={onAlgorithmClick}
        />
      ))}
    </div>
  );
};
