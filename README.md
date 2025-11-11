# Novik's Dashboard

A beautiful, modern Home Assistant dashboard built as a Lovelace strategy with custom Lit-based cards. The dashboard auto-generates views based on your Home Assistant area and entity registry.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

## Features

- **Auto-Generated Layout**: Automatically creates dashboard views based on your areas and entities
- **Modern Design**: Glassmorphic UI with dark mode support
- **Domain Tiles**: Custom tiles for:
  - 💡 Lights (with brightness control)
  - 🔌 Switches
  - 🌡️ Climate (with mode colors and HVAC action)
  - 🔒 Locks
  - 🪟 Covers (blinds, shades, garage doors)
  - 🔘 Buttons
  - 📷 Cameras
  - 🔍 Sensors (temperature, humidity, battery, power, air quality)
- **Smart Organization**:
  - Home view with domain chips and area sections
  - Domain-filtered views (all lights, all switches, etc.)
  - Area-filtered views (kitchen, bedroom, etc.)
  - Favorites section for quick access to important entities
- **Responsive**: Grid layout adapts from 1-4 columns based on screen size
- **Settings Interface**: Built-in UI for:
  - Dark mode toggle
  - Drag-and-drop area ordering
  - Domain and entity exclusion
  - Favorites management
  - Area visibility control

## Installation

### HACS (Recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=giladno&repository=noviks-dashboard&category=plugin)

1. Click the button above or manually open HACS in your Home Assistant instance
2. Search for "Novik's Dashboard" if not automatically opened
3. Click "Install"
   - HACS will automatically add the JavaScript resource to Home Assistant
4. Create a new dashboard:
   - Go to Settings → Dashboards → "Add Dashboard"
   - Name it "Novik's Dashboard" (or any name)
   - Edit the dashboard → Raw configuration editor
   - Set the strategy:
   ```yaml
   strategy:
     type: custom:novik-strategy
   ```
5. Save and enjoy your auto-generated dashboard!

### Manual Installation

1. Download `noviks-dashboard.js` from the latest release
2. Copy it to `config/www/noviks-dashboard.js` in your Home Assistant installation
3. Add the resource:
   - Go to Settings → Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/noviks-dashboard.js`
   - Resource type: JavaScript Module
4. Create a new dashboard:
   - Settings → Dashboards → "Add Dashboard"
   - Edit → Raw configuration editor
   - Add:
   ```yaml
   strategy:
     type: custom:novik-strategy
   ```

## Configuration

The dashboard requires no configuration! It automatically:

1. Fetches your area, device, and entity registries
2. Organizes entities by domain and area
3. Generates views with appropriate tiles
4. Updates when you navigate between views

### Optional Settings

Access the settings interface by clicking the gear icon in the top-right corner:

- **Dark Mode**: Toggle between light and dark themes
- **Area Ordering**: Drag and drop areas to customize their order
- **Available Domains**: Enable/disable entire domains (e.g., hide all sensors)
- **Excluded Entities**: Hide specific entities from the dashboard
- **Favorites**: Add frequently used entities to the home view
- **Hidden Areas**: Show/hide specific areas

Settings are automatically saved to your Lovelace configuration.

## Development

### Prerequisites

- Node.js 22+
- npm or yarn

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The dev server runs on port 3000 with CORS enabled. Point your Home Assistant to:

```yaml
resources:
  - url: http://localhost:3000/src/strategy.ts
    type: module
```

### Build

```bash
npm run build
```

Output: `dist/noviks-dashboard.js`

### Linting

```bash
npx eslint .
npx eslint --fix .
```

## Architecture

### Strategy Pattern

The strategy ([strategy.ts](src/strategy.ts)) implements Home Assistant's Lovelace strategy interface:

- Registers as `custom:novik-strategy`
- Fetches registries via WebSocket API
- Generates view configurations dynamically
- Filters entities based on supported domains

### Tile System

Tiles are dynamically loaded using Vite's glob imports:

- Each tile extends the `Tile` base class
- Auto-registered when they export a `domain` property
- Rendered in Shadow DOM with scoped styles
- Follow consistent accessibility patterns

### Component Hierarchy

```
Strategy (generates config)
  └─> View (custom:novik-view)
       └─> Tile components (novik-light, novik-climate, etc.)
```

## Creating Custom Tiles

See [CLAUDE.md](CLAUDE.md) for detailed instructions on creating new tiles. Basic pattern:

```typescript
import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {literal} from 'lit/static-html.js';
import Tile from './tile';

@customElement('novik-sensor')
export default class Sensor extends Tile {
  static tag = literal`novik-sensor`;
  static domain = 'sensor';
  static order = 0;

  static styles = css`
    /* Your styles */
  `;

  render() {
    return html` <!-- Your template --> `;
  }
}
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npx eslint --fix .`
5. Submit a pull request

## License

ISC License - see LICENSE file for details

## Author

Gilad Novik (gilad@novik.ca)

## Support

For issues and feature requests, please use the GitHub issue tracker.
