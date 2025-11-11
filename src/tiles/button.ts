import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {literal} from 'lit/static-html.js';
import Tile from './tile';

@customElement('novik-button')
export default class Button extends Tile {
  static readonly domain = 'button';
  static readonly order = 6;
  static readonly tag = literal`novik-button`;
  static readonly title = 'Buttons';
  static readonly icon = 'mdi:gesture-tap-button';

  static styles = [
    Tile.styles,
    css`
      .tile:active {
        transform: scale(0.98);
        background: rgba(0, 122, 255, 0.2) !important;
        border-color: rgba(0, 122, 255, 0.4) !important;
      }

      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
        cursor: not-allowed;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }

      ha-icon {
        color: rgba(0, 122, 255, 0.8);
      }

      :host([dark]) .tile:not(.unavailable) ha-icon {
        color: rgba(10, 132, 255, 0.9);
      }

      .tile:hover:not(.unavailable) {
        transform: scale(var(--tile-hover-scale));
      }
    `,
  ];

  get icon() {
    return super.icon || 'mdi:gesture-tap-button';
  }

  get unavailable() {
    return !this.state || this.state?.state === 'unavailable';
  }

  private press(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    if (this.unavailable) return;
    this.hass.callService(Button.domain, 'press', {entity_id: this.entity.entity_id});
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
        <ha-icon icon="${this.icon}" @click=${this.press} @keydown=${this.press} tabindex="-1" role="button" aria-label="Press button"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'novik-button': Button;
  }
}
