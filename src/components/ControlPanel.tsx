import React, { useState } from 'react';
import { useSimulationStore } from '../store/SimulationStore';
import { MaterialType } from '../types/SimulationTypes';
import { MATERIAL_NAMES, MATERIAL_PROPERTIES } from '../constants/Materials';

interface ControlPanelProps {
  onAddHeatSource?: (x: number, y: number, power: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onAddHeatSource }) => {
  const {
    config,
    time,
    isRunning,
    startSimulation,
    stopSimulation,
    resetSimulation,
    stepSimulation,
    setGridSize,
    setTimeStep,
    setInitialTemperature,
    setMaterial
  } = useSimulationStore();

  const [heatSourcePower, setHeatSourcePower] = useState(100);
  const [selectedGridX, setSelectedGridX] = useState(25);
  const [selectedGridY, setSelectedGridY] = useState(25);

  const handleMaterialChange = (material: MaterialType) => {
    setMaterial(material);
  };

  const handleAddHeatSource = () => {
    if (onAddHeatSource) {
      onAddHeatSource(selectedGridX, selectedGridY, heatSourcePower);
    }
  };

  const formatTemperature = (kelvin: number): string => {
    const celsius = kelvin - 273.15;
    return `${celsius.toFixed(1)}°C`;
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds.toFixed(1)}s`;
    } else if (seconds < 3600) {
      return `${(seconds / 60).toFixed(1)}m`;
    } else {
      return `${(seconds / 3600).toFixed(1)}h`;
    }
  };

  return (
    <div style={{
      padding: '20px',
      background: '#f5f5f5',
      borderRadius: '8px',
      border: '1px solid #ddd',
      minWidth: '300px'
    }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>ThermaSim Controls</h2>
      
      {/* Simulation Status */}
      <div style={{ 
        padding: '10px', 
        background: isRunning ? '#d4edda' : '#f8d7da', 
        borderRadius: '4px',
        marginBottom: '20px',
        border: `1px solid ${isRunning ? '#c3e6cb' : '#f5c6cb'}`
      }}>
        <strong>Status:</strong> {isRunning ? 'Running' : 'Stopped'}<br />
        <strong>Time:</strong> {formatTime(time)}<br />
        <strong>Grid:</strong> {config.gridSize}×{config.gridSize}
      </div>

      {/* Material Selection */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Material</h3>
        <select
          value={config.selectedMaterial}
          onChange={(e) => handleMaterialChange(e.target.value as MaterialType)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        >
          {Object.entries(MATERIAL_NAMES).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
        
        {/* Material Properties Display */}
        {config.selectedMaterial !== 'custom' && (
          <div style={{ 
            marginTop: '10px', 
            padding: '10px', 
            background: '#e9ecef', 
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <div><strong>Thermal Conductivity:</strong> {MATERIAL_PROPERTIES[config.selectedMaterial]?.k} W/m·K</div>
            <div><strong>Density:</strong> {MATERIAL_PROPERTIES[config.selectedMaterial]?.rho} kg/m³</div>
            <div><strong>Specific Heat:</strong> {MATERIAL_PROPERTIES[config.selectedMaterial]?.c} J/kg·K</div>
          </div>
        )}
      </div>

      {/* Grid Configuration */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Grid Configuration</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Grid Size: {config.gridSize}×{config.gridSize}</label>
          <input
            type="range"
            min="20"
            max="100"
            step="10"
            value={config.gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Time Step: {config.timeStep}s</label>
          <input
            type="range"
            min="0.01"
            max="1"
            step="0.01"
            value={config.timeStep}
            onChange={(e) => setTimeStep(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Initial Temperature: {formatTemperature(config.initialTemperature)}</label>
          <input
            type="range"
            min="273.15"
            max="373.15"
            step="1"
            value={config.initialTemperature}
            onChange={(e) => setInitialTemperature(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Heat Source Configuration */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Heat Source</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Power: {heatSourcePower}W</label>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={heatSourcePower}
            onChange={(e) => setHeatSourcePower(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>X Position: {selectedGridX}</label>
            <input
              type="range"
              min="0"
              max={config.gridSize - 1}
              value={selectedGridX}
              onChange={(e) => setSelectedGridX(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Y Position: {selectedGridY}</label>
            <input
              type="range"
              min="0"
              max={config.gridSize - 1}
              value={selectedGridY}
              onChange={(e) => setSelectedGridY(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <button
          onClick={handleAddHeatSource}
          style={{
            width: '100%',
            padding: '10px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Heat Source
        </button>
      </div>

      {/* Simulation Controls */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Simulation Controls</h3>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button
            onClick={isRunning ? stopSimulation : startSimulation}
            style={{
              flex: 1,
              padding: '10px',
              background: isRunning ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          
          <button
            onClick={stepSimulation}
            disabled={isRunning}
            style={{
              flex: 1,
              padding: '10px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              opacity: isRunning ? 0.6 : 1
            }}
          >
            Step
          </button>
        </div>
        
        <button
          onClick={resetSimulation}
          style={{
            width: '100%',
            padding: '10px',
            background: '#ffc107',
            color: '#212529',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      {/* Instructions */}
      <div style={{ 
        padding: '10px', 
        background: '#e7f3ff', 
        borderRadius: '4px',
        fontSize: '12px',
        border: '1px solid #b3d9ff'
      }}>
        <strong>Instructions:</strong><br />
        • Select a material and configure the grid<br />
        • Add heat sources by setting position and power<br />
        • Click Start to run the simulation<br />
        • Click on the heat map to add heat sources directly
      </div>
    </div>
  );
};

export default ControlPanel; 