import {css, html} from 'lit';
import Tile from './tile';

export default class Switch extends Tile {
  static readonly domain = 'switch';
  static readonly order = 3;
  static readonly title = 'Switches';
  static readonly icon = 'mdi:toggle-switch';

  static styles = [
    Tile.styles,
    css`
      .tile.on {
        background: rgba(52, 199, 89, 0.15) !important;
        border-color: rgba(52, 199, 89, 0.3) !important;
      }

      .tile.on ha-icon {
        color: #34c759;
        filter: drop-shadow(0 0 8px rgba(52, 199, 89, 0.4));
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
    return super.icon || (this.state?.state === 'on' ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off');
  }

  private toggle(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Switch.domain, 'toggle', {entity_id: this.entity.entity_id});
  }

  render() {
    return html`
      <div
        class="tile ${this.state?.state ?? 'unavailable'}"
        @click=${this.showMoreInfo}
        @keydown=${this.showMoreInfo}
        tabindex="0"
        role="button"
        aria-label="${this.displayName}"
      >
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle switch"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
        </div>
      </div>
    `;
  }
}
