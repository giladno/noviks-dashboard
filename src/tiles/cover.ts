import {css, html} from 'lit';
import {state} from 'lit/decorators.js';
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

      .chevron-button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .chevron-button ha-icon {
        --mdc-icon-size: 16px;
        transition: transform 0.2s ease;
      }

      .expanded-controls {
        display: flex;
        gap: 8px;
        margin-top: 4px;
        padding-top: 8px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      :host([dark]) .expanded-controls {
        border-top-color: rgba(255, 255, 255, 0.1);
      }

      .control-button {
        flex: 1;
        height: 36px;
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
        transform: scale(1.02);
      }

      :host([dark]) .control-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .control-button:active {
        transform: scale(0.98);
      }

      .control-button ha-icon {
        --mdc-icon-size: 20px;
        color: inherit;
      }

      ha-icon.tile-icon {
        cursor: pointer;
      }
    `,
  ];

  @state() private expanded = false;

  get coverState(): string {
    return this.state?.state || 'unavailable';
  }

  get icon() {
    const opened = this.coverState === 'open';
    switch (this.state?.attributes?.device_class) {
      case 'garage':
        return opened ? 'mdi:garage-open' : 'mdi:garage';
      case 'door':
        return opened ? 'mdi:door-open' : 'mdi:door-closed';
      case 'window':
        return opened ? 'mdi:window-open' : 'mdi:window-closed';
      case 'curtain':
        return opened ? 'mdi:curtains' : 'mdi:curtains-closed';
      case 'shutter':
        return opened ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
      case 'shade':
      case 'blind':
        return opened ? 'mdi:blinds-open' : 'mdi:blinds';
      default:
        return opened ? 'mdi:window-open' : 'mdi:window-closed';
    }
  }

  get position() {
    if (((this.state?.attributes?.supported_features || 0) & Cover.FEATURES.SUPPORT_SET_POSITION) === 0) return null;
    return this.state?.attributes?.current_position ?? null;
  }

  private toggleExpanded(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.expanded = !this.expanded;
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
    const {coverState} = this;
    return html`
      <div
        class="tile ${coverState}"
        tabindex="0"
        role="button"
        @click=${coverState !== 'unavailable' ? this.toggleExpanded : null}
        @keydown=${coverState !== 'unavailable' ? this.toggleExpanded : null}
        aria-label="${this.displayName}"
      >
        <div class="tile-header">
          <ha-icon
            class="tile-icon"
            icon="${this.icon}"
            @click=${this.showMoreInfo}
            @keydown=${this.showMoreInfo}
            tabindex="-1"
            role="button"
            aria-label="${this.displayName} - More info"
          ></ha-icon>
          <div class="info">
            <div class="name">${this.displayName}</div>
            ${this.position && coverState !== 'opening' && coverState !== 'closing' ? html`<div class="details">${this.position}%</div>` : null}
            ${coverState === 'opening' ? html`<div class="details">Opening...</div>` : null}
            ${coverState === 'closing' ? html`<div class="details">Closing...</div>` : null}
          </div>
          ${this.expanded ? html`<div class="chevron-button"><ha-icon icon="mdi:chevron-up"></ha-icon></div> ` : null}
        </div>
        ${this.expanded
          ? html`
              <div class="expanded-controls">
                <div class="control-button" @click=${this.handleOpen} @keydown=${this.handleOpen} tabindex="-1" role="button" aria-label="Open cover">
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </div>
                <div class="control-button" @click=${this.handleStop} @keydown=${this.handleStop} tabindex="-1" role="button" aria-label="Stop cover">
                  <ha-icon icon="mdi:stop"></ha-icon>
                </div>
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
