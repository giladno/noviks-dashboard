import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {literal} from 'lit/static-html.js';
import Tile from './tile';

@customElement('novik-sensor')
export default class Sensor extends Tile {
  static readonly domain = 'sensor';
  static readonly order = 7;
  static readonly tag = literal`novik-sensor`;
  static readonly title = 'Sensors';
  static readonly icon = 'mdi:eye';

  static styles = [
    Tile.styles,
    css`
      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }

      /* Override info layout for sensor - horizontal instead of vertical */
      .info {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      /* Temperature sensors - warm orange/red tones */
      .tile.temperature ha-icon {
        color: #ff6b35;
      }

      :host([dark]) .tile.temperature ha-icon {
        color: #ff8c61;
      }

      /* Humidity sensors - blue tones */
      .tile.humidity ha-icon {
        color: #03a9f4;
      }

      :host([dark]) .tile.humidity ha-icon {
        color: #4fc3f7;
      }

      /* Battery sensors - green when high, orange when medium, red when low */
      .tile.battery ha-icon {
        color: #4caf50;
      }

      .tile.battery.low ha-icon {
        color: #ff9800;
      }

      .tile.battery.critical ha-icon {
        color: #f44336;
      }

      /* Power/Energy sensors - yellow tones */
      .tile.power ha-icon,
      .tile.energy ha-icon {
        color: #ffc107;
      }

      :host([dark]) .tile.power ha-icon,
      :host([dark]) .tile.energy ha-icon {
        color: #ffd54f;
      }

      /* Pressure sensors - purple tones */
      .tile.pressure ha-icon {
        color: #9c27b0;
      }

      :host([dark]) .tile.pressure ha-icon {
        color: #ba68c8;
      }

      /* Illuminance sensors - bright yellow */
      .tile.illuminance ha-icon {
        color: #ffeb3b;
        filter: drop-shadow(0 0 6px rgba(255, 235, 59, 0.3));
      }

      :host([dark]) .tile.illuminance ha-icon {
        color: #fff59d;
      }

      /* Default sensor - neutral gray */
      .tile.default ha-icon {
        color: rgba(128, 128, 128, 0.8);
      }

      :host([dark]) .tile.default ha-icon {
        color: rgba(255, 255, 255, 0.6);
      }

      .value {
        font-size: 16px;
        font-weight: 600;
        line-height: 1;
        display: flex;
        align-items: baseline;
        gap: 4px;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .unit {
        font-size: 12px;
        font-weight: 400;
        opacity: 0.7;
      }

      :host([dark]) .value {
        color: var(--tile-text-dark);
      }

      :host(:not([dark])) .value {
        color: var(--tile-text-light);
      }
    `,
  ];

  get icon() {
    if (super.icon) return super.icon;
    switch (this.state?.attributes?.device_class) {
      case 'temperature':
        return 'mdi:thermometer';
      case 'humidity':
        return 'mdi:water-percent';
      case 'battery':
        return this.batteryIcon;
      case 'power':
        return 'mdi:flash';
      case 'energy':
        return 'mdi:lightning-bolt';
      case 'pressure':
        return 'mdi:gauge';
      case 'illuminance':
        return 'mdi:brightness-5';
      case 'pm25':
        return 'mdi:air-filter';
      case 'pm10':
        return 'mdi:air-filter';
      case 'co2':
        return 'mdi:molecule-co2';
      case 'volatile_organic_compounds':
        return 'mdi:chemical-weapon';
      default:
        return 'mdi:eye';
    }
  }

  get batteryIcon() {
    const batteryLevel = parseFloat(this.state?.state ?? '0');
    if (batteryLevel >= 90) return 'mdi:battery';
    if (batteryLevel >= 80) return 'mdi:battery-90';
    if (batteryLevel >= 70) return 'mdi:battery-80';
    if (batteryLevel >= 60) return 'mdi:battery-70';
    if (batteryLevel >= 50) return 'mdi:battery-60';
    if (batteryLevel >= 40) return 'mdi:battery-50';
    if (batteryLevel >= 30) return 'mdi:battery-40';
    if (batteryLevel >= 20) return 'mdi:battery-30';
    if (batteryLevel >= 10) return 'mdi:battery-20';
    return 'mdi:battery-10';
  }

  get deviceClass() {
    return this.state?.attributes?.device_class || 'default';
  }

  get sensorType() {
    const deviceClass = this.deviceClass;
    if (deviceClass === 'battery') {
      const batteryLevel = parseFloat(this.state?.state ?? '0');
      if (batteryLevel < 10) return 'battery critical';
      if (batteryLevel < 30) return 'battery low';
      return 'battery';
    }
    return deviceClass;
  }

  get value() {
    const state = this.state?.state ?? 'unavailable';
    if (state === 'unavailable' || state === 'unknown') return 'Unavailable';

    const numValue = parseFloat(state);
    if (isNaN(numValue)) return state;

    switch (this.deviceClass) {
      case 'temperature':
        return numValue.toFixed(1);
      case 'humidity':
        return numValue.toFixed(0);
      case 'battery':
        return numValue.toFixed(0);
      case 'power':
      case 'energy':
        return numValue.toFixed(numValue < 10 ? 2 : numValue < 100 ? 1 : 0);
      case 'pressure':
        return numValue.toFixed(1);
      case 'illuminance':
        return numValue.toFixed(0);
      default:
        // For generic sensors, show up to 2 decimal places, but remove trailing zeros
        return numValue.toFixed(2).replace(/\.?0+$/, '');
    }
  }

  get unit() {
    return this.state?.attributes?.unit_of_measurement || null;
  }

  render() {
    const status = this.state?.state ?? 'unavailable';
    const unavailable = status === 'unavailable' || status === 'unknown';

    return html`
      <div
        class="tile ${unavailable ? 'unavailable' : this.sensorType}"
        @click=${this.showMoreInfo}
        @keydown=${this.showMoreInfo}
        tabindex="0"
        role="button"
        aria-label="${this.displayName}"
      >
        <ha-icon icon="${this.icon}"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          <div class="value">${this.value} ${this.unit && html`<span class="unit">${this.unit}</span>`}</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'novik-sensor': Sensor;
  }
}
