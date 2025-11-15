import {css, html} from 'lit';
import Tile from './tile';

export default class Lock extends Tile {
  static readonly domain = 'lock';
  static readonly order = 5;
  static readonly title = 'Locks';
  static readonly icon = 'mdi:lock';

  static styles = [
    Tile.styles,
    css`
      .tile.locked {
        background: rgba(76, 175, 80, 0.15) !important;
        border-color: rgba(76, 175, 80, 0.3) !important;
      }

      .tile.locked ha-icon {
        color: #4caf50;
      }

      .tile.unlocked {
        background: rgba(255, 152, 0, 0.15) !important;
        border-color: rgba(255, 152, 0, 0.3) !important;
      }

      .tile.unlocked ha-icon {
        color: #ff9800;
      }

      .tile.locking,
      .tile.unlocking {
        background: rgba(33, 150, 243, 0.15) !important;
        border-color: rgba(33, 150, 243, 0.3) !important;
      }

      .tile.locking ha-icon,
      .tile.unlocking ha-icon {
        color: #2196f3;
      }

      .tile.jammed {
        background: rgba(255, 59, 48, 0.15) !important;
        border-color: rgba(255, 59, 48, 0.3) !important;
      }

      .tile.jammed ha-icon {
        color: #ff3b30;
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

  get lockState(): string {
    return this.state?.state || 'unavailable';
  }

  get locked() {
    return this.lockState === 'locked';
  }

  get icon() {
    switch (this.lockState) {
      case 'locked':
        return super.icon || 'mdi:lock';
      case 'unlocked':
        return super.icon || 'mdi:lock-open';
      case 'locking':
        return 'mdi:lock-clock';
      case 'unlocking':
        return 'mdi:lock-open-clock';
      case 'jammed':
        return 'mdi:lock-alert';
      default:
        return 'mdi:lock-question';
    }
  }

  get stateLabel() {
    switch (this.lockState) {
      case 'locked':
        return 'Locked';
      case 'unlocked':
        return 'Unlocked';
      case 'locking':
        return 'Locking...';
      case 'unlocking':
        return 'Unlocking...';
      case 'jammed':
        return 'Jammed';
      default:
        return 'Unavailable';
    }
  }

  private toggle(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    if (this.locked) {
      this.hass.callService(Lock.domain, 'unlock', {entity_id: this.entity.entity_id});
    } else {
      this.hass.callService(Lock.domain, 'lock', {entity_id: this.entity.entity_id});
    }
  }

  render() {
    return html`
      <div class="tile ${this.lockState}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle lock"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          <div class="details">${this.stateLabel}</div>
        </div>
      </div>
    `;
  }
}
