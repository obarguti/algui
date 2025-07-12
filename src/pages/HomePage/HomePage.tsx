import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import { AlgorithmGrid } from '../../components';
import algorithmService from '../../services/algorithmService';
import type { Algorithm } from '../../services/algorithmService';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const algorithms = algorithmService.getAllAlgorithms();

  const handleAlgorithmClick = (algorithm: Algorithm) => {
    navigate(`/algorithm/${algorithm.id}`);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>AlgUI</h1>
        <p className="subtitle">
          Explore algorithm patterns and data structures
        </p>
      </div>
      <div className="algorithms-section">
        <AlgorithmGrid 
          algorithms={algorithms} 
          onAlgorithmClick={handleAlgorithmClick}
        />
      </div>
    </div>
  );
};
