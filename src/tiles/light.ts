import {css, html} from 'lit';
import Tile from './tile';

export default class Light extends Tile {
  static readonly domain = 'light';
  static readonly order = 1;
  static readonly title = 'Lights';
  static readonly icon = 'mdi:lightbulb';

  static styles = [
    Tile.styles,
    css`
      .tile.on {
        background: rgba(255, 204, 0, 0.15) !important;
        border-color: rgba(255, 204, 0, 0.3) !important;
      }

      .tile.on ha-icon {
        color: #ffcc00;
        filter: drop-shadow(0 0 8px rgba(255, 204, 0, 0.4));
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
    `,
  ];

  get icon() {
    return super.icon || 'mdi:lightbulb';
  }

  get supportedColorModes() {
    return this.state?.attributes?.supported_color_modes || [];
  }

  get hasBrightness() {
    return this.supportedColorModes.includes('brightness');
  }

  get brightness() {
    return Math.round(((this.state?.attributes?.brightness ?? 0) / 255) * 100);
  }

  private toggle(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Light.domain, 'toggle', {entity_id: this.entity.entity_id});
  }

  render() {
    const status = this.state?.state ?? 'unavailable';
    return html`
      <div class="tile ${status}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle light"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          ${this.hasBrightness && status === 'on' ? html`<div class="details">${this.brightness}%</div>` : null}
        </div>
      </div>
    `;
  }
}
