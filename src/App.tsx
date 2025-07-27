import React, { useEffect, useState } from 'react';
import './App.css';
import HeatMap from './components/HeatMap';
import ControlPanel from './components/ControlPanel';
import { useSimulationStore } from './store/SimulationStore';

function App() {
  const { initializeSimulation, addHeatSource } = useSimulationStore();
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  // Initialize simulation on component mount
  useEffect(() => {
    const defaultConfig = {
      gridSize: 50,
      timeStep: 0.1,
      initialTemperature: 293.15, // 20°C
      selectedMaterial: 'copper' as const
    };
    initializeSimulation(defaultConfig);
  }, [initializeSimulation]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('app-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        const maxSize = Math.min(rect.width - 350, rect.height - 100); // Account for control panel
        setDimensions({
          width: Math.max(400, maxSize),
          height: Math.max(400, maxSize)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddHeatSource = (x: number, y: number, power: number) => {
    addHeatSource({
      x,
      y,
      power,
      temperature: 373.15 // 100°C for heat sources
    });
  };

  return (
    <div className="App" id="app-container">
      <header className="App-header">
        <h1>🔥 ThermaSim - Thermal Diffusion Simulator</h1>
        <p>Interactive 2D heat diffusion simulation with realistic thermal physics</p>
      </header>
      
      <main className="App-main">
        <div className="simulation-container">
          <div className="heatmap-section">
            <HeatMap
              width={dimensions.width}
              height={dimensions.height}
              onCellClick={(x, y) => handleAddHeatSource(x, y, 100)}
            />
          </div>
          
          <div className="control-section">
            <ControlPanel onAddHeatSource={handleAddHeatSource} />
          </div>
        </div>
      </main>
      
      <footer className="App-footer">
        <p>
          Built with React, TypeScript, and Konva.js | 
          <a href="https://github.com/yourusername/thermasim" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
