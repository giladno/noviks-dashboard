# Novik's Dashboard

A beautiful, modern Home Assistant dashboard that auto-generates views based on your areas and entities.

## Features

- Auto-generated dashboard layout based on Home Assistant's area and entity registry
- Custom tiles for lights, switches, climate, locks, covers, buttons, cameras, and sensors
- Beautiful glassmorphic design with dark mode support
- Domain-based filtering (view all lights, switches, etc.)
- Area-based organization with drag-and-drop reordering
- Favorites section for quick access to important entities
- Responsive grid layout (1-4 columns)
- Built-in settings interface for customization

## Installation

1. Install via HACS (recommended) or download the latest release
   - HACS will automatically add the JavaScript resource to Home Assistant
2. Create a new dashboard:
   - Go to Settings → Dashboards
   - Click "Add Dashboard"
   - Name it "Novik's Dashboard" (or any name you prefer)
   - Click "Create"
3. Configure the dashboard strategy:
   - Click the three dots menu → "Edit Dashboard"
   - Click the three dots menu again → "Raw configuration editor"
   - Replace the content with:

   ```yaml
   strategy:
     type: custom:novik-strategy
   ```

   - Click "Save"

That's it! The dashboard will automatically generate views for:

- Home view with all areas and domain chips
- Individual domain views (all lights, all switches, etc.)
- Individual area views (kitchen, bedroom, etc.)

## Manual Setup

If you need to manually install without HACS:

1. Download `noviks-dashboard.js` from the latest release
2. Copy it to `config/www/noviks-dashboard.js`
3. Add the resource in Settings → Dashboards → Resources:
   - URL: `/local/noviks-dashboard.js`
   - Resource type: JavaScript Module
4. Follow steps 2-3 from the HACS installation above to create the dashboard

## Supported Domains

- Lights (with brightness support and color glow effects)
- Switches (with on/off state visualization)
- Climate controls (thermostats with color-coded modes)
- Locks (with lock/unlock controls)
- Covers (blinds, shades, garage doors with position control)
- Buttons (simple press actions)
- Cameras (live streaming feeds)
- Sensors (temperature, humidity, battery, power, energy, pressure, illuminance, air quality)

## Settings

Access the settings via the gear icon in the top-right corner to customize:

- **Dark Mode**: Toggle light/dark theme
- **Area Ordering**: Reorder areas via drag-and-drop
- **Domain Control**: Show/hide entire domains
- **Entity Exclusion**: Hide specific entities
- **Favorites**: Pin important entities to home view
- **Area Visibility**: Show/hide specific areas

Settings are automatically saved to your Lovelace dashboard configuration.

## Support

For issues, feature requests, or contributions, please visit the GitHub repository.
