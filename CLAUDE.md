# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Novik's Dashboard** is a custom Home Assistant dashboard built as a Lovelace strategy with custom cards. The project uses Lit web components to create a dynamic dashboard that auto-generates views based on Home Assistant's area and entity registry.

**Key Components:**

- **Strategy** ([strategy.ts](src/strategy.ts)): Dashboard generation logic that queries Home Assistant's WebSocket API to fetch area and entity registries, then generates views automatically
- **View** ([view.ts](src/view.ts)): Custom card that renders the dashboard layout with chips, favorites, and area sections
- **Tile** ([tile.ts](src/tiles/tile.ts)): Base class for tile components that display individual entities

**Implemented Tiles:**

- **Light** ([light.ts](src/tiles/light.ts)): Light control with brightness display and yellow glow when on
- **Switch** ([switch.ts](src/tiles/switch.ts)): Binary switch control with green accent when on
- **Climate** ([climate.ts](src/tiles/climate.ts)): Thermostat control with color-coded modes, temperature display, and HVAC action status
- **Lock** ([lock.ts](src/tiles/lock.ts)): Lock control with state-specific styling and lock/unlock buttons
- **Cover** ([cover.ts](src/tiles/cover.ts)): Covers/blinds/shades with device class detection, position display, and up/down/stop controls
- **Button** ([button.ts](src/tiles/button.ts)): Button entity with press action
- **Camera** ([camera.ts](src/tiles/camera.ts)): Camera feed display with streaming support
- **Sensor** ([sensor.ts](src/tiles/sensor.ts)): Sensor display with device class-specific icons and formatting (temperature, humidity, battery, power, pressure, illuminance, air quality)

## Architecture

### Strategy Pattern

The strategy ([strategy.ts](src/strategy.ts:11-106)) implements Home Assistant's Lovelace strategy interface. It must be registered as `ll-strategy-dashboard-novik-strategy`. The `generate()` method:

1. Fetches area, device, and entity registries via WebSocket API
2. Filters entities based on domain support (tiles must be registered in the tiles Map)
3. Organizes entities by area and domain
4. Generates three types of views:
   - **Home view**: Dashboard with domain chips and area sections
   - **Domain views**: Filtered by entity type (e.g., all lights)
   - **Area views**: Filtered by location

### Tile System

Tiles are dynamically loaded using Vite's `import.meta.glob()` in [view.ts](src/view.ts:7-11). The tiles Map is automatically populated from all files in `src/tiles/`:

- Each tile module must export a default class with a static `domain` property (e.g., `static domain = 'light'`)
- All tiles extend the `Tile` base class ([tile.ts](src/tiles/tile.ts))
- Tiles are automatically registered when they export a domain property
- The `static tag` property uses Lit's `literal` for dynamic rendering in templates

The Tile base class provides:

- `hass`: HomeAssistant instance (via `@property` decorator)
- `entity`: EntityRegistryEntry metadata for the tile
- `dark`: Boolean theme property (reflected attribute)
- `state`: Reactive entity state from Home Assistant (updated via `updated()` lifecycle)
- `displayName`: Auto-computed name with area prefix removal
- `showMoreInfo()`: Method to open Home Assistant's more-info dialog
- `domain`: Computed property extracting domain from entity_id
- `icon`: Property with fallback logic (entity icon → metadata icon → domain default)

### Component Hierarchy

```
Strategy (generates config)
  └─> View (custom:novik-view)
       └─> Tile components (e.g., novik-light)
```

### Styling

**Important**: All components use Shadow DOM with inline scoped CSS via Lit's `css` tagged template literal.

**View Component Styling** ([view.ts](src/view.ts)):

- Gradient background (different for light/dark modes)
- Glassmorphic chips with backdrop-filter blur and semi-transparent backgrounds
- Responsive grid layout for tiles (1-4 columns based on screen width)
- Dark mode via `:host([dark])` selector

**Tile Component Styling Pattern** (consistent across all tiles):

- Flexbox row layout with 12px gap
- 12px vertical / 16px horizontal padding
- 12px border-radius
- Semi-transparent backgrounds (rgba)
- Subtle borders with low opacity
- `transform: scale(1.02)` on hover with 0.2s ease transitions
- State-specific colors with drop-shadow glow effects
- Dark mode support with adjusted colors for contrast

### Navigation

Navigation between views uses HTML5 History API ([view.ts](src/view.ts:201-204)):

- Pushes state to history
- Dispatches `location-changed` custom event for Home Assistant routing

## Common Commands

### Development

```bash
npm run dev        # Start Vite dev server on port 3000 with CORS enabled
```

### Build

```bash
npm run build      # Production build (minified, no sourcemaps)
```

### Linting

```bash
npx eslint .       # Lint all TypeScript files
npx eslint --fix . # Auto-fix linting issues
```

## Coding Style & Patterns

### Required Static Properties on Tiles

Every tile must define five static properties:

```typescript
static readonly tag = literal`novik-{domain}`;  // For dynamic rendering in templates
static readonly domain = '{domain}';             // Home Assistant domain identifier
static readonly order = 0;                       // Display order (used for sorting in UI)
static readonly title = 'Title';                 // Human-readable title for settings
static readonly icon = 'mdi:icon-name';          // Default MDI icon for the domain
```

### Event Handling Pattern

All tiles follow this event handling approach:

**Toggle/Control Actions** (stop propagation, call service):

```typescript
private toggle(e: Event) {
  e.stopPropagation();
  this.hass.callService(this.domain, 'toggle', {entity_id: this.entity.entity_id});
}
```

**More Info Actions** (dispatch custom event):

```typescript
@click=${this.showMoreInfo}  // Method from base Tile class
```

**Keyboard Accessibility**:

```typescript
@keydown=${(e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    this.toggle(e);
  }
}}
```

### State Management Pattern

Tiles use the `updated()` lifecycle hook to sync state:

```typescript
updated(changedProperties: PropertyValues) {
  if (changedProperties.has('hass') || changedProperties.has('entity')) {
    this.state = this.hass.states[this.entity.entity_id];
  }
}
```

### Accessibility Requirements

All interactive elements must have:

- `tabindex="0"` for keyboard navigation
- `role="button"` for semantic HTML
- `aria-label` with descriptive text
- Enter/Space key support via `@keydown` handler

### Creating New Tile Components

1. Create a new file in `src/tiles/` (e.g., `sensor.ts`)
2. Import required dependencies:
   ```typescript
   import {html, css, LitElement} from 'lit';
   import {customElement, property, state} from 'lit/decorators.js';
   import {literal} from 'lit/static-html.js';
   import type {HomeAssistant, EntityRegistryEntry} from 'types';
   import Tile from './tile';
   ```
3. Extend the `Tile` base class
4. Add static properties (tag, domain, order)
5. Define scoped styles using `static styles = css\`...\``
6. Implement `render()` method with accessibility attributes
7. The tile will be automatically registered via glob import

**Minimal Example**:

```typescript
import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {literal} from 'lit/static-html.js';
import Tile from './tile';

@customElement('novik-sensor')
export default class Sensor extends Tile {
  static readonly tag = literal`novik-sensor`;
  static readonly domain = 'sensor';
  static readonly order = 7;
  static readonly title = 'Sensors';
  static readonly icon = 'mdi:eye';

  static styles = [
    Tile.styles, // Inherit base tile styles
    css`
      /* Add domain-specific styles here */
    `,
  ];

  render() {
    return html`
      <div class="tile" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon || 'mdi:eye'}"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          <div class="details">${this.state?.state || 'Unknown'}</div>
        </div>
      </div>
    `;
  }
}
```

### Accessing Home Assistant Data

- **WebSocket API**: Use `hass.callWS<T>(message)` for registry queries
  - Area registry: `{type: 'config/area_registry/list'}`
  - Device registry: `{type: 'config/device_registry/list'}`
  - Entity registry: `{type: 'config/entity_registry/list'}`
- **Entity states**: Access via `hass.states[entity_id]`
- **Services**: Call via `hass.callService(domain, service, data)`
  - Example: `hass.callService('light', 'toggle', {entity_id: 'light.kitchen'})`
  - Common services: `toggle`, `turn_on`, `turn_off`, `lock`, `unlock`, `open_cover`, `close_cover`, `stop_cover`, `press`

### Service Call Patterns by Domain

Reference existing tiles for service call patterns:

- **Light/Switch**: `toggle` service for on/off control
- **Climate**: `toggle` service (some thermostats support this)
- **Lock**: `lock` and `unlock` services (separate buttons)
- **Cover**: `open_cover`, `close_cover`, `stop_cover` services
- **Button**: `press` service

### Checking Entity Features

Use bitmask checks for supported features (see [cover.ts](src/tiles/cover.ts:45-46)):

```typescript
const supportsPosition = this.state?.attributes.supported_features ? (this.state.attributes.supported_features & 4) === 4 : false;
```

### Dark Mode Implementation

All tiles receive a `dark` boolean property from the View component:

```typescript
@property({type: Boolean, reflect: true}) dark = false;
```

Use `:host([dark])` CSS selector for dark mode styles:

```typescript
static styles = css`
  :host([dark]) .icon {
    color: rgba(255, 255, 255, 0.9);
  }
`;
```

### TypeScript Configuration

- Strict mode enabled with all checks
- `experimentalDecorators: true` (required for Lit decorators)
- `useDefineForClassFields: false` (required for Lit compatibility)
- Path alias: `types` → `./src/types`

### Custom Types

Custom Home Assistant types are defined in [src/types/ha.ts](src/types/ha.ts):

- `AreaRegistryEntry`: Area metadata including ID, name, floor, icon
- `DeviceRegistryEntry`: Device metadata including area association
- `EntityRegistryEntry`: Entity metadata including ID, area, device, icon
- `HomeAssistant`: Main Home Assistant interface with states, services, and API methods
- `LovelaceCardConfig`: Card configuration interface
- `NovikSettings`: Settings interface for dashboard configuration (dark mode, excluded domains/entities, favorites, area order)
- `Registry`: Combined registry types (areas, devices, entities)

The `home-assistant-js-websocket` package provides additional type imports (used for types only, not bundled).

## Tile Implementation Reference

### Light Tile Pattern ([light.ts](src/tiles/light.ts))

- **Visual**: Yellow glow effect when on using `drop-shadow` filter
- **Features**: Displays brightness percentage when supported
- **Interaction**: Click icon to toggle, click tile for more info
- **Feature Check**: `supported_color_modes` array for brightness capability
- **Brightness Calc**: `Math.round(((this.state.attributes.brightness || 0) / 255) * 100)`

### Switch Tile Pattern ([switch.ts](src/tiles/switch.ts))

- **Visual**: Green accent color when on
- **Icon Logic**: Dynamic icon (`mdi:toggle-switch` vs `mdi:toggle-switch-off`)
- **Interaction**: Simple toggle on click
- **Simpler than Light**: No additional attributes to display

### Climate Tile Pattern ([climate.ts](src/tiles/climate.ts))

**Most Complex Tile** - Study this for advanced patterns:

- **Color Coding by Mode**:
  - Heat: `#ff9800` (orange)
  - Cool: `#03a9f4` (blue)
  - Heat_cool/Auto: `#9c27b0` (purple)
  - Dry: `#ffc107` (yellow)
  - Fan_only: `#009688` (teal)
- **Dynamic Icons per Mode**: fire, snowflake, autorenew, water-percent, fan
- **Temperature Display**: Supports both single target and low/high range
- **HVAC Action**: Shows current activity (Heating, Cooling, Drying, Fan) when active
- **Layout**: Icon + name + target temp + current temp + details section

### Lock Tile Pattern ([lock.ts](src/tiles/lock.ts))

- **State-Specific Styling**:
  - Locked: Green (#4caf50)
  - Unlocked: Orange (#ff9800)
  - Locking/Unlocking: Blue (#2196f3)
  - Jammed: Red (#f44336)
- **Control Buttons**: Conditional lock/unlock buttons based on current state
- **Icon Click**: Toggles between lock/unlock
- **State Labels**: User-friendly text (Locked, Unlocking..., etc.)

### Cover Tile Pattern ([cover.ts](src/tiles/cover.ts))

- **Device Class Detection**: Reads `device_class` attribute (garage, door, window, curtain, shutter, blind, shade)
- **Dynamic Icons**: Different MDI icons per device class
- **Position Display**: Shows percentage when supported (feature bitmask check)
- **Control Buttons**: Up, down, and conditional stop button
- **Stop Button**: Only shown during `opening` or `closing` states
- **Feature Bitmask**: `(supported_features & 4) === 4` for position support

### Button Tile Pattern ([button.ts](src/tiles/button.ts))

- **Simplest Implementation**: Just calls `press` service
- **Visual Feedback**: Active state with `scale(0.95)` transform
- **Color**: iOS-style blue accent (#007AFF)
- **No State Display**: Buttons don't have meaningful state
- **Disabled State**: Gray when unavailable

### Camera Tile Pattern ([camera.ts](src/tiles/camera.ts))

- **Wide Display**: Horizontal scrollable layout for camera feeds
- **Streaming**: Shows live camera feed using Home Assistant camera URL
- **Entity Picture**: Uses `entity_picture` attribute for camera stream
- **Click to Enlarge**: Opens more-info dialog for full-screen view
- **Aspect Ratio**: Maintains 16:9 aspect ratio with object-fit cover

### Sensor Tile Pattern ([sensor.ts](src/tiles/sensor.ts))

- **Device Class Detection**: Automatically detects sensor type (temperature, humidity, battery, etc.)
- **Dynamic Icons**: Different icons for each device class with color coding
- **Battery Levels**: Shows appropriate battery icon based on charge level (battery-10 to battery-100)
- **Value Formatting**: Precision varies by device class (temperature: 1 decimal, humidity: 0 decimals)
- **Unit Display**: Shows unit of measurement from entity attributes
- **Color Schemes**:
  - Temperature: Orange/red (#ff6b35)
  - Humidity: Blue (#03a9f4)
  - Battery: Green/orange/red based on level
  - Power/Energy: Yellow (#ffc107)
  - Pressure: Purple (#9c27b0)
  - Illuminance: Bright yellow with glow
- **Horizontal Layout**: Name on left, value on right for easy scanning

## Code Formatting & Style

### Prettier Configuration

The project uses specific formatting rules ([.prettierrc.json](.prettierrc.json)):

- **Single quotes** for strings
- **No bracket spacing** in objects: `{foo: 'bar'}`
- **160 character line width** (very wide - allows long lines)
- **2 space indentation**
- **LF line endings** (Unix style)

### ESLint Configuration

Custom rules ([eslint.config.js](eslint.config.js)):

- TypeScript ESLint with strict type checking
- Lit and Lit-a11y plugins enabled
- Prettier integration (formatting errors as lint errors)
- `no-explicit-any` disabled (allows `any` type)
- Unused vars allowed if prefixed with `_`

### Import Organization

Standard import order in all files:

1. Lit core imports (`lit`, `lit/decorators.js`, `lit/directives/*`, `lit/static-html.js`)
2. Type imports from custom types (`types`)
3. External package types (`home-assistant-js-websocket`)
4. Local imports (`./tile`, etc.)

Example:

```typescript
import {html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {literal} from 'lit/static-html.js';
import type {HomeAssistant, EntityRegistryEntry} from 'types';
import Tile from './tile';
```

### Naming Conventions

- **Custom elements**: `novik-{domain}` (e.g., `novik-light`, `novik-climate`)
- **CSS classes**: kebab-case (e.g., `.icon-wrapper`, `.details-section`)
- **Methods**: camelCase (e.g., `toggle()`, `showMoreInfo()`, `openCover()`)
- **Properties**: camelCase (e.g., `displayName`, `entityId`)
- **Private methods**: prefixed with `private` keyword (not underscore)

## Performance Considerations

### Rendering Optimization

- **`repeat()` directive**: Used in View for efficient list rendering with key functions
- **Shadow DOM**: Isolates styles and prevents global CSS recalculation
- **Transform animations**: GPU-accelerated (`scale()` instead of width/height changes)
- **Minimal re-renders**: State updates only trigger when `hass` or `entity` properties change

### Registry Fetching

Strategy uses `Promise.all()` to fetch registries in parallel ([strategy.ts](src/strategy.ts:14-18)):

```typescript
const [areaRegistry, deviceRegistry, entityRegistry] = await Promise.all([
  hass.callWS<AreaRegistryEntry[]>({type: 'config/area_registry/list'}),
  hass.callWS<DeviceRegistryEntry[]>({type: 'config/device_registry/list'}),
  hass.callWS<EntityRegistryEntry[]>({type: 'config/entity_registry/list'}),
]).catch(() => [[], [], []]);
```

## Common Patterns & Gotchas

### Don't Forget PropertyValues Import

When using `updated()` lifecycle, import PropertyValues:

```typescript
import type {PropertyValues} from 'lit';
```

### Stop Propagation on Control Actions

Always stop propagation on control buttons to prevent triggering tile's more-info:

```typescript
private toggle(e: Event) {
  e.stopPropagation();  // Critical!
  this.hass.callService(this.domain, 'toggle', {entity_id: this.entity.entity_id});
}
```

### Keyboard Event Prevention

Prevent default behavior for Enter/Space to avoid scrolling:

```typescript
@keydown=${(e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();  // Prevents page scroll on Space
    this.action(e);
  }
}}
```

### Null Safety with Optional Chaining

Entity state and attributes may be undefined:

```typescript
this.state?.attributes?.brightness; // Good
this.state.attributes.brightness; // Bad - will throw if state is undefined
```

### Feature Bitmask Checks

Home Assistant uses bitmask values for supported_features. Check specific bits:

```typescript
// Example: Cover position support is bit 2 (value 4)
const supportsPosition = (this.state?.attributes.supported_features & 4) === 4;
```

### Icon Fallback Chain

Use the icon property getter from base Tile class:

```typescript
get icon() {
  return this.state?.attributes.icon || this.entity.icon || `mdi:${this.domain}`;
}
```

## Build & Development

### Vite Configuration ([vite.config.ts](vite.config.ts))

- **Entry**: `src/strategy.ts`
- **Output**: `dist/noviks-dashboard.js` (ES module format)
- **Dev Server**: Port 3000 with CORS enabled for Home Assistant integration
- **Minification**: Production only
- **Source Maps**: Development only
- **External Dependencies**: `home-assistant-js-websocket` is marked as external (types only, not bundled)
- **Build Output**: Single ES module file for easy deployment

### Installation in Home Assistant

Add to Lovelace resources:

```yaml
resources:
  - url: http://localhost:3000/src/strategy.ts # Dev
  # OR
  - url: /local/noviks-dashboard.js # Production
    type: module
```

Then use in dashboard config:

```yaml
strategy:
  type: custom:novik-strategy
```

## Settings Interface

The dashboard includes a built-in settings interface accessible via the gear icon in the top-right corner:

### Available Settings

- **Dark Mode**: Toggle between light and dark themes
- **Area Ordering**: Drag and drop to reorder areas in the dashboard
- **Available Domains**: Enable/disable entire domains (hide all lights, switches, etc.)
- **Excluded Entities**: Search and add specific entities to exclude from the dashboard
- **Favorites**: Add entities to a favorites section shown on the home view
- **Hidden Areas**: Show/hide specific areas from the dashboard

### Settings Storage

Settings are stored in the Lovelace dashboard configuration via WebSocket API:

```typescript
await this.hass.callWS({
  type: 'lovelace/config/save',
  url_path: this.hass.panelUrl,
  config: {...config, settings: this.settings},
});
```

Settings are automatically loaded when the strategy generates views and passed to all view components.
