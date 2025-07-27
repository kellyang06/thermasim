import { MaterialProperties } from '../types/SimulationTypes';

export const MATERIAL_PROPERTIES: Record<string, MaterialProperties> = {
  copper: {
    k: 400,      // thermal conductivity (W/m·K)
    rho: 8960,   // density (kg/m³)
    c: 385,      // specific heat (J/kg·K)
    alpha: 400 / (8960 * 385) // thermal diffusivity (m²/s)
  },
  silicon: {
    k: 148,      // thermal conductivity (W/m·K)
    rho: 2330,   // density (kg/m³)
    c: 700,      // specific heat (J/kg·K)
    alpha: 148 / (2330 * 700) // thermal diffusivity (m²/s)
  },
  graphene: {
    k: 5000,     // thermal conductivity (W/m·K) - very high!
    rho: 2200,   // density (kg/m³)
    c: 700,      // specific heat (J/kg·K)
    alpha: 5000 / (2200 * 700) // thermal diffusivity (m²/s)
  },
  air: {
    k: 0.024,    // thermal conductivity (W/m·K)
    rho: 1.225,  // density (kg/m³)
    c: 1005,     // specific heat (J/kg·K)
    alpha: 0.024 / (1.225 * 1005) // thermal diffusivity (m²/s)
  }
};

export const MATERIAL_NAMES = {
  copper: "Copper",
  silicon: "Silicon", 
  graphene: "Graphene",
  air: "Air",
  custom: "Custom"
};

export const MATERIAL_COLORS = {
  copper: "#B87333",
  silicon: "#4A90E2", 
  graphene: "#2C3E50",
  air: "#87CEEB",
  custom: "#9B59B6"
}; 