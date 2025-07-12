import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, AlgorithmDetailPage } from './pages';
import './App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/algorithm/:id" element={<AlgorithmDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
