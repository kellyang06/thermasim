import { create } from 'zustand';
import { SimulationState, SimulationConfig, HeatSource, MaterialType } from '../types/SimulationTypes';
import { HeatSimulation } from '../simulation/HeatSimulation';

interface SimulationStore extends SimulationState {
  simulation: HeatSimulation | null;
  intervalId: NodeJS.Timeout | null;
  
  // Actions
  initializeSimulation: (config: SimulationConfig) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  resetSimulation: () => void;
  stepSimulation: () => void;
  updateConfig: (config: Partial<SimulationConfig>) => void;
  addHeatSource: (heatSource: HeatSource) => void;
  removeHeatSource: (x: number, y: number) => void;
  setGridSize: (size: number) => void;
  setTimeStep: (step: number) => void;
  setInitialTemperature: (temp: number) => void;
  setMaterial: (material: MaterialType) => void;
}

const defaultConfig: SimulationConfig = {
  gridSize: 50,
  timeStep: 0.1,
  initialTemperature: 293.15, // 20°C in Kelvin
  selectedMaterial: 'copper'
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  grid: [],
  time: 0,
  isRunning: false,
  heatSources: [],
  config: defaultConfig,
  simulation: null,
  intervalId: null,

  initializeSimulation: (config: SimulationConfig) => {
    const simulation = new HeatSimulation(config, get().heatSources);
    set({
      simulation,
      config,
      grid: simulation.getGrid(),
      time: 0,
      isRunning: false
    });
  },

  startSimulation: () => {
    set({ isRunning: true });
    const { simulation } = get();
    if (simulation) {
      const interval = setInterval(() => {
        const { isRunning, simulation } = get();
        if (!isRunning || !simulation) {
          clearInterval(interval);
          return;
        }
        
        simulation.step();
        set({
          grid: simulation.getGrid(),
          time: get().time + get().config.timeStep
        });
      }, 50); // Update every 50ms for smooth animation
      
      // Store the interval ID for cleanup
      set({ intervalId: interval });
    }
  },

  stopSimulation: () => {
    const { intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    set({ isRunning: false, intervalId: null });
  },

  resetSimulation: () => {
    const { simulation, intervalId } = get();
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (simulation) {
      simulation.reset();
      set({
        grid: simulation.getGrid(),
        time: 0,
        isRunning: false,
        intervalId: null
      });
    }
  },

  stepSimulation: () => {
    const { simulation } = get();
    if (simulation) {
      simulation.step();
      set({
        grid: simulation.getGrid(),
        time: get().time + get().config.timeStep
      });
    }
  },

  updateConfig: (newConfig: Partial<SimulationConfig>) => {
    const currentConfig = get().config;
    const updatedConfig = { ...currentConfig, ...newConfig };
    const { simulation } = get();
    
    if (simulation) {
      simulation.updateConfig(updatedConfig);
    }
    
    set({ config: updatedConfig });
  },

  addHeatSource: (heatSource: HeatSource) => {
    const { simulation, heatSources } = get();
    if (simulation) {
      simulation.addHeatSource(heatSource);
      set({
        heatSources: [...heatSources, heatSource],
        grid: simulation.getGrid()
      });
    }
  },

  removeHeatSource: (x: number, y: number) => {
    const { simulation, heatSources } = get();
    if (simulation) {
      simulation.removeHeatSource(x, y);
      set({
        heatSources: heatSources.filter(hs => !(hs.x === x && hs.y === y)),
        grid: simulation.getGrid()
      });
    }
  },

  setGridSize: (size: number) => {
    get().updateConfig({ gridSize: size });
    get().initializeSimulation(get().config);
  },

  setTimeStep: (step: number) => {
    get().updateConfig({ timeStep: step });
  },

  setInitialTemperature: (temp: number) => {
    get().updateConfig({ initialTemperature: temp });
  },

  setMaterial: (material: MaterialType) => {
    get().updateConfig({ selectedMaterial: material });
  }
})); 