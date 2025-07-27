export interface GridCell {
  temperature: number;
  isHeatSource: boolean;
  material: MaterialType;
  heatSourcePower?: number; // Watts for heat sources
}

export type MaterialType = "copper" | "silicon" | "graphene" | "air" | "custom";

export interface MaterialProperties {
  k: number;      // thermal conductivity (W/m·K)
  rho: number;    // density (kg/m³)
  c: number;      // specific heat (J/kg·K)
  alpha?: number; // thermal diffusivity (m²/s) - calculated as k/(rho*c)
}

export interface SimulationConfig {
  gridSize: number;
  timeStep: number;
  initialTemperature: number;
  selectedMaterial: MaterialType;
  customMaterial?: MaterialProperties;
}

export interface HeatSource {
  x: number;
  y: number;
  power: number; // Watts
  temperature?: number; // Fixed temperature if specified
}

export interface SimulationState {
  grid: GridCell[][];
  time: number;
  isRunning: boolean;
  heatSources: HeatSource[];
  config: SimulationConfig;
} 