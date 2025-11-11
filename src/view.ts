import type {HassEntity} from 'home-assistant-js-websocket';
import {css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {html, StaticValue} from 'lit/static-html.js';
import type {AreaRegistryEntry, EntityRegistryEntry, HomeAssistant, LovelaceCardConfig} from 'types/ha';
import Settings from './settings';
import Tile from './tiles/tile';

export const tiles = new Map<string, Tile & {domain: string; order: number; tag: StaticValue}>(
  Object.values(import.meta.glob('./tiles/*.ts', {eager: true}))
    .map((module: any) => module.default.domain && [module.default.domain, module.default])
    .filter(Boolean)
    .sort((a, b) => a[1].order! - b[1].order!)
);

@customElement('novik-view')
export default class View extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }

    .container {
      min-height: 100vh;
      padding: 1rem;
      background: linear-gradient(135deg, hsl(220, 15%, 93%) 0%, hsl(230, 20%, 91%) 50%, hsl(240, 18%, 92%) 100%);
      position: relative;
    }

    :host([dark]) .container {
      background: linear-gradient(135deg, hsl(220, 20%, 12%) 0%, hsl(230, 25%, 10%) 50%, hsl(240, 22%, 14%) 100%);
    }

    .header-row {
      display: flex;
      justify-content: flex-end;
      padding: 0 0 0.5rem 0;
    }

    .settings-button {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    :host([dark]) .settings-button {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .settings-button:hover {
      background: rgba(255, 255, 255, 0.85);
      border-color: rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
    }

    :host([dark]) .settings-button:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .settings-button:active {
      transform: scale(0.95);
    }

    .settings-button ha-icon {
      --mdc-icon-size: 16px;
      color: rgba(0, 0, 0, 0.7);
    }

    :host([dark]) .settings-button ha-icon {
      color: rgba(255, 255, 255, 0.7);
    }

    .scrollable-container {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding: 1rem 0;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .scrollable-container::-webkit-scrollbar {
      display: none;
    }

    .chip {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      gap: 0.625rem;
      padding: 0.75rem 1.25rem;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.025em;
      white-space: nowrap;
      cursor: pointer;
      flex-shrink: 0;
      color: rgba(0, 0, 0, 0.8);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .chip-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .chip-title {
      font-size: 0.8125rem;
      line-height: 1;
    }

    .chip-details {
      font-size: 0.75rem;
      font-weight: 500;
      opacity: 0.65;
      letter-spacing: 0;
      line-height: 1;
    }

    .chip ha-icon {
      --mdc-icon-size: 1.25rem;
      flex-shrink: 0;
    }

    .chip.lights ha-icon.active {
      color: #ffc107;
    }

    :host([dark]) .chip.lights ha-icon.active {
      color: #ffc107;
    }

    .chip.climate ha-icon.active {
      color: #03a9f4;
    }

    :host([dark]) .chip.climate ha-icon.active {
      color: #03a9f4;
    }

    .chip.security ha-icon.active {
      color: #4caf50;
    }

    :host([dark]) .chip.security ha-icon.active {
      color: #4caf50;
    }

    :host([dark]) .chip {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.9);
    }

    .chip:hover {
      background: rgba(255, 255, 255, 0.85);
      border-color: rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    :host([dark]) .chip:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .chip:active {
      transform: translateY(0);
    }

    @media (min-width: 768px) {
      .container {
        padding: 1.5rem;
      }

      .scrollable-container {
        gap: 1.25rem;
      }

      .chip {
        font-size: 1rem;
        padding: 0.875rem 1.5rem;
      }

      .chip ha-icon {
        --mdc-icon-size: 1.375rem;
      }

      .chip-title {
        font-size: 0.875rem;
      }

      .chip-details {
        font-size: 0.8125rem;
      }
    }

    @media (min-width: 1024px) {
      .container {
        padding: 2rem;
      }
    }

    .sections {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0;
      font-size: 1.375rem;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.85);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .section-header[role='button'] {
      cursor: pointer;
      transition: opacity 0.2s ease;
    }

    :host([dark]) .section-header {
      color: rgba(255, 255, 255, 0.95);
    }

    .section-header[role='button']:hover {
      opacity: 0.7;
    }

    .section-header ha-icon {
      --mdc-icon-size: 1.25rem;
      flex-shrink: 0;
      opacity: 0.6;
    }

    .group-tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 0.75rem;
      padding: 0 0.5rem;
    }

    @media (min-width: 640px) {
      .group-tiles {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
      }
    }

    @media (min-width: 1024px) {
      .sections {
        gap: 2rem;
        margin-top: 2rem;
      }

      .group-tiles {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }

    .sensors-container {
      display: flex;
      justify-content: center;
      overflow-x: auto;
      padding: 1rem 0;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .sensors-container::-webkit-scrollbar {
      display: none;
    }

    .sensors-list {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .sensor-chip {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
      flex-shrink: 0;
      color: rgba(0, 0, 0, 0.8);
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 9999px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    :host([dark]) .sensor-chip {
      color: rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .sensor-chip ha-icon {
      --mdc-icon-size: 1rem;
      flex-shrink: 0;
      color: #03a9f4;
    }

    .sensor-chip ha-icon.humidity {
      color: #2196f3;
    }

    .sensor-chip ha-icon.temperature {
      color: #ff9800;
    }

    .sensor-value {
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    @media (min-width: 768px) {
      .sensors-list {
        gap: 2rem;
      }

      .sensor-chip {
        font-size: 0.8125rem;
        gap: 0.125rem;
      }

      .sensor-chip ha-icon {
        --mdc-icon-size: 1.125rem;
      }
    }
  `;

  @property({attribute: false})
  public hass!: HomeAssistant;

  @property({type: Boolean, reflect: true})
  public dark: boolean = true;

  protected config!: LovelaceCardConfig;

  private navigate(path?: string) {
    history.pushState({}, '', [''].concat([this.hass?.panelUrl ?? 'lovelace', path ?? ''].filter(Boolean)).join('/'));
    window.dispatchEvent(new CustomEvent('location-changed', {bubbles: true, composed: true, detail: {replace: false}}));
  }

  private openSettings(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    e.stopPropagation();
    Settings.show({hass: this.hass, registry: this.config.registry, settings: this.config.settings});
  }

  private renderChips() {
    const icons: Record<string, string> = {
      lights: 'mdi:lightbulb',
      climate: 'mdi:fan',
      security: 'mdi:lock',
    };

    const chips = this.config.chips as [string[], EntityRegistryEntry[]][] | undefined;
    if (!chips?.length) return null;
    return html`
      <div class="scrollable-container">
        ${repeat(
          chips,
          ([domain]) => domain[0],
          ([[path, title], entities]) => {
            const {active, details} = (() => {
              switch (path) {
                case 'lights': {
                  const active = entities.filter((entity) => this.hass.states[entity.entity_id]?.state === 'on').length;
                  return {active, details: active ? `${active} on` : 'none on'};
                }
                case 'climate': {
                  const active = entities.some((entity) => {
                    const state = this.hass.states[entity.entity_id];
                    switch (entity.domain) {
                      case 'climate':
                        return state?.attributes?.hvac_mode && state.attributes.hvac_mode !== 'off';
                      case 'cover':
                        return state?.state !== 'closed';
                      case 'fan':
                        return state?.state !== 'off';
                      default:
                        return false;
                    }
                  });

                  const temps = entities
                    .map((entity) => this.hass.states[entity.entity_id]?.attributes?.current_temperature ?? null)
                    .filter(Boolean) as number[];

                  if (!temps.length) return {active};

                  const min = Math.min(...temps);
                  const max = Math.max(...temps);

                  if (min === max) return `${min}°`;
                  return {active, details: `${min}°-${max}°`};
                }
                case 'security': {
                  const active = entities.filter((entity) => this.hass.states[entity.entity_id]?.state === 'locked').length;
                  return {active, details: active ? `${active} locked` : 'none locked'};
                }
                default:
                  return {active: false, details: null};
              }
            })() as {active: boolean; details: string | null};
            return html`
              <div
                class="chip ${path}"
                @click=${() => this.navigate(path)}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.navigate(path);
                  }
                }}
                tabindex="0"
                role="button"
                aria-label="View ${title}"
              >
                <ha-icon .icon=${icons[path] || 'mdi:home-assistant'} class=${active ? 'active' : ''}></ha-icon>
                <div class="chip-content">
                  <div class="chip-title">${title}</div>
                  ${details ? html`<div class="chip-details">${details}</div>` : null}
                </div>
              </div>
            `;
          }
        )}
      </div>
    `;
  }

  private renderEntities(entities: EntityRegistryEntry[]) {
    if (!entities?.length) return null;
    if (entities[0].domain === 'camera') {
      return html`<div class="scrollable-container">
        ${repeat(
          entities,
          (entity) => entity.entity_id,
          // eslint-disable-next-line lit/binding-positions, lit/no-invalid-html
          (entity) => html`<${tiles.get(entity.domain as string)!.tag} .hass=${this.hass} .entity=${entity} .dark=${this.dark} />`
        )}
      </div>`;
    }

    return html`<div class="group-tiles">
      ${repeat(
        entities,
        (entity) => entity.entity_id,
        // eslint-disable-next-line lit/binding-positions, lit/no-invalid-html
        (entity) => html`<${tiles.get(entity.domain as string)!.tag} .hass=${this.hass} .entity=${entity} .dark=${this.dark} />`
      )}
    </div>`;
  }

  private renderSection({title, icon, path, entities}: {title: string; icon?: string | null; path?: string; entities: EntityRegistryEntry[]}) {
    return html`
      <div class="section">
        <div
          class="section-header"
          @click=${path ? () => this.navigate(path) : null}
          @keydown=${path
            ? (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  this.navigate(path);
                }
              }
            : null}
          tabindex=${path && '0'}
          role=${path && 'button'}
          aria-label="${title}"
        >
          ${icon && html`<ha-icon .icon=${icon}></ha-icon>`}
          <span>${title}</span>
          ${path && html`<ha-icon icon="mdi:chevron-right"></ha-icon>`}
        </div>
        ${this.renderEntities(entities)}
      </div>
    `;
  }

  private renderFavorites() {
    const favorites = this.config.favorites as EntityRegistryEntry[] | undefined;
    if (!favorites?.length) return null;
    return this.renderSection({title: 'Favorites', icon: 'mdi:star', entities: favorites});
  }

  private renderAreas() {
    const areas = this.config.areas as AreaRegistryEntry[] | undefined;
    if (!areas?.length) return null;
    return repeat(
      areas,
      (area) => area.area_id,
      (area) => this.renderSection({title: area.name, icon: area.icon, path: `area-${area.area_id}`, entities: area.entities!})
    );
  }

  private renderDomains() {
    const domains = this.config.domains as [string[], EntityRegistryEntry[]][] | undefined;
    if (!domains?.length) return null;
    return repeat(
      domains,
      ([domain]) => domain[0],
      ([[domain, title], entities]) => this.renderSection({title, path: domain, entities})
    );
  }

  private renderCameras() {
    const cameras = this.config.cameras as EntityRegistryEntry[] | undefined;
    if (!cameras?.length) return null;
    return this.renderSection({title: 'Cameras', icon: 'mdi:camera', entities: cameras});
  }

  private renderSensors() {
    const sensors = this.config.sensors as EntityRegistryEntry[] | undefined;
    if (!sensors?.length) return null;
    const states = sensors.reduce((states, entity) => {
      const state = this.hass.states[entity.entity_id];
      if (state?.attributes?.device_class && !states.get(state.attributes.device_class)?.push(state)) states.set(state.attributes.device_class, [state]);
      return states;
    }, new Map<string, HassEntity[]>());
    const types = ['temperature', 'humidity'].reduce(
      (types, type) => {
        const values = states?.get(type);
        if (values?.length) {
          const numbers = values.map((state) => Number(state.state)).filter((v) => !isNaN(v));
          if (numbers.length) {
            const min = Math.min(...numbers);
            const max = Math.max(...numbers);
            const unit = type == 'temperature' ? '°' : values[0].attributes.unit_of_measurement || '';
            types.push([type, min === max ? `${min}${unit}` : `${min}${unit}-${max}${unit}`]);
          }
        }
        return types;
      },
      [] as [string, string][]
    );
    if (!types?.length) return null;

    return html`
      <div class="sensors-container">
        <div class="sensors-list">
          ${repeat(
            types,
            (type) => type[0],
            ([type, value]) => html`
              <div class="sensor-chip">
                <ha-icon .icon=${{temperature: 'mdi:thermometer', humidity: 'mdi:water-percent'}[type]} class=${type}></ha-icon>
                <span class="sensor-value">${value}</span>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  public setConfig(config: LovelaceCardConfig) {
    this.config = config;
    this.dark = config.settings.dark_mode ?? false;
    this.requestUpdate();
  }

  render() {
    if (!this.hass) return null;
    return html`
      <div class="container">
        <div class="header-row">
          <div class="settings-button" @click=${this.openSettings} @keydown=${this.openSettings} tabindex="0" role="button" aria-label="Open settings">
            <ha-icon icon="mdi:cog"></ha-icon>
          </div>
        </div>
        ${this.renderChips() || this.renderSensors()}
        <div class="sections">${this.renderFavorites()} ${this.renderAreas()} ${this.renderCameras()} ${this.renderDomains()}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'novik-view': View;
  }
  interface HASSDomEvents {
    'location-changed': {
      replace: boolean;
    };
  }
}
