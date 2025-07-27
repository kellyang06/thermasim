import { HeatSimulation } from '../HeatSimulation';
import { SimulationConfig, HeatSource } from '../../types/SimulationTypes';

describe('HeatSimulation', () => {
  let config: SimulationConfig;
  let simulation: HeatSimulation;

  beforeEach(() => {
    config = {
      gridSize: 10,
      timeStep: 0.1,
      initialTemperature: 293.15, // 20°C
      selectedMaterial: 'copper'
    };
    simulation = new HeatSimulation(config);
  });

  test('should initialize with correct grid size', () => {
    const grid = simulation.getGrid();
    expect(grid.length).toBe(10);
    expect(grid[0].length).toBe(10);
  });

  test('should initialize with correct initial temperature', () => {
    const grid = simulation.getGrid();
    for (let i = 0; i < config.gridSize; i++) {
      for (let j = 0; j < config.gridSize; j++) {
        expect(grid[i][j].temperature).toBe(config.initialTemperature);
        expect(grid[i][j].material).toBe(config.selectedMaterial);
        expect(grid[i][j].isHeatSource).toBe(false);
      }
    }
  });

  test('should add heat source correctly', () => {
    const heatSource: HeatSource = {
      x: 5,
      y: 5,
      power: 100,
      temperature: 373.15 // 100°C
    };
    
    simulation.addHeatSource(heatSource);
    const grid = simulation.getGrid();
    
    expect(grid[5][5].isHeatSource).toBe(true);
    expect(grid[5][5].temperature).toBe(373.15);
    expect(grid[5][5].heatSourcePower).toBe(100);
  });

  test('should step simulation without errors', () => {
    // Add a heat source
    simulation.addHeatSource({
      x: 5,
      y: 5,
      power: 100,
      temperature: 373.15
    });

    // Step the simulation
    expect(() => simulation.step()).not.toThrow();
    
    const grid = simulation.getGrid();
    // Heat should have diffused from the source
    expect(grid[5][5].temperature).toBe(373.15); // Heat source maintains temperature
    expect(grid[4][5].temperature).toBeGreaterThan(config.initialTemperature); // Adjacent cell should be warmer
  });

  test('should handle different materials', () => {
    const copperConfig = { ...config, selectedMaterial: 'copper' as const };
    const siliconConfig = { ...config, selectedMaterial: 'silicon' as const };
    
    const copperSim = new HeatSimulation(copperConfig);
    const siliconSim = new HeatSimulation(siliconConfig);
    
    // Add heat sources
    copperSim.addHeatSource({ x: 5, y: 5, power: 100, temperature: 373.15 });
    siliconSim.addHeatSource({ x: 5, y: 5, power: 100, temperature: 373.15 });
    
    // Step both simulations
    copperSim.step();
    siliconSim.step();
    
    const copperGrid = copperSim.getGrid();
    const siliconGrid = siliconSim.getGrid();
    
    // Copper should diffuse heat faster than silicon
    expect(copperGrid[4][5].temperature).toBeGreaterThan(siliconGrid[4][5].temperature);
  });

  test('should reset simulation correctly', () => {
    // Add a heat source and step
    simulation.addHeatSource({ x: 5, y: 5, power: 100, temperature: 373.15 });
    simulation.step();
    
    // Reset
    simulation.reset();
    const grid = simulation.getGrid();
    
    // All cells should be back to initial temperature
    for (let i = 0; i < config.gridSize; i++) {
      for (let j = 0; j < config.gridSize; j++) {
        expect(grid[i][j].temperature).toBe(config.initialTemperature);
        expect(grid[i][j].isHeatSource).toBe(false);
      }
    }
  });

  test('should get max and min temperatures', () => {
    simulation.addHeatSource({ x: 5, y: 5, power: 100, temperature: 373.15 });
    simulation.step();
    
    expect(simulation.getMaxTemperature()).toBe(373.15);
    expect(simulation.getMinTemperature()).toBeGreaterThanOrEqual(config.initialTemperature);
  });
}); 