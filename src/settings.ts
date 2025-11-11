import {css, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import type {HomeAssistant} from 'types/ha';
import {NovikSettings, Registry} from 'types/settings';
import {tiles} from './view';

@customElement('novik-settings')
export default class Settings extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    }

    :host([dark]) .overlay {
      background: rgba(0, 0, 0, 0.7);
    }

    .modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 600px;
      max-height: 80vh;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      animation: slideIn 0.3s ease;
    }

    :host([dark]) .modal {
      background: rgba(30, 30, 30, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
    }

    :host([dark]) .header {
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .close-button {
      color: rgba(255, 255, 255, 0.6);
    }

    .close-button:hover {
      background: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.9);
    }

    :host([dark]) .close-button:hover {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.9);
    }

    .close-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .content {
      color: rgba(255, 255, 255, 0.87);
    }

    .content::-webkit-scrollbar {
      width: 8px;
    }

    .content::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }

    :host([dark]) .content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    .content::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    :host([dark]) .content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
    }

    .content::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    :host([dark]) .content::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideIn {
      from {
        transform: translate(-50%, -50%) scale(0.9);
        opacity: 0;
      }
      to {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .modal {
        width: 95%;
        max-height: 90vh;
        border-radius: 12px;
      }

      .header {
        padding: 12px;
      }

      .content {
        padding: 16px;
      }
    }

    @media (max-width: 480px) {
      .modal {
        width: 100%;
        height: 100%;
        max-height: 100vh;
        border-radius: 0;
        top: 0;
        left: 0;
        transform: none;
      }

      @keyframes slideIn {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) h2 {
      color: rgba(255, 255, 255, 0.95);
    }

    .setting-section {
      margin-bottom: 24px;
      background: rgba(0, 0, 0, 0.03);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      overflow: visible;
      transition: all 0.2s ease;
    }

    :host([dark]) .setting-section {
      background: rgba(255, 255, 255, 0.03);
      border-color: rgba(255, 255, 255, 0.08);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s ease;
    }

    .section-header:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    :host([dark]) .section-header:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .section-header ha-icon {
      --mdc-icon-size: 24px;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .section-header ha-icon {
      color: rgba(255, 255, 255, 0.6);
    }

    .section-title {
      flex: 1;
      font-size: 1.125rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .section-title {
      color: rgba(255, 255, 255, 0.9);
    }

    .section-chevron {
      --mdc-icon-size: 20px;
      transition: transform 0.2s ease;
      color: rgba(0, 0, 0, 0.4);
    }

    :host([dark]) .section-chevron {
      color: rgba(255, 255, 255, 0.4);
    }

    .section-chevron.expanded {
      transform: rotate(180deg);
    }

    .section-content {
      padding: 0;
      display: none;
    }

    .section-content.expanded {
      display: block;
      padding: 16px;
    }

    .domain-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .domain-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    :host([dark]) .domain-item {
      background: rgba(255, 255, 255, 0.05);
    }

    .domain-item:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    :host([dark]) .domain-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .domain-item ha-icon {
      --mdc-icon-size: 20px;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .domain-item ha-icon {
      color: rgba(255, 255, 255, 0.6);
    }

    .domain-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .domain-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .domain-name {
      color: rgba(255, 255, 255, 0.9);
    }

    .domain-key {
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.5);
      font-family: monospace;
    }

    :host([dark]) .domain-key {
      color: rgba(255, 255, 255, 0.5);
    }

    .checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border-radius: 4px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      transition: all 0.2s ease;
    }

    :host(:not([dark])) .checkbox {
      border: 2px solid rgba(0, 0, 0, 0.4);
      background: white;
    }

    :host([dark]) .checkbox {
      border: 2px solid rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.05);
    }

    .checkbox:checked {
      border-color: #2196f3;
    }

    :host(:not([dark])) .checkbox:checked {
      background: #2196f3;
    }

    :host([dark]) .checkbox:checked {
      background: #2196f3;
    }

    .checkbox:checked::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 1px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
      display: block;
    }

    .entity-search-container {
      position: relative;
      margin-bottom: 16px;
    }

    .entity-search {
      width: 100%;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.87);
      outline: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    :host([dark]) .entity-search {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.9);
    }

    .entity-search:focus {
      border-color: #2196f3;
      background: rgba(255, 255, 255, 0.8);
    }

    :host([dark]) .entity-search:focus {
      background: rgba(255, 255, 255, 0.1);
    }

    .entity-search::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }

    :host([dark]) .entity-search::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    .entity-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      max-height: 300px;
      overflow-y: auto;
      z-index: 1001;
    }

    :host([dark]) .entity-dropdown {
      background: rgba(30, 30, 30, 0.98);
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }

    .entity-dropdown-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .entity-dropdown-item:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    :host([dark]) .entity-dropdown-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .entity-dropdown-item ha-icon {
      --mdc-icon-size: 20px;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .entity-dropdown-item ha-icon {
      color: rgba(255, 255, 255, 0.6);
    }

    .entity-dropdown-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .entity-dropdown-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([dark]) .entity-dropdown-name {
      color: rgba(255, 255, 255, 0.9);
    }

    .entity-dropdown-id {
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.5);
      font-family: monospace;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([dark]) .entity-dropdown-id {
      color: rgba(255, 255, 255, 0.5);
    }

    .entity-badge {
      padding: 2px 8px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      font-size: 0.625rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .entity-badge {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.6);
    }

    .entity-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .entity-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: rgba(33, 150, 243, 0.1);
      border: 1px solid rgba(33, 150, 243, 0.3);
      border-radius: 16px;
      font-size: 0.75rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .entity-chip {
      background: rgba(33, 150, 243, 0.15);
      border-color: rgba(33, 150, 243, 0.4);
      color: rgba(255, 255, 255, 0.9);
    }

    .entity-chip ha-icon {
      --mdc-icon-size: 14px;
      color: rgba(33, 150, 243, 0.8);
    }

    :host([dark]) .entity-chip ha-icon {
      color: rgba(33, 150, 243, 1);
    }

    .chip-remove {
      --mdc-icon-size: 16px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.5);
      transition: color 0.2s ease;
    }

    :host([dark]) .chip-remove {
      color: rgba(255, 255, 255, 0.5);
    }

    .chip-remove:hover {
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .chip-remove:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    .area-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .area-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      transition: all 0.2s ease;
      cursor: move;
      min-height: 44px;
    }

    :host([dark]) .area-item {
      background: rgba(255, 255, 255, 0.05);
    }

    .area-item:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.01);
    }

    :host([dark]) .area-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .area-item.dragging {
      opacity: 0.5;
    }

    .area-item.drag-over {
      border: 2px dashed #2196f3;
    }

    .drag-handle {
      --mdc-icon-size: 20px;
      color: rgba(0, 0, 0, 0.3);
      cursor: move;
      touch-action: none;
    }

    :host([dark]) .drag-handle {
      color: rgba(255, 255, 255, 0.3);
    }

    .area-icon {
      --mdc-icon-size: 20px;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .area-icon {
      color: rgba(255, 255, 255, 0.6);
    }

    .area-name {
      flex: 1;
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .area-name {
      color: rgba(255, 255, 255, 0.9);
    }

    .visibility-toggle {
      --mdc-icon-size: 20px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.4);
      transition: color 0.2s ease;
    }

    :host([dark]) .visibility-toggle {
      color: rgba(255, 255, 255, 0.4);
    }

    .visibility-toggle:hover {
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .visibility-toggle:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    .visibility-toggle.hidden {
      color: #f44336;
    }

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    :host([dark]) .setting-item {
      background: rgba(255, 255, 255, 0.05);
    }

    .setting-item:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    :host([dark]) .setting-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .setting-label {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .setting-label-text {
      font-size: 0.875rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .setting-label-text {
      color: rgba(255, 255, 255, 0.9);
    }

    .setting-label-description {
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.5);
    }

    :host([dark]) .setting-label-description {
      color: rgba(255, 255, 255, 0.5);
    }

    .toggle-switch {
      position: relative;
      width: 44px;
      height: 24px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    :host([dark]) .toggle-switch {
      background: rgba(255, 255, 255, 0.2);
    }

    .toggle-switch.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
    }

    :host([dark]) .toggle-switch.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 2px 12px rgba(102, 126, 234, 0.6);
    }

    .toggle-slider {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .toggle-switch.active .toggle-slider {
      transform: translateX(20px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .copyright {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      text-align: center;
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.75rem;
    }

    :host([dark]) .copyright {
      border-top-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.5);
    }

    .copyright a {
      color: #2196f3;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .copyright a:hover {
      color: #1976d2;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .content {
        padding: 16px;
      }

      h2 {
        font-size: 1.25rem;
        margin-bottom: 16px;
      }

      .setting-section {
        margin-bottom: 16px;
      }

      .section-header {
        padding: 12px;
      }

      .section-content {
        padding: 0;
      }

      .section-content.expanded {
        padding: 12px;
      }
    }
  `;

  @property({type: Object}) hass!: HomeAssistant;
  @property({type: Object}) registry!: Registry;
  @property({type: Object}) settings!: NovikSettings;
  @property({type: Boolean, reflect: true}) dark = false;

  @state() private expandedSection: string | null = null;
  @state() private entitySearch: string = '';
  @state() private draggedAreaIndex: number | null = null;
  @state() private saveTimeout: number | null = null;

  get areas() {
    const areas = [...this.registry.areas];
    return this.settings.area_order.length
      ? areas.sort((a, b) => {
          const aIndex = this.settings.area_order!.indexOf(a.area_id);
          const bIndex = this.settings.area_order!.indexOf(b.area_id);
          if (aIndex === bIndex) return a.name.localeCompare(b.name);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        })
      : areas;
  }

  public static show({hass, registry, settings}: {hass: HomeAssistant; registry: Registry; settings: NovikSettings}) {
    const el = document.createElement('novik-settings');
    el.hass = hass;
    el.registry = registry;
    el.settings = {
      dark_mode: settings.dark_mode ?? false,
      excluded_domains: Array.from(settings.excluded_domains || []),
      excluded_entities: Array.from(settings.excluded_entities || []),
      favorites: Array.from(settings.favorites || []),
      area_order: Array.from(settings.area_order || []),
      hidden_areas: Array.from(settings.hidden_areas || []),
    };
    el.dark = settings.dark_mode ?? false;
    document.body.appendChild(el);
  }

  connectedCallback() {
    super.connectedCallback();
    document.body.style.overflow = 'hidden';
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.style.overflow = '';
    clearTimeout(this.saveTimeout || undefined);
    this.save().then(() => window.dispatchEvent(new CustomEvent('location-changed', {bubbles: true, composed: true})));
  }

  private toggleSection(sectionId: string) {
    this.expandedSection = this.expandedSection === sectionId ? null : sectionId;
    this.entitySearch = '';
  }

  private toggleDomain(domain: string) {
    const index = this.settings.excluded_domains.indexOf(domain);
    if (index >= 0) {
      this.settings.excluded_domains.splice(index, 1);
    } else {
      this.settings.excluded_domains.push(domain);
    }
    this.requestUpdate();
    this.debouncedSave();
  }

  private toggleArea(areaId: string) {
    const index = this.settings.hidden_areas.indexOf(areaId);
    if (index >= 0) {
      this.settings.hidden_areas.splice(index, 1);
    } else {
      this.settings.hidden_areas.push(areaId);
    }
    this.requestUpdate();
    this.debouncedSave();
  }

  private toggleDarkMode(e: Event) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
    }
    this.settings.dark_mode = !this.settings.dark_mode;
    this.dark = this.settings.dark_mode;
    this.requestUpdate();
    this.debouncedSave();
  }

  private onDragOver(e: DragEvent) {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
  }

  private onDragEnd() {
    this.draggedAreaIndex = null;
  }

  private debouncedSave() {
    clearTimeout(this.saveTimeout || undefined);
    this.saveTimeout = window.setTimeout(() => this.save(), 300);
  }

  private async save() {
    const config = await this.hass.callWS<any>({type: 'lovelace/config', url_path: this.hass.panelUrl});
    await this.hass.callWS({
      type: 'lovelace/config/save',
      url_path: this.hass.panelUrl,
      config: {...config, settings: this.settings},
    });
  }

  private renderGeneral() {
    return html`
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-label-text">Dark Mode</div>
          <div class="setting-label-description">Toggle between light and dark theme</div>
        </div>
        <div
          class="toggle-switch ${this.settings.dark_mode ? 'active' : ''}"
          @click=${this.toggleDarkMode}
          @keydown=${this.toggleDarkMode}
          tabindex="0"
          role="switch"
          aria-checked="${this.settings.dark_mode}"
          aria-label="Dark mode toggle"
        >
          <div class="toggle-slider"></div>
        </div>
      </div>
    `;
  }

  private renderDomains() {
    return html`
      <div class="domain-list">
        ${repeat(
          Array.from(tiles.values()).sort((a, b) => a.order - b.order),
          (tile) => tile.domain,
          (tile) => html`
            <div class="domain-item">
              <label for="domain-${tile.domain}" style="display: contents;">
                <ha-icon icon="${tile.icon}"></ha-icon>
                <div class="domain-info">
                  <div class="domain-name">${tile.title}</div>
                  <div class="domain-key">${tile.domain}</div>
                </div>
              </label>
              <input
                type="checkbox"
                class="checkbox"
                .checked=${!this.settings.excluded_domains.includes(tile.domain)}
                @change=${() => this.toggleDomain(tile.domain)}
                id="domain-${tile.domain}"
                aria-label="Include ${tile.title}"
              />
            </div>
          `
        )}
      </div>
    `;
  }

  private renderEntities({sectionId, placeholder, selected}: {sectionId: string; placeholder: string; selected: string[]}) {
    const entities = [];
    if (this.expandedSection === sectionId && this.entitySearch.length >= 2) {
      const search = this.entitySearch.toLowerCase();
      entities.push(
        ...this.registry.entities
          .filter((entity) => {
            if (selected.includes(entity.entity_id)) return false;
            if (!tiles.has(entity.domain ?? '')) return false;
            return (entity.name || entity.original_name || '').toLowerCase().includes(search) || entity.entity_id.toLowerCase().includes(search);
          })
          .slice(0, 10)
      );
    }
    const selectedEntities = selected.map((id) => this.registry.entities.find((e) => e.entity_id === id)).filter(Boolean);

    return html`
      <div class="entity-search-container">
        <input
          type="text"
          class="entity-search"
          .value=${this.expandedSection === sectionId ? this.entitySearch : ''}
          @input=${(e: Event) => void (this.entitySearch = (e.target as HTMLInputElement).value)}
          placeholder=${placeholder}
          aria-label=${placeholder}
        />
        ${entities.length
          ? html`
              <div class="entity-dropdown">
                ${repeat(
                  entities,
                  (entity) => entity.entity_id,
                  (entity) => {
                    const domain = entity.domain!;
                    return html`
                      <div
                        class="entity-dropdown-item"
                        @keydown=${null}
                        @click=${() => {
                          const index = selected.indexOf(entity.entity_id);
                          if (index >= 0) return;
                          selected.push(entity.entity_id);
                          this.entitySearch = '';
                          this.requestUpdate();
                          this.debouncedSave();
                        }}
                      >
                        <ha-icon .icon=${entity.icon || tiles.get(domain)?.icon || `mdi:${entity.domain!}`}></ha-icon>
                        <div class="entity-dropdown-info">
                          <div class="entity-dropdown-name">${entity.name || entity.original_name || entity.entity_id}</div>
                          <div class="entity-dropdown-id">${entity.entity_id}</div>
                        </div>
                        <div class="entity-badge">${entity.area?.name}</div>
                      </div>
                    `;
                  }
                )}
              </div>
            `
          : null}
      </div>
      ${selectedEntities.length
        ? html`
            <div class="entity-chips">
              ${repeat(
                selectedEntities,
                (entity) => entity!.entity_id,
                (entity) => {
                  const domain = entity!.domain!;
                  return html`
                    <div class="entity-chip">
                      <ha-icon .icon=${entity!.icon || tiles.get(domain)?.icon || `mdi:${domain}`}></ha-icon>
                      <span>${entity!.name || entity!.original_name || entity!.entity_id}</span>
                      <ha-icon
                        class="chip-remove"
                        icon="mdi:close"
                        @click=${() => {
                          const index = selected.indexOf(entity!.entity_id);
                          if (index === -1) return;
                          selected.splice(index, 1);
                          this.entitySearch = '';
                          this.requestUpdate();
                          this.debouncedSave();
                        }}
                      ></ha-icon>
                    </div>
                  `;
                }
              )}
            </div>
          `
        : null}
    `;
  }

  private renderAreas() {
    return html`
      <div class="area-list">
        ${repeat(
          this.areas,
          (area) => area.area_id,
          (area, index) => {
            const hidden = this.settings.hidden_areas!.includes(area.area_id);
            return html`
              <div
                class="area-item ${this.draggedAreaIndex === index ? 'dragging' : ''}"
                draggable="true"
                @dragstart=${(e: DragEvent) => {
                  this.draggedAreaIndex = index;
                  e.dataTransfer!.effectAllowed = 'move';
                }}
                @dragover=${this.onDragOver}
                @drop=${(e: DragEvent) => {
                  e.preventDefault();
                  if (this.draggedAreaIndex === null) return;

                  const sortedAreas = this.areas;
                  const [draggedArea] = sortedAreas.splice(this.draggedAreaIndex, 1);
                  sortedAreas.splice(index, 0, draggedArea);

                  this.settings.area_order = sortedAreas.map((a) => a.area_id);
                  this.draggedAreaIndex = null;
                  this.requestUpdate();
                  this.debouncedSave();
                }}
                @dragend=${this.onDragEnd}
              >
                <ha-icon class="drag-handle" icon="mdi:drag-vertical"></ha-icon>
                <ha-icon class="area-icon" .icon=${area.icon || 'mdi:home'}></ha-icon>
                <div class="area-name">${area.name}</div>
                <ha-icon
                  class="visibility-toggle ${hidden ? 'hidden' : ''}"
                  .icon=${hidden ? 'mdi:eye-off' : 'mdi:eye'}
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this.toggleArea(area.area_id);
                  }}
                  aria-label="${hidden ? 'Show' : 'Hide'} ${area.name}"
                  tabindex="0"
                  role="button"
                ></ha-icon>
              </div>
            `;
          }
        )}
      </div>
    `;
  }

  private renderSection(id: string, title: string, icon: string, content: any) {
    const expanded = this.expandedSection === id;
    return html`
      <div class="setting-section">
        <div
          class="section-header"
          @click=${() => this.toggleSection(id)}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.toggleSection(id);
            }
          }}
          tabindex="0"
          role="button"
          aria-expanded="${expanded}"
          aria-controls="section-${id}"
        >
          <ha-icon .icon=${icon}></ha-icon>
          <div class="section-title">${title}</div>
          <ha-icon class="section-chevron ${expanded ? 'expanded' : ''}" icon="mdi:chevron-down"></ha-icon>
        </div>
        <div class="section-content ${expanded ? 'expanded' : ''}" id="section-${id}" role="region" aria-labelledby="section-header-${id}">${content}</div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="overlay">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <div class="header">
            <h2 id="settings-title">Settings</h2>
            <button class="close-button" @click=${this.remove} aria-label="Close settings" tabindex="0">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="content">
            ${this.renderSection('general', 'General', 'mdi:cog', this.renderGeneral())}
            ${this.renderSection('areas', 'Area Ordering', 'mdi:sort', this.renderAreas())}
            ${this.renderSection('domains', 'Available Domains', 'mdi:apps', this.renderDomains())}
            ${this.renderSection(
              'excluded',
              'Excluded Entities',
              'mdi:eye-off',
              this.renderEntities({
                sectionId: 'excluded',
                placeholder: 'Search entities to exclude...',
                selected: this.settings.excluded_entities,
              })
            )}
            ${this.renderSection(
              'favorites',
              'Favorites',
              'mdi:star',
              this.renderEntities({
                sectionId: 'favorites',
                placeholder: 'Search entities to add as favorites...',
                selected: this.settings.favorites,
              })
            )}
            <div class="copyright">
              <div>&copy; ${new Date().getFullYear()} Novik's Dashboard</div>
              <div style="margin-top: 4px;">
                <a href="#" target="_blank" rel="noopener noreferrer">View on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'novik-settings': Settings;
  }
}
