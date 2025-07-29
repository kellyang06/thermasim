ThermaSim 

An interactive web-based simulator that models **2D heat diffusion** through materials over time. 
Visualize how heat propagates from user-defined sources using realistic thermal physics.


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

| Material | Thermal Conductivity (W/m·K) | Density (kg/m³) | Specific Heat (J/kg·K) |
|----------|------------------------------|-----------------|------------------------|
| Copper   | 400                          | 8960            | 385                    |
| Silicon  | 148                          | 2330            | 700                    |
| Graphene | 5000                         | 2200            | 700                    |
| Air      | 0.024                        | 1.225           | 1005                   |
