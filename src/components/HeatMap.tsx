import React, { useMemo } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { useSimulationStore } from '../store/SimulationStore';

interface HeatMapProps {
  width: number;
  height: number;
  onCellClick?: (x: number, y: number) => void;
}

const HeatMap: React.FC<HeatMapProps> = ({ width, height, onCellClick }) => {
  const { grid, config } = useSimulationStore();

  // Calculate cell size based on grid size and canvas dimensions
  const cellSize = Math.min(width / config.gridSize, height / config.gridSize);

  // Temperature to color mapping function
  const temperatureToColor = (temperature: number): string => {
    // Normalize temperature to 0-1 range (assuming reasonable temperature range)
    const minTemp = 273.15; // 0°C
    const maxTemp = 373.15; // 100°C
    const normalized = Math.max(0, Math.min(1, (temperature - minTemp) / (maxTemp - minTemp)));
    
    // Create a blue (cold) to red (hot) gradient
    if (normalized < 0.5) {
      // Blue to cyan to green
      const t = normalized * 2;
      const r = Math.round(0);
      const g = Math.round(255 * t);
      const b = Math.round(255);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Green to yellow to red
      const t = (normalized - 0.5) * 2;
      const r = Math.round(255 * t);
      const g = Math.round(255 * (1 - t));
      const b = Math.round(0);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  // Memoize the grid cells to avoid unnecessary re-renders
  const gridCells = useMemo(() => {
    if (!grid.length) return [];
    
    const cells = [];
    for (let i = 0; i < config.gridSize; i++) {
      for (let j = 0; j < config.gridSize; j++) {
        const cell = grid[i]?.[j];
        if (cell) {
          const x = j * cellSize;
          const y = i * cellSize;
          
          cells.push({
            x,
            y,
            width: cellSize,
            height: cellSize,
            fill: temperatureToColor(cell.temperature),
            stroke: cell.isHeatSource ? '#FF0000' : '#333',
            strokeWidth: cell.isHeatSource ? 2 : 0.5,
            gridX: i,
            gridY: j,
            temperature: cell.temperature,
            isHeatSource: cell.isHeatSource
          });
        }
      }
    }
    return cells;
  }, [grid, config.gridSize, cellSize]);

  const handleCellClick = (gridX: number, gridY: number) => {
    if (onCellClick) {
      onCellClick(gridX, gridY);
    }
  };

  return (
    <div style={{ border: '2px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
      <Stage width={width} height={height}>
        <Layer>
          {gridCells.map((cell, index) => (
            <Rect
              key={`${cell.gridX}-${cell.gridY}`}
              x={cell.x}
              y={cell.y}
              width={cell.width}
              height={cell.height}
              fill={cell.fill}
              stroke={cell.stroke}
              strokeWidth={cell.strokeWidth}
              onClick={() => handleCellClick(cell.gridX, cell.gridY)}
              onTap={() => handleCellClick(cell.gridX, cell.gridY)}
            />
          ))}
        </Layer>
      </Stage>
      
      {/* Temperature legend */}
      <div style={{ 
        padding: '10px', 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ color: '#0000FF' }}>●</span> Cold (0°C)
        </div>
        <div>
          <span style={{ color: '#00FF00' }}>●</span> Warm (50°C)
        </div>
        <div>
          <span style={{ color: '#FF0000' }}>●</span> Hot (100°C)
        </div>
        <div>
          <span style={{ color: '#FF0000' }}>■</span> Heat Source
        </div>
      </div>
    </div>
  );
};

export default HeatMap; 