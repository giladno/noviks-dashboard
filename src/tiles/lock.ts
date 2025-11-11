import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {literal} from 'lit/static-html.js';
import Tile from './tile';

@customElement('novik-lock')
export default class Lock extends Tile {
  static readonly domain = 'lock';
  static readonly order = 5;
  static readonly tag = literal`novik-lock`;
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

      .control-button.lock-button {
        background: rgba(76, 175, 80, 0.2);
      }

      .control-button.lock-button:hover {
        background: rgba(76, 175, 80, 0.3);
      }

      .control-button.unlock-button {
        background: rgba(255, 152, 0, 0.2);
      }

      .control-button.unlock-button:hover {
        background: rgba(255, 152, 0, 0.3);
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

  private handleLock(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Lock.domain, 'lock', {entity_id: this.entity.entity_id});
  }

  private handleUnlock(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    this.hass.callService(Lock.domain, 'unlock', {entity_id: this.entity.entity_id});
  }

  private handleToggle(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    if (this.locked) this.handleUnlock(e);
    else this.handleLock(e);
  }

  render() {
    return html`
      <div class="tile ${this.lockState}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.handleToggle} @keydown=${this.handleToggle} tabindex="-1" role="button" aria-label="Toggle lock"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          <div class="details">${this.stateLabel}</div>
        </div>
        ${this.lockState !== 'unavailable' && this.lockState !== 'locking' && this.lockState !== 'unlocking' && this.lockState !== 'jammed'
          ? html`
              <div class="controls">
                ${this.locked
                  ? html`
                      <div
                        class="control-button unlock-button"
                        @click=${this.handleUnlock}
                        @keydown=${this.handleUnlock}
                        tabindex="-1"
                        role="button"
                        aria-label="Unlock"
                      >
                        <ha-icon icon="mdi:lock-open"></ha-icon>
                      </div>
                    `
                  : html`
                      <div
                        class="control-button lock-button"
                        @click=${this.handleLock}
                        @keydown=${this.handleLock}
                        tabindex="-1"
                        role="button"
                        aria-label="Lock"
                      >
                        <ha-icon icon="mdi:lock"></ha-icon>
                      </div>
                    `}
              </div>
            `
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'novik-lock': Lock;
  }
}
