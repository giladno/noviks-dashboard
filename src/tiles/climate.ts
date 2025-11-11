import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {literal} from 'lit/static-html.js';
import Tile from './tile';

@customElement('novik-climate')
export default class Climate extends Tile {
  static readonly domain = 'climate';
  static readonly order = 2;
  static readonly tag = literal`novik-climate`;
  static readonly title = 'Climate';
  static readonly icon = 'mdi:thermostat';

  static styles = [
    Tile.styles,
    css`
      .tile.heat {
        background: rgba(255, 152, 0, 0.15) !important;
        border-color: rgba(255, 152, 0, 0.3) !important;
      }

      .tile.heat ha-icon {
        color: #ff9800;
        filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.4));
      }

      .tile.cool {
        background: rgba(3, 169, 244, 0.15) !important;
        border-color: rgba(3, 169, 244, 0.3) !important;
      }

      .tile.cool ha-icon {
        color: #03a9f4;
        filter: drop-shadow(0 0 8px rgba(3, 169, 244, 0.4));
      }

      .tile.heat_cool,
      .tile.auto {
        background: rgba(156, 39, 176, 0.15) !important;
        border-color: rgba(156, 39, 176, 0.3) !important;
      }

      .tile.heat_cool ha-icon,
      .tile.auto ha-icon {
        color: #9c27b0;
        filter: drop-shadow(0 0 8px rgba(156, 39, 176, 0.4));
      }

      .tile.dry {
        background: rgba(255, 193, 7, 0.15) !important;
        border-color: rgba(255, 193, 7, 0.3) !important;
      }

      .tile.dry ha-icon {
        color: #ffc107;
        filter: drop-shadow(0 0 8px rgba(255, 193, 7, 0.4));
      }

      .tile.fan_only {
        background: rgba(0, 150, 136, 0.15) !important;
        border-color: rgba(0, 150, 136, 0.3) !important;
      }

      .tile.fan_only ha-icon {
        color: #009688;
        filter: drop-shadow(0 0 8px rgba(0, 150, 136, 0.4));
      }

      .tile.off ha-icon {
        color: rgba(128, 128, 128, 0.6);
      }

      :host([dark]) .tile.off ha-icon {
        color: rgba(255, 255, 255, 0.4);
      }

      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }

      .temperature {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 6px;
        flex-shrink: 0;
      }

      .target-temp {
        font-size: 14px;
        font-weight: 600;
        line-height: 1;
      }

      .current-temp {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 12px;
        line-height: 1;
        opacity: 0.7;
      }

      .current-temp ha-icon {
        --mdc-icon-size: 10px;
        filter: none;
        padding: 0;
      }

      :host([dark]) .current-temp,
      :host([dark]) .target-temp {
        color: var(--tile-text-dark);
      }

      :host(:not([dark])) .current-temp,
      :host(:not([dark])) .target-temp {
        color: var(--tile-text-light);
      }
    `,
  ];

  get hvacMode(): string {
    return this.state?.state || 'unavailable';
  }

  get icon() {
    switch (this.state?.state) {
      case 'heat':
        return 'mdi:fire';
      case 'cool':
        return 'mdi:snowflake';
      case 'heat_cool':
      case 'auto':
        return 'mdi:autorenew';
      case 'dry':
        return 'mdi:water-percent';
      case 'fan_only':
        return 'mdi:fan';
      case 'off':
        return 'mdi:power';
      default:
        return super.icon || 'mdi:thermostat';
    }
  }

  get currentTemperature() {
    const temp = this.state?.attributes?.current_temperature ?? null;
    return temp !== null ? temp : null;
  }

  get targetTemperature() {
    const temp = this.state?.attributes?.temperature ?? null;
    return temp !== null ? temp : null;
  }

  get targetTemperatureLow() {
    const temp = this.state?.attributes?.target_temp_low ?? null;
    return temp !== null ? temp : null;
  }

  get targetTemperatureHigh() {
    const temp = this.state?.attributes?.target_temp_high ?? null;
    return temp !== null ? temp : null;
  }

  get temperatureUnit() {
    return this.hass?.config?.unit_system?.temperature || '°C';
  }

  get hvacAction() {
    return this.state?.attributes?.hvac_action || null;
  }

  private toggle(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Climate.domain, 'toggle', {entity_id: this.entity.entity_id});
  }

  private renderDetails() {
    if (this.hvacMode === 'unavailable' || this.hvacMode === 'off') return null;

    const action = this.hvacAction;
    if (action && action !== 'idle' && action !== 'off') {
      const actionLabels: Record<string, string> = {
        heating: 'Heating',
        cooling: 'Cooling',
        drying: 'Drying',
        fan: 'Fan',
      };
      return html`<div class="details">${actionLabels[action] || action}</div>`;
    }

    // Show HVAC mode as fallback
    const modeLabels: Record<string, string> = {
      heat: 'Heat',
      cool: 'Cool',
      heat_cool: 'Auto',
      auto: 'Auto',
      dry: 'Dry',
      fan_only: 'Fan',
    };
    return html`<div class="details">${modeLabels[this.hvacMode] || this.hvacMode}</div>`;
  }

  private renderTemperature() {
    if (this.hvacMode === 'unavailable') return null;

    const current = this.currentTemperature;
    const target = this.targetTemperature;
    const targetLow = this.targetTemperatureLow;
    const targetHigh = this.targetTemperatureHigh;

    return html`
      <div class="temperature">
        ${target !== null
          ? html`<div class="target-temp">${target}${this.temperatureUnit}</div>`
          : targetLow !== null && targetHigh !== null
            ? html`<div class="target-temp">${targetLow}-${targetHigh}${this.temperatureUnit}</div>`
            : null}
        ${current !== null ? html`<div class="current-temp"><ha-icon icon="mdi:thermometer"></ha-icon>${current}${this.temperatureUnit}</div>` : null}
      </div>
    `;
  }

  render() {
    return html`
      <div class="tile ${this.hvacMode}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle climate"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          ${this.renderDetails()}
        </div>
        ${this.renderTemperature()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'novik-climate': Climate;
  }
}
