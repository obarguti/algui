import React from 'react';
import type { Algorithm } from '../../services/algorithmService';
import './AlgorithmTile.scss';

interface AlgorithmTileProps {
  algorithm: Algorithm;
  onClick?: (algorithm: Algorithm) => void;
}

export const AlgorithmTile: React.FC<AlgorithmTileProps> = ({ algorithm, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(algorithm);
    }
  };

  return (
    <div 
      className="algorithm-tile" 
      onClick={handleClick}
      title={algorithm.description}
    >
      <div className="algorithm-tile__thumbnail">
        <div className="algorithm-tile__category-badge">
          {algorithm.category}
        </div>
      </div>
      <div className="algorithm-tile__name">
        {algorithm.name}
      </div>
    </div>
  );
};
