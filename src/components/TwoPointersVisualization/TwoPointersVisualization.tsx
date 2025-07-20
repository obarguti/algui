import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import { ArrayWidget } from '../widgets';
import './TwoPointersVisualization.scss';

type AlgorithmPhase = 'idle' | 'processing' | 'deciding' | 'moving' | 'found' | 'not-found';

interface TwoPointersVisualizationProps {
  className?: string;
}

export const TwoPointersVisualization: React.FC<TwoPointersVisualizationProps> = ({ 
  className = '' 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [arrayInput, setArrayInput] = useState('[1, 3, 6, 8, 11, 14, 19]');
  const [target, setTarget] = useState(17);
  const [array, setArray] = useState([1, 3, 6, 8, 11, 14, 19]);
  const [leftPointer, setLeftPointer] = useState(0);
  const [rightPointer, setRightPointer] = useState(6);
  const [currentSum, setCurrentSum] = useState(0);
  
  // Algorithm state
  const [phase, setPhase] = useState<AlgorithmPhase>('idle');
  const [iteration, setIteration] = useState(0);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [decision, setDecision] = useState<string>('');
  const [nextAction, setNextAction] = useState<string>('');

  // Parse array input
  const parseArrayInput = () => {
    try {
      const parsed = JSON.parse(arrayInput);
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'number')) {
        setArray(parsed);
        setLeftPointer(0);
        setRightPointer(parsed.length - 1);
        return true;
      }
    } catch (e) {
      // Invalid input
    }
    return false;
  };

  // Reset visualization
  const resetVisualization = () => {
    if (parseArrayInput()) {
      setLeftPointer(0);
      setRightPointer(array.length - 1);
      setPhase('idle');
      setIteration(0);
      setIsAutoRunning(false);
      setDecision('');
      setNextAction('');
    }
  };

  // Execute one step of the algorithm
  const executeStep = useCallback(() => {
    if (leftPointer >= rightPointer) {
      setPhase('not-found');
      setDecision('left >= right, target not found');
      setNextAction('Algorithm complete');
      setIsAutoRunning(false);
      return;
    }

    const sum = array[leftPointer] + array[rightPointer];
    
    if (phase === 'idle' || phase === 'moving') {
      // Processing phase
      setPhase('processing');
      setDecision(`Calculate: ${array[leftPointer]} + ${array[rightPointer]} = ${sum}`);
      setNextAction('Comparing with target...');
      return;
    }

    if (phase === 'processing') {
      // Deciding phase
      setPhase('deciding');
      if (sum === target) {
        setDecision(`${sum} = ${target} ✓ Found target!`);
        setNextAction('Solution found');
        setPhase('found');
        setIsAutoRunning(false);
      } else if (sum < target) {
        setDecision(`${sum} < ${target}, need larger sum`);
        setNextAction('Move left pointer right →');
      } else {
        setDecision(`${sum} > ${target}, need smaller sum`);
        setNextAction('Move right pointer left ←');
      }
      return;
    }

    if (phase === 'deciding') {
      // Moving phase
      setPhase('moving');
      if (currentSum < target) {
        setLeftPointer(prev => prev + 1);
      } else if (currentSum > target) {
        setRightPointer(prev => prev - 1);
      }
      setIteration(prev => prev + 1);
      setDecision('');
      setNextAction('');
    }
  }, [array, leftPointer, rightPointer, target, currentSum, phase]);

  // Auto-run functionality
  useEffect(() => {
    if (isAutoRunning && phase !== 'found' && phase !== 'not-found') {
      const timeout = setTimeout(executeStep, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isAutoRunning, phase, executeStep]);

  // Start auto-run
  const startAutoRun = () => {
    if (phase === 'idle') {
      setPhase('processing');
    }
    setIsAutoRunning(true);
  };

  // Stop auto-run
  const stopAutoRun = () => {
    setIsAutoRunning(false);
  };

  // Manual step
  const nextStep = () => {
    if (phase === 'idle') {
      setPhase('processing');
    }
    executeStep();
  };

  // Calculate current sum
  useEffect(() => {
    if (array.length > 0 && leftPointer < array.length && rightPointer < array.length) {
      setCurrentSum(array[leftPointer] + array[rightPointer]);
    }
  }, [array, leftPointer, rightPointer]);

  // D3 visualization
  useEffect(() => {
    if (!svgRef.current || array.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    const width = 800;
    const margin = { top: 40, right: 40, bottom: 60, left: 40 };
    const innerWidth = width - margin.left - margin.right;

    // Calculate dimensions
    const elementWidth = Math.min(60, innerWidth / array.length - 10);
    const elementHeight = 40;
    const spacing = (innerWidth - array.length * elementWidth) / (array.length - 1);

    // Main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Array elements
    const elements = g.selectAll('.array-element')
      .data(array)
      .enter()
      .append('g')
      .attr('class', 'array-element')
      .attr('transform', (_, i) => `translate(${i * (elementWidth + spacing)}, 50)`);

    // Array rectangles
    elements.append('rect')
      .attr('width', elementWidth)
      .attr('height', elementHeight)
      .attr('rx', 4)
      .attr('class', (_, i) => {
        if (i === leftPointer && i === rightPointer) return 'element both-pointers';
        if (i === leftPointer) return 'element left-pointer';
        if (i === rightPointer) return 'element right-pointer';
        return 'element';
      });

    // Array values
    elements.append('text')
      .attr('x', elementWidth / 2)
      .attr('y', elementHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('class', 'element-text')
      .text(d => d);

    // Array indices
    elements.append('text')
      .attr('x', elementWidth / 2)
      .attr('y', elementHeight + 15)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('class', 'index-text')
      .text((_, i) => i);

    // Left pointer
    if (leftPointer < array.length) {
      const leftX = leftPointer * (elementWidth + spacing) + elementWidth / 2;
      g.append('polygon')
        .attr('points', `${leftX - 8},35 ${leftX + 8},35 ${leftX},45`)
        .attr('class', 'pointer left-pointer-arrow');
      
      g.append('text')
        .attr('x', leftX)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('class', 'pointer-label')
        .text('left');
    }

    // Right pointer
    if (rightPointer < array.length && rightPointer !== leftPointer) {
      const rightX = rightPointer * (elementWidth + spacing) + elementWidth / 2;
      g.append('polygon')
        .attr('points', `${rightX - 8},35 ${rightX + 8},35 ${rightX},45`)
        .attr('class', 'pointer right-pointer-arrow');
      
      g.append('text')
        .attr('x', rightX)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('class', 'pointer-label')
        .text('right');
    }

    // Algorithm Structure Visualization
    const algorithmY = 160;
    const whileBoxWidth = innerWidth * 0.8;
    const whileBoxHeight = 120;
    const whileBoxX = (innerWidth - whileBoxWidth) / 2;

    // While loop container
    g.append('rect')
      .attr('x', whileBoxX)
      .attr('y', algorithmY)
      .attr('width', whileBoxWidth)
      .attr('height', whileBoxHeight)
      .attr('rx', 8)
      .attr('class', `while-container ${leftPointer < rightPointer ? 'active' : 'inactive'}`);

    // While loop title
    g.append('text')
      .attr('x', whileBoxX + 10)
      .attr('y', algorithmY + 15)
      .attr('class', 'while-title')
      .text('while (left < right)');

    // Sections within while loop - vertically stacked
    const sectionWidth = whileBoxWidth - 20;
    const section1X = whileBoxX + 10;
    const section2X = whileBoxX + 10;
    const section1Y = algorithmY + 25;
    const section2Y = algorithmY + 70;
    const sectionHeight = 40;

    // Current sum section
    g.append('rect')
      .attr('x', section1X)
      .attr('y', section1Y)
      .attr('width', sectionWidth)
      .attr('height', sectionHeight)
      .attr('rx', 4)
      .attr('class', `algorithm-section ${phase === 'processing' ? 'active' : ''}`);

    g.append('text')
      .attr('x', section1X + 10)
      .attr('y', section1Y + 15)
      .attr('class', 'section-title')
      .text('1. Calculate Sum');

    g.append('text')
      .attr('x', section1X + 10)
      .attr('y', section1Y + 30)
      .attr('class', 'section-value')
      .text(`${array[leftPointer]} + ${array[rightPointer]} = ${currentSum}`);

    // Loop condition section
    g.append('rect')
      .attr('x', section2X)
      .attr('y', section2Y)
      .attr('width', sectionWidth)
      .attr('height', sectionHeight)
      .attr('rx', 4)
      .attr('class', `algorithm-section ${phase === 'deciding' ? 'active' : ''}`);

    g.append('text')
      .attr('x', section2X + 10)
      .attr('y', section2Y + 15)
      .attr('class', 'section-title')
      .text('2. Compare & Decide');

    const comparisonText = currentSum === target ? `${currentSum} = ${target}` : 
                          currentSum < target ? `${currentSum} < ${target}` : 
                          `${currentSum} > ${target}`;
    
    g.append('text')
      .attr('x', section2X + 10)
      .attr('y', section2Y + 30)
      .attr('class', 'section-value')
      .text(comparisonText);

  }, [array, leftPointer, rightPointer, currentSum, target, phase, iteration, decision, nextAction]);

  return (
    <div className={`two-pointers-visualization ${className}`}>
      <div className="controls">
        <div className="input-group">
          <label htmlFor="array-input">Array:</label>
          <input
            id="array-input"
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            placeholder="[1, 3, 6, 8, 11, 14, 19]"
          />
        </div>
        <div className="input-group">
          <label htmlFor="target-input">Target:</label>
          <input
            id="target-input"
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
        </div>
        <button onClick={resetVisualization} className="refresh-btn">
          Reset
        </button>
      </div>
      
      <div className="visualization-container">
        <ArrayWidget
          data={array}
          className="tp-array-widget"
          config={{
            showIndices: true,
            colors: array.map((_, idx) => {
              if (idx === leftPointer && idx === rightPointer) return '#ffd700'; // gold for both
              if (idx === leftPointer) return '#87ceeb'; // blue for left
              if (idx === rightPointer) return '#ff7f7f'; // red for right
              return '';
            }),
            boxWidth: 60,
            boxHeight: 48,
          }}
        />
        <svg
          ref={svgRef}
          width="800"
          height="380"
          className="visualization-svg"
        />
      </div>
      
      <div className="algorithm-controls">
        <div className="step-controls">
          <button 
            onClick={nextStep}
            disabled={phase === 'found' || phase === 'not-found' || isAutoRunning}
            className="step-btn"
          >
            Next Step
          </button>
          <button 
            onClick={startAutoRun}
            disabled={phase === 'found' || phase === 'not-found' || isAutoRunning}
            className="auto-btn"
          >
            Auto Run
          </button>
          <button 
            onClick={stopAutoRun}
            disabled={!isAutoRunning}
            className="stop-btn"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};
