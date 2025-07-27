# 🔥 ThermaSim Demo Guide

Welcome to ThermaSim! This guide will walk you through the key features and show you how to create interesting thermal simulations.

## 🚀 Quick Start Demo

### 1. Basic Heat Source Simulation

1. **Open the Application**
   - Navigate to `http://localhost:3000`
   - You'll see a 50×50 grid with a control panel on the right

2. **Select Material**
   - Choose "Copper" from the Material dropdown
   - Notice the thermal properties displayed below

3. **Add a Heat Source**
   - Set Power to 200W
   - Set X Position to 25, Y Position to 25 (center)
   - Click "Add Heat Source"
   - You'll see a red-bordered cell appear in the center

4. **Run the Simulation**
   - Click "Start" to begin real-time simulation
   - Watch as heat diffuses outward from the center
   - The color gradient shows temperature (blue=cold, red=hot)

5. **Experiment with Controls**
   - Click "Stop" to pause
   - Use "Step" for frame-by-frame analysis
   - Click "Reset" to start over

### 2. Material Comparison Demo

1. **Copper vs Silicon**
   - Reset the simulation
   - Add a heat source at (25, 25) with 300W
   - Start the simulation and observe heat spread
   - Stop and change material to "Silicon"
   - Reset and add the same heat source
   - Start again - notice how much slower heat diffuses in silicon!

2. **Graphene Experiment**
   - Try the same with "Graphene"
   - Graphene has extremely high thermal conductivity
   - Heat will spread very rapidly across the material

### 3. Multiple Heat Sources

1. **Create a Heat Pattern**
   - Reset the simulation
   - Add heat sources at:
     - (20, 20) with 150W
     - (30, 20) with 150W
     - (25, 30) with 200W
   - Start the simulation
   - Watch how heat waves interact and merge

2. **Interactive Heat Sources**
   - Click directly on the heat map to add heat sources
   - Each click adds a 100W heat source at that location
   - Great for quick experimentation!

### 4. Grid Size Experiments

1. **High Resolution Analysis**
   - Change Grid Size to 100×100
   - Add a heat source and run
   - Notice the finer detail in heat diffusion patterns
   - Trade-off: slower performance but more detail

2. **Quick Simulations**
   - Use 20×20 grid for fast prototyping
   - Perfect for testing different configurations

## 🧪 Advanced Scenarios

### Scenario 1: Thermal Barrier
1. Create a 50×50 grid with Copper
2. Add heat sources along the left edge (x=0, y=10-40)
3. Add a single heat source on the right edge (x=49, y=25)
4. Run simulation and observe how heat flows around the barrier

### Scenario 2: Heat Sink Simulation
1. Use Silicon material (poor conductor)
2. Add multiple small heat sources (50W each) scattered around
3. Add one large heat source (500W) in the center
4. Watch how the large source dominates the thermal landscape

### Scenario 3: Material Boundary (Conceptual)
1. Run simulation with Copper
2. Note the heat diffusion pattern
3. Switch to Air material
4. Compare how much slower heat spreads in air

## 📊 Understanding the Visualization

### Color Legend
- **Blue**: Cold regions (0-25°C)
- **Cyan**: Cool regions (25-50°C)  
- **Green**: Moderate regions (50-75°C)
- **Yellow**: Warm regions (75-100°C)
- **Red**: Hot regions (100°C+)
- **Red Border**: Heat sources

### Physics Insights
- **Thermal Conductivity**: Higher values = faster heat spread
- **Density**: Affects how much heat energy is stored
- **Specific Heat**: Determines temperature change per unit energy
- **Thermal Diffusivity**: Combined effect of all properties

## 🎯 Educational Applications

### For Students
- **Physics Classes**: Demonstrate heat transfer principles
- **Engineering**: Compare material thermal properties
- **Computer Science**: Learn about numerical simulation

### For Researchers
- **Prototyping**: Test thermal designs quickly
- **Education**: Visualize complex thermal phenomena
- **Demonstration**: Show thermal concepts to others

## 🔧 Tips and Tricks

1. **Performance Optimization**
   - Use smaller grids for real-time interaction
   - Use larger grids for detailed analysis
   - Adjust time step for different simulation speeds

2. **Best Practices**
   - Start with simple configurations
   - Use the Step button for precise analysis
   - Reset frequently to avoid accumulated errors

3. **Troubleshooting**
   - If simulation seems stuck, try resetting
   - If performance is slow, reduce grid size
   - If heat sources aren't visible, check their power settings

## 🚀 Next Steps

After mastering these demos, you can:
- Explore the codebase to understand the physics engine
- Add new materials with custom thermal properties
- Implement additional features like data export
- Create your own thermal simulation scenarios

Happy simulating! 🔥 