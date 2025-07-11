import React from 'react';
import './HomePage.scss';
import { Button } from '../../components';

export const HomePage: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="logo-container">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/react.svg" className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>AlgUI</h1>
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)} variant="primary">
            count is {count}
          </Button>
          <Button onClick={() => setCount(0)} variant="secondary" size="small">
            Reset
          </Button>
          <p>
            Edit <code>src/pages/HomePage/HomePage.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Welcome to AlgUI - A React TypeScript application with SASS
        </p>
      </div>
    </div>
  );
};
