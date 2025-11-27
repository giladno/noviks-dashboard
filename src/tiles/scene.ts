import {css, html} from 'lit';
import Tile from './tile';

export default class Scene extends Tile {
  static readonly domain = 'scene';
  static readonly order = 8;
  static readonly title = 'Scenes';
  static readonly icon = 'mdi:palette';

  static styles = [
    Tile.styles,
    css`
      .tile:active {
        transform: scale(0.98);
        background: rgba(156, 39, 176, 0.2) !important;
        border-color: rgba(156, 39, 176, 0.4) !important;
      }

      .tile.unavailable {
        background: rgba(158, 158, 158, 0.1) !important;
        border-color: rgba(158, 158, 158, 0.2) !important;
        cursor: not-allowed;
      }

      .tile.unavailable ha-icon {
        color: rgba(158, 158, 158, 0.6);
      }

      ha-icon {
        color: rgba(156, 39, 176, 0.8);
        filter: drop-shadow(0 0 8px rgba(156, 39, 176, 0.3));
      }

      :host([dark]) .tile:not(.unavailable) ha-icon {
        color: rgba(186, 104, 200, 0.9);
        filter: drop-shadow(0 0 10px rgba(186, 104, 200, 0.4));
      }

      .tile:hover:not(.unavailable) {
        transform: scale(var(--tile-hover-scale));
        background: rgba(156, 39, 176, 0.1);
        border-color: rgba(156, 39, 176, 0.3);
      }

      :host([dark]) .tile:hover:not(.unavailable) {
        background: rgba(156, 39, 176, 0.15);
        border-color: rgba(186, 104, 200, 0.3);
      }
    `,
  ];

  get icon() {
    return super.icon || 'mdi:palette';
  }

  get unavailable() {
    return !this.state || this.state?.state === 'unavailable';
  }

  private activate(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    if (this.unavailable) return;
    this.hass.callService(Scene.domain, 'turn_on', {entity_id: this.entity.entity_id});
  }

  render() {
    return html`
      <div
        class="tile ${this.unavailable ? 'unavailable' : ''}"
        @click=${this.showMoreInfo}
        @keydown=${this.showMoreInfo}
        tabindex="0"
        role="button"
        aria-label="${this.displayName}"
      >
        <ha-icon icon="${this.icon}" @click=${this.activate} @keydown=${this.activate} tabindex="-1" role="button" aria-label="Activate scene"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
        </div>
      </div>
    `;
  }
}
