# 🔥 ThermaSim - Thermal Diffusion Simulator

An interactive web-based simulator that models **2D heat diffusion** through materials over time. Visualize how heat propagates from user-defined sources using realistic thermal physics.

![ThermaSim Demo](https://img.shields.io/badge/Status-MVP%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Konva.js](https://img.shields.io/badge/Konva.js-9.0.0-orange)

## 🎯 Features

### ✅ MVP Features (Implemented)
- **2D Heat Map Visualizer**: Real-time temperature visualization with color-coded gradients
- **Material Presets**: Copper, Silicon, Graphene, Air with accurate thermal properties
- **User-Placed Heat Sources**: Click to add heat sources with configurable power
- **Start/Stop/Reset Controls**: Full simulation control with step-by-step execution
- **Responsive UI**: Modern, clean interface that works on desktop and mobile
- **Real-time Animation**: Smooth 50ms updates for fluid visualization

### 🔜 Stretch Goals (Planned)
- Data export (JSON/image)
- Side-by-side material comparisons
- 3D simulation support
- Anisotropic materials
- Isotherm visualization
- Time-series analysis

## 🧠 Physics Engine

ThermaSim uses the **2D heat equation** with explicit finite-difference method:

```
∂T/∂t = α * (∂²T/∂x² + ∂²T/∂y²)
```

Where:
- `T` = temperature
- `α = k / (ρ * c)` = thermal diffusivity
- `k` = thermal conductivity
- `ρ` = density  
- `c` = specific heat

### Material Properties

| Material | Thermal Conductivity (W/m·K) | Density (kg/m³) | Specific Heat (J/kg·K) |
|----------|------------------------------|-----------------|------------------------|
| Copper   | 400                          | 8960            | 385                    |
| Silicon  | 148                          | 2330            | 700                    |
| Graphene | 5000                         | 2200            | 700                    |
| Air      | 0.024                        | 1.225           | 1005                   |

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/thermasim.git
   cd thermasim
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🎮 How to Use

### Basic Simulation
1. **Select a Material**: Choose from the dropdown (Copper, Silicon, Graphene, Air)
2. **Configure Grid**: Adjust grid size (20-100), time step, and initial temperature
3. **Add Heat Sources**: 
   - Use the control panel sliders to set position and power
   - Click "Add Heat Source" button
   - Or click directly on the heat map
4. **Run Simulation**: Click "Start" to begin real-time simulation

### Advanced Features
- **Step Mode**: Use "Step" button for frame-by-frame analysis
- **Reset**: Clear all heat sources and reset to initial conditions
- **Material Comparison**: Switch materials to see different thermal behaviors

### Controls Reference

| Control | Range | Description |
|---------|-------|-------------|
| Grid Size | 20-100 | Number of cells (higher = more detail, slower) |
| Time Step | 0.01-1s | Simulation time per frame |
| Initial Temp | 0-100°C | Starting temperature of all cells |
| Heat Power | 10-1000W | Power output of heat sources |

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Canvas Rendering**: Konva.js + React-Konva
- **State Management**: Zustand
- **Simulation Engine**: Custom JavaScript physics engine
- **Styling**: CSS3 with responsive design
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── HeatMap.tsx     # Temperature visualization
│   └── ControlPanel.tsx # Simulation controls
├── simulation/          # Physics engine
│   └── HeatSimulation.ts
├── store/              # State management
│   └── SimulationStore.ts
├── types/              # TypeScript definitions
│   └── SimulationTypes.ts
├── constants/          # Material properties
│   └── Materials.ts
└── App.tsx            # Main application
```

## 🔧 Development

### Key Components

#### `HeatSimulation.ts`
Core physics engine implementing the 2D heat equation with:
- Explicit finite-difference method
- Configurable material properties
- Heat source management
- Boundary condition handling

#### `HeatMap.tsx`
Visualization component using Konva.js:
- Real-time temperature mapping
- Color-coded gradients (blue→red)
- Interactive cell clicking
- Responsive canvas sizing

#### `ControlPanel.tsx`
User interface for simulation control:
- Material selection
- Parameter sliders
- Heat source configuration
- Simulation controls

### Adding New Features

1. **New Materials**: Add to `src/constants/Materials.ts`
2. **UI Components**: Create in `src/components/`
3. **Physics**: Extend `src/simulation/HeatSimulation.ts`
4. **State**: Update `src/store/SimulationStore.ts`

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📊 Performance

- **Grid Size 50×50**: ~60 FPS on modern browsers
- **Grid Size 100×100**: ~30 FPS (recommended for analysis)
- **Memory Usage**: ~2MB for 100×100 grid
- **CPU Usage**: Optimized for smooth real-time simulation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Ensure responsive design
- Optimize for performance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Physics**: Based on the 2D heat equation and finite-difference methods
- **Materials**: Thermal properties from standard engineering references
- **UI**: Inspired by modern scientific visualization tools
- **Libraries**: React, Konva.js, Zustand for excellent developer experience

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/thermasim/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/thermasim/discussions)
- **Email**: your.email@example.com

---

**Made with ❤️ for thermal physics education and research**
