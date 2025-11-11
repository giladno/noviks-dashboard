import type {PropertyValues} from 'lit';
import {css, LitElement, type CSSResultGroup} from 'lit';
import {property, state} from 'lit/decorators.js';
import type {EntityRegistryEntry, HomeAssistant} from 'types/ha';

export default class Tile extends LitElement {
  static styles: CSSResultGroup = css`
    :host {
      display: block;

      /* Shared tile styles - can be overridden by child components */
      --tile-padding: 8px 16px;
      --tile-gap: 12px;
      --tile-radius: 12px;
      --tile-bg-light: rgba(255, 255, 255, 0.1);
      --tile-bg-dark: rgba(255, 255, 255, 0.05);
      --tile-border-light: rgba(255, 255, 255, 0.2);
      --tile-border-dark: rgba(255, 255, 255, 0.1);
      --tile-transition: all 0.2s ease;
      --tile-hover-scale: 1.02;

      /* Text colors */
      --tile-text-light: #000;
      --tile-text-dark: #fff;
      --tile-text-secondary-light: rgba(0, 0, 0, 0.6);
      --tile-text-secondary-dark: rgba(255, 255, 255, 0.6);
    }

    /* Base tile container styling */
    .tile {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--tile-gap);
      padding: var(--tile-padding);
      border-radius: var(--tile-radius);
      cursor: pointer;
      transition: var(--tile-transition);
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.15);
    }

    :host([dark]) .tile {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .tile:hover {
      transform: scale(var(--tile-hover-scale));
    }

    /* Common icon styling */
    ha-icon {
      --mdc-icon-size: 28px;
      flex-shrink: 0;
      transition: all 0.2s ease;
      padding: 4px 0;
    }

    /* Common info section styling */
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      flex: 1;
      min-width: 0;
    }

    .name {
      font-size: 14px;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .details {
      font-size: 12px;
      line-height: 1;
      opacity: 0.7;
    }

    :host([dark]) .name,
    :host([dark]) .details {
      color: var(--tile-text-dark);
    }

    :host(:not([dark])) .name,
    :host(:not([dark])) .details {
      color: var(--tile-text-light);
    }
  `;

  @property({attribute: false})
  public hass!: HomeAssistant;

  @property({attribute: false})
  public entity!: EntityRegistryEntry;

  @property({type: Boolean, reflect: true})
  public dark: boolean = false;

  @state()
  protected state: any | null = null;

  get displayName() {
    const name = this.state?.attributes?.friendly_name || this.entity.original_name || this.entity.name || this.entity.entity_id;
    return (name.startsWith(this.entity.area?.name ?? '') && name.slice(this.entity.area?.name.length ?? 0).trim()) || name;
  }

  get domain() {
    return this.entity.entity_id.match(/^([^.]+)\./)?.[1] ?? null;
  }

  get icon() {
    return this.entity.icon || this.state?.attributes?.icon;
  }

  updated(changedProps: PropertyValues) {
    if (changedProps.has('hass') || changedProps.has('entity')) {
      this.state = this.hass?.states?.[this.entity.entity_id] || null;
    }
  }

  protected showMoreInfo(e?: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e?.stopPropagation();
    this.dispatchEvent(new CustomEvent('hass-more-info', {bubbles: true, composed: true, detail: {entityId: this.entity.entity_id}}));
  }

  render(): unknown {
    return null;
  }
}
