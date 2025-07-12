import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import algorithmService from '../../services/algorithmService';
import { TwoPointersVisualization } from '../../components';
import './AlgorithmDetailPage.scss';

export const AlgorithmDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const algorithm = id ? algorithmService.getAlgorithmById(id) : undefined;

  if (!algorithm) {
    return (
      <div className="algorithm-detail-page">
        <div className="error-container">
          <h1>Algorithm Not Found</h1>
          <p>The algorithm you're looking for doesn't exist.</p>
          <button className="back-button" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="algorithm-detail-page">
      <div className="header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Algorithms
        </button>
      </div>
      
      <div className="content">
        <div className="algorithm-header">
          <div className="category-badge">
            {algorithm.category}
          </div>
          <h1 className="algorithm-title">
            {algorithm.name}
          </h1>
        </div>
        
        <div className="algorithm-details">
          <div className="description-section">
            <h2>Description</h2>
            <p className="description">
              {algorithm.description}
            </p>
          </div>
          
          <div className="metadata-section">
            <h2>Details</h2>
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="label">Category:</span>
                <span className="value">{algorithm.category}</span>
              </div>
              <div className="metadata-item">
                <span className="label">ID:</span>
                <span className="value">{algorithm.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Visualization */}
        {algorithm.id === 'two-pointers-collision' && (
          <div className="visualization-section">
            <h2>Interactive Visualization</h2>
            <TwoPointersVisualization />
          </div>
        )}
      </div>
    </div>
  );
};
