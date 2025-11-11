import {css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {literal} from 'lit/static-html.js';
import Tile from './tile';

@customElement('novik-camera')
export default class Camera extends Tile {
  static readonly domain = 'camera';
  static readonly order = 7;
  static readonly tag = literal`novik-camera`;
  static readonly title = 'Cameras';
  static readonly icon = 'mdi:camera';

  @property({type: Boolean, reflect: true}) fluid = false;

  static styles = [
    Tile.styles,
    css`
      .camera-container {
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        transition: all 0.2s ease;
        aspect-ratio: 16 / 9;
        width: 256px;
      }

      :host([fluid]) .camera-container {
        width: 100%;
        max-width: 320px;
      }

      .camera-container:hover {
        transform: scale(1.02);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .camera-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }

      .camera-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 8px 12px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        color: white;
        font-size: 14px;
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.8);
        paint-order: stroke fill;
      }

      .camera-unavailable {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: rgba(255, 255, 255, 0.7);
      }

      .camera-unavailable ha-icon {
        --mdc-icon-size: 64px;
        color: rgba(255, 255, 255, 0.5);
      }

      .camera-unavailable .message {
        font-size: 14px;
        font-weight: 500;
      }

      .camera-unavailable .name {
        font-size: 12px;
        opacity: 0.8;
      }

      :host([dark]) .camera-container {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
      }

      :host([dark]) .camera-container:hover {
        border-color: rgba(255, 255, 255, 0.2);
      }
    `,
  ];

  get icon() {
    return super.icon || 'mdi:video';
  }

  get status() {
    return this.state?.state ?? 'unavailable';
  }

  get supportsStream() {
    return this.state?.attributes.supported_features ? (this.state.attributes.supported_features & 2) === 2 : false;
  }

  get url() {
    if (this.status === 'unavailable') return null;
    return this.state.attributes.entity_picture;
  }

  render() {
    return html`
      <div class="camera-container" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        ${this.url
          ? html` <img class="camera-image" src="${this.url}" alt="${this.displayName}" />
              <div class="camera-overlay">${this.displayName}</div>`
          : html`
              <div class="camera-unavailable">
                <ha-icon icon="mdi:video-off"></ha-icon>
                <div class="message">No Video Feed</div>
                <div class="name">${this.displayName}</div>
              </div>
            `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'novik-camera': Camera;
  }
}
