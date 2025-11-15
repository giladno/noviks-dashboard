import {css, html} from 'lit';
import {state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import Tile from './tile';

export default class Climate extends Tile {
  private static readonly FEATURES = {
    SUPPORT_TARGET_TEMPERATURE: 1,
    SUPPORT_TARGET_TEMPERATURE_RANGE: 2,
    SUPPORT_TARGET_HUMIDITY: 4,
    SUPPORT_FAN_MODE: 8,
    SUPPORT_PRESET_MODE: 16,
    SUPPORT_SWING_MODE: 32,
    SUPPORT_AUX_HEAT: 64,
  } as const;

  static readonly domain = 'climate';
  static readonly order = 2;
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

      .tile {
        flex-direction: column;
        align-items: stretch;
      }

      .tile-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
      }

      .expanded-controls {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 8px;
        padding-top: 12px;
        padding-bottom: 4px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      :host([dark]) .expanded-controls {
        border-top-color: rgba(255, 255, 255, 0.1);
      }

      .control-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .control-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        opacity: 0.6;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--tile-text-light);
      }

      :host([dark]) .control-label {
        color: var(--tile-text-dark);
      }

      .control-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .control-label ha-icon {
        --mdc-icon-size: 14px;
        opacity: 0.7;
      }

      .temperature-control {
        display: flex;
        align-items: center;
        gap: 12px;
        justify-content: center;
      }

      .temp-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(0, 0, 0, 0.1);
      }

      :host([dark]) .temp-button {
        background: rgba(255, 255, 255, 0.1);
      }

      .temp-button:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
      }

      :host([dark]) .temp-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .temp-button:active {
        transform: scale(0.95);
      }

      .temp-button ha-icon {
        --mdc-icon-size: 20px;
      }

      .temp-display {
        font-size: 24px;
        font-weight: 600;
        min-width: 80px;
        text-align: center;
        color: var(--tile-text-light);
      }

      :host([dark]) .temp-display {
        color: var(--tile-text-dark);
      }

      .mode-buttons,
      .fan-buttons {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .mode-button,
      .fan-button {
        flex: 1;
        min-width: fit-content;
        padding: 8px 12px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(0, 0, 0, 0.1);
        font-size: 12px;
        font-weight: 500;
        color: var(--tile-text-light);
      }

      :host([dark]) .mode-button,
      :host([dark]) .fan-button {
        background: rgba(255, 255, 255, 0.1);
        color: var(--tile-text-dark);
      }

      .mode-button:hover,
      .fan-button:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.02);
      }

      :host([dark]) .mode-button:hover,
      :host([dark]) .fan-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .mode-button.active {
        background: rgba(33, 150, 243, 0.3);
        border: 1px solid rgba(33, 150, 243, 0.5);
      }

      :host([dark]) .mode-button.active {
        background: rgba(33, 150, 243, 0.3);
        border: 1px solid rgba(33, 150, 243, 0.5);
      }

      .fan-button.active {
        background: rgba(33, 150, 243, 0.3);
        border: 1px solid rgba(33, 150, 243, 0.5);
      }

      :host([dark]) .fan-button.active {
        background: rgba(33, 150, 243, 0.3);
        border: 1px solid rgba(33, 150, 243, 0.5);
      }

      .more-info-button {
        padding: 8px;
        min-width: 44px;
        min-height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: transparent;
        color: var(--tile-text-light);
        opacity: 0.6;
      }

      :host([dark]) .more-info-button {
        color: var(--tile-text-dark);
      }

      .more-info-button:hover {
        background: rgba(0, 0, 0, 0.1);
        opacity: 1;
      }

      :host([dark]) .more-info-button:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .more-info-button:active {
        transform: scale(0.95);
      }

      .more-info-button ha-icon {
        --mdc-icon-size: 18px;
      }

      ha-icon.tile-icon {
        cursor: pointer;
      }

      /* When expanded, span 2 grid columns to have the width of 2 tiles + 1 gap */
      :host([expanded]) {
        grid-column: span 2;
      }

      :host {
        display: block;
        contain: layout style;
      }
    `,
  ];

  @state() private expanded = false;

  updated(changedProps: any) {
    super.updated(changedProps);
    if (changedProps.has('expanded')) this.toggleAttribute('expanded', this.expanded);
  }

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

  get currentTemperature(): number | null {
    const temp = this.state?.attributes?.current_temperature ?? null;
    return temp !== null ? temp : null;
  }

  get targetTemperature(): number | null {
    const temp = this.state?.attributes?.temperature ?? null;
    return temp !== null ? temp : null;
  }

  get targetTemperatureLow(): number | null {
    const temp = this.state?.attributes?.target_temp_low ?? null;
    return temp !== null ? temp : null;
  }

  get targetTemperatureHigh(): number | null {
    const temp = this.state?.attributes?.target_temp_high ?? null;
    return temp !== null ? temp : null;
  }

  get temperatureUnit(): string {
    return this.hass?.config?.unit_system?.temperature || '°C';
  }

  get hvacAction(): string | null {
    return this.state?.attributes?.hvac_action || null;
  }

  get supportedHvacModes(): string[] {
    const modes: string[] = this.state?.attributes?.hvac_modes || [];
    const off = modes.indexOf('off');
    if (off !== -1) {
      modes.splice(off, 1);
      modes.push('off');
    }
    return modes;
  }

  get supportedFanModes(): string[] {
    return this.state?.attributes?.fan_modes || [];
  }

  get currentFanMode(): string | null {
    return this.state?.attributes?.fan_mode || null;
  }

  get minTemp(): number {
    return this.state?.attributes?.min_temp ?? 7;
  }

  get maxTemp(): number {
    return this.state?.attributes?.max_temp ?? 35;
  }

  get tempStep(): number {
    return this.state?.attributes?.target_temp_step ?? 0.5;
  }

  get supportsTargetTemperature(): boolean {
    return ((this.state?.attributes?.supported_features || 0) & Climate.FEATURES.SUPPORT_TARGET_TEMPERATURE) !== 0;
  }

  get supportsTargetTemperatureRange(): boolean {
    return ((this.state?.attributes?.supported_features || 0) & Climate.FEATURES.SUPPORT_TARGET_TEMPERATURE_RANGE) !== 0;
  }

  get supportsFanMode(): boolean {
    return ((this.state?.attributes?.supported_features || 0) & Climate.FEATURES.SUPPORT_FAN_MODE) !== 0;
  }

  private formatLabel(text: string): string {
    return text
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private toggleExpanded(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.expanded = !this.expanded;
  }

  private toggle(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Climate.domain, 'toggle', {entity_id: this.entity.entity_id});
  }

  private increaseTemp(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    const current = this.targetTemperature;
    if (current === null) return;
    const newTemp = Math.min(current + this.tempStep, this.maxTemp);
    this.hass.callService(Climate.domain, 'set_temperature', {
      entity_id: this.entity.entity_id,
      temperature: newTemp,
    });
  }

  private decreaseTemp(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    const current = this.targetTemperature;
    if (current === null) return;
    const newTemp = Math.max(current - this.tempStep, this.minTemp);
    this.hass.callService(Climate.domain, 'set_temperature', {
      entity_id: this.entity.entity_id,
      temperature: newTemp,
    });
  }

  private setHvacMode(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Climate.domain, 'set_hvac_mode', {
      entity_id: this.entity.entity_id,
      hvac_mode: (e.currentTarget as HTMLElement).dataset.mode,
    });
  }

  private setFanMode(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Climate.domain, 'set_fan_mode', {
      entity_id: this.entity.entity_id,
      fan_mode: (e.currentTarget as HTMLElement).dataset.mode,
    });
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

  private renderExpandedControls() {
    const {supportedHvacModes} = this;
    return html`
      <div class="expanded-controls">
        ${(this.supportsTargetTemperature || this.supportsTargetTemperatureRange) && this.targetTemperature !== null
          ? html`
              <div class="control-section">
                <div class="control-header">
                  <div class="control-label">
                    <ha-icon icon="mdi:thermometer"></ha-icon>
                    <span>Temperature</span>
                  </div>
                  <div class="more-info-button" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="-1" role="button" aria-label="More info">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                  </div>
                </div>
                <div class="temperature-control">
                  <div
                    class="temp-button"
                    @click=${this.decreaseTemp}
                    @keydown=${this.decreaseTemp}
                    tabindex="-1"
                    role="button"
                    aria-label="Decrease temperature"
                  >
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </div>
                  <div class="temp-display">${this.targetTemperature}${this.temperatureUnit}</div>
                  <div
                    class="temp-button"
                    @click=${this.increaseTemp}
                    @keydown=${this.increaseTemp}
                    tabindex="-1"
                    role="button"
                    aria-label="Increase temperature"
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </div>
                </div>
              </div>
            `
          : null}
        ${supportedHvacModes.length
          ? html`
              <div class="control-section">
                <div class="control-label">
                  <ha-icon icon="mdi:state-machine"></ha-icon>
                  <span>Mode</span>
                </div>
                <div class="mode-buttons">
                  ${repeat(
                    supportedHvacModes,
                    (mode) => mode,
                    (mode) => html`
                      <div
                        class="mode-button ${mode === this.hvacMode ? 'active' : ''}"
                        data-mode=${mode}
                        @click=${this.setHvacMode}
                        @keydown=${this.setHvacMode}
                        tabindex="-1"
                        role="button"
                        aria-label="Set mode to ${mode}"
                      >
                        ${this.formatLabel(mode)}
                      </div>
                    `
                  )}
                </div>
              </div>
            `
          : null}
        ${this.supportsFanMode && this.supportedFanModes.length
          ? html`
              <div class="control-section">
                <div class="control-label">
                  <ha-icon icon="mdi:fan"></ha-icon>
                  <span>Fan Speed</span>
                </div>
                <div class="fan-buttons">
                  ${repeat(
                    this.supportedFanModes,
                    (mode) => mode,
                    (mode) => html`
                      <div
                        class="fan-button ${mode === this.currentFanMode ? 'active' : ''}"
                        data-mode=${mode}
                        @click=${this.setFanMode}
                        @keydown=${this.setFanMode}
                        tabindex="-1"
                        role="button"
                        aria-label="Set fan mode to ${mode}"
                      >
                        ${this.formatLabel(mode)}
                      </div>
                    `
                  )}
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }

  render() {
    const {hvacMode} = this;
    return html`
      <div
        class="tile ${hvacMode}"
        tabindex="0"
        role="button"
        @click=${hvacMode !== 'unavailable' ? this.toggleExpanded : null}
        @keydown=${hvacMode !== 'unavailable' ? this.toggleExpanded : null}
        aria-label="${this.displayName}"
      >
        <div class="tile-header">
          <ha-icon
            class="tile-icon"
            icon="${this.icon}"
            @click=${this.toggle}
            @keydown=${this.toggle}
            tabindex="-1"
            role="button"
            aria-label="Toggle climate"
          ></ha-icon>
          <div class="info">
            <div class="name">${this.displayName}</div>
            ${this.renderDetails()}
          </div>
          ${this.renderTemperature()}
        </div>
        ${this.expanded ? this.renderExpandedControls() : null}
      </div>
    `;
  }
}
