import {css, html} from 'lit';
import Tile from './tile';

export default class Cover extends Tile {
  private static readonly FEATURES = {
    SUPPORT_OPEN: 1,
    SUPPORT_CLOSE: 2,
    SUPPORT_SET_POSITION: 4,
    SUPPORT_STOP: 8,
    SUPPORT_OPEN_TILT: 16,
    SUPPORT_CLOSE_TILT: 32,
    SUPPORT_STOP_TILT: 128,
    SUPPORT_SET_TILT_POSITION: 256,
  } as const;

  static readonly domain = 'cover';
  static readonly order = 4;
  static readonly title = 'Covers';
  static readonly icon = 'mdi:window-shutter';

  static styles = [
    Tile.styles,
    css`
      .tile.open {
        background: rgba(76, 175, 80, 0.15) !important;
        border-color: rgba(76, 175, 80, 0.3) !important;
      }

      .tile.open ha-icon {
        color: #4caf50;
      }

      .tile.closed ha-icon {
        color: rgba(128, 128, 128, 0.6);
      }

      :host([dark]) .tile.closed ha-icon {
        color: rgba(255, 255, 255, 0.4);
      }

      .tile.opening,
      .tile.closing {
        background: rgba(33, 150, 243, 0.15) !important;
        border-color: rgba(33, 150, 243, 0.3) !important;
      }

      .tile.opening ha-icon,
      .tile.closing ha-icon {
        color: #2196f3;
      }

      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }

      .controls {
        display: flex;
        gap: 4px;
      }

      .control-button {
        width: 28px;
        height: 28px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(0, 0, 0, 0.1);
      }

      :host([dark]) .control-button {
        background: rgba(255, 255, 255, 0.1);
      }

      .control-button:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
      }

      :host([dark]) .control-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .control-button:active {
        transform: scale(0.95);
      }

      .control-button ha-icon {
        --mdc-icon-size: 18px;
        color: inherit;
      }
    `,
  ];

  get coverState(): string {
    return this.state?.state || 'unavailable';
  }

  get opened() {
    return this.coverState === 'open';
  }

  get icon() {
    switch (this.state?.attributes?.device_class) {
      case 'garage':
        return this.opened ? 'mdi:garage-open' : 'mdi:garage';
      case 'door':
        return this.opened ? 'mdi:door-open' : 'mdi:door-closed';
      case 'window':
        return this.opened ? 'mdi:window-open' : 'mdi:window-closed';
      case 'curtain':
        return this.opened ? 'mdi:curtains' : 'mdi:curtains-closed';
      case 'shutter':
        return this.opened ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
      case 'shade':
      case 'blind':
        return this.opened ? 'mdi:blinds-open' : 'mdi:blinds';
      default:
        return this.opened ? 'mdi:window-open' : 'mdi:window-closed';
    }
  }

  get position() {
    if (((this.state?.attributes?.supported_features || 0) & Cover.FEATURES.SUPPORT_SET_POSITION) === 0) return null;
    return this.state?.attributes?.current_position ?? null;
  }

  private handleOpen(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Cover.domain, 'open_cover', {entity_id: this.entity.entity_id});
  }

  private handleClose(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Cover.domain, 'close_cover', {entity_id: this.entity.entity_id});
  }

  private handleStop(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Cover.domain, 'stop_cover', {entity_id: this.entity.entity_id});
  }

  render() {
    return html`
      <div
        class="tile ${this.coverState}"
        @click=${this.showMoreInfo}
        @keydown=${this.showMoreInfo}
        tabindex="0"
        role="button"
        aria-label="${this.displayName}"
      >
        <ha-icon icon="${this.icon}" @click=${this.handleStop} @keydown=${this.handleStop} tabindex="-1" role="button" aria-label="Stop cover"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          ${this.position && this.coverState !== 'opening' && this.coverState !== 'closing' ? html`<div class="details">${this.position}%</div>` : null}
          ${this.coverState === 'opening' ? html`<div class="details">Opening...</div>` : null}
          ${this.coverState === 'closing' ? html`<div class="details">Closing...</div>` : null}
        </div>
        ${this.coverState !== 'unavailable'
          ? html`
              <div class="controls">
                <div class="control-button" @click=${this.handleOpen} @keydown=${this.handleOpen} tabindex="-1" role="button" aria-label="Open cover">
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </div>
                ${this.coverState === 'opening' || this.coverState === 'closing'
                  ? html`
                      <div class="control-button" @click=${this.handleStop} @keydown=${this.handleStop} tabindex="-1" role="button" aria-label="Stop cover">
                        <ha-icon icon="mdi:stop"></ha-icon>
                      </div>
                    `
                  : null}
                <div class="control-button" @click=${this.handleClose} @keydown=${this.handleClose} tabindex="-1" role="button" aria-label="Close cover">
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }
}
