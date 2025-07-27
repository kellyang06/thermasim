import { GridCell, HeatSource, SimulationConfig } from '../types/SimulationTypes';
import { MATERIAL_PROPERTIES } from '../constants/Materials';

export class HeatSimulation {
  private grid: GridCell[][];
  private config: SimulationConfig;
  private heatSources: HeatSource[];
  private dx: number = 1; // Grid spacing in meters
  private dy: number = 1; // Grid spacing in meters

  constructor(config: SimulationConfig, heatSources: HeatSource[] = []) {
    this.config = config;
    this.heatSources = heatSources;
    this.grid = this.initializeGrid();
  }

  private initializeGrid(): GridCell[][] {
    const grid: GridCell[][] = [];
    
    for (let i = 0; i < this.config.gridSize; i++) {
      grid[i] = [];
      for (let j = 0; j < this.config.gridSize; j++) {
        const isHeatSource = this.heatSources.some(hs => hs.x === i && hs.y === j);
        const heatSource = this.heatSources.find(hs => hs.x === i && hs.y === j);
        
        grid[i][j] = {
          temperature: isHeatSource && heatSource?.temperature 
            ? heatSource.temperature 
            : this.config.initialTemperature,
          isHeatSource,
          material: this.config.selectedMaterial,
          heatSourcePower: heatSource?.power
        };
      }
    }
    
    return grid;
  }

  private getThermalDiffusivity(): number {
    const material = MATERIAL_PROPERTIES[this.config.selectedMaterial];
    if (!material) {
      throw new Error(`Unknown material: ${this.config.selectedMaterial}`);
    }
    return material.alpha || (material.k / (material.rho * material.c));
  }

  public step(): void {
    const alpha = this.getThermalDiffusivity();
    const dt = this.config.timeStep;
    const dx2 = this.dx * this.dx;
    const dy2 = this.dy * this.dy;
    
    // Create a new grid for the next time step
    const newGrid: GridCell[][] = [];
    
    for (let i = 0; i < this.config.gridSize; i++) {
      newGrid[i] = [];
      for (let j = 0; j < this.config.gridSize; j++) {
        const cell = this.grid[i][j];
        
        if (cell.isHeatSource) {
          // Heat sources maintain their temperature or power
          newGrid[i][j] = { ...cell };
          continue;
        }
        
        // Apply the 2D heat equation with explicit finite-difference method
        let dT = 0;
        
        // x-direction diffusion
        if (i > 0 && i < this.config.gridSize - 1) {
          dT += (this.grid[i + 1][j].temperature - 2 * cell.temperature + this.grid[i - 1][j].temperature) / dx2;
        }
        
        // y-direction diffusion
        if (j > 0 && j < this.config.gridSize - 1) {
          dT += (this.grid[i][j + 1].temperature - 2 * cell.temperature + this.grid[i][j - 1].temperature) / dy2;
        }
        
        // Add heat source contribution if nearby
        for (const heatSource of this.heatSources) {
          const distance = Math.sqrt((i - heatSource.x) ** 2 + (j - heatSource.y) ** 2);
          if (distance <= 2 && heatSource.power) {
            // Simplified heat source model - heat spreads to nearby cells
            const heatContribution = (heatSource.power * dt) / (4 * Math.PI * distance + 1);
            dT += heatContribution / (MATERIAL_PROPERTIES[this.config.selectedMaterial].rho * 
                                     MATERIAL_PROPERTIES[this.config.selectedMaterial].c);
          }
        }
        
        const newTemperature = cell.temperature + alpha * dt * dT;
        
        newGrid[i][j] = {
          ...cell,
          temperature: Math.max(0, newTemperature) // Ensure temperature doesn't go below 0K
        };
      }
    }
    
    this.grid = newGrid;
  }

  public getGrid(): GridCell[][] {
    return this.grid;
  }

  public addHeatSource(heatSource: HeatSource): void {
    this.heatSources.push(heatSource);
    if (this.grid[heatSource.x] && this.grid[heatSource.x][heatSource.y]) {
      this.grid[heatSource.x][heatSource.y] = {
        ...this.grid[heatSource.x][heatSource.y],
        isHeatSource: true,
        temperature: heatSource.temperature || this.grid[heatSource.x][heatSource.y].temperature,
        heatSourcePower: heatSource.power
      };
    }
  }

  public removeHeatSource(x: number, y: number): void {
    this.heatSources = this.heatSources.filter(hs => !(hs.x === x && hs.y === y));
    if (this.grid[x] && this.grid[x][y]) {
      this.grid[x][y] = {
        ...this.grid[x][y],
        isHeatSource: false,
        heatSourcePower: undefined
      };
    }
  }

  public reset(): void {
    this.heatSources = []; // Clear heat sources
    this.grid = this.initializeGrid();
  }

  public updateConfig(newConfig: SimulationConfig): void {
    this.config = newConfig;
  }

  public getMaxTemperature(): number {
    return Math.max(...this.grid.flat().map(cell => cell.temperature));
  }

  public getMinTemperature(): number {
    return Math.min(...this.grid.flat().map(cell => cell.temperature));
  }
} 