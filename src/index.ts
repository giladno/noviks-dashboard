import type {HassConfig, MessageBase} from 'home-assistant-js-websocket';
import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {HomeAssistant} from 'types/ha';
import {Strategy} from './strategy';

const data = new Map(
  Object.entries(import.meta.glob('./test/*.json', {eager: true})).map(([path, module]) => [
    path.split('/').pop()!.replace('.json', ''),
    (module as any).default,
  ])
);

@customElement('ha-icon')
export class Icon extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      width: var(--mdc-icon-size, 24px);
      height: var(--mdc-icon-size, 24px);
      font-size: var(--mdc-icon-size);
      line-height: 1;
    }
  `;
  @property({type: String, reflect: true}) icon!: string;

  firstUpdated() {
    const mdi = document.querySelector('#mdi')!.cloneNode() as HTMLLinkElement;
    mdi.id = '';
    this.renderRoot.prepend(mdi);
  }

  render() {
    return html`<span class="mdi ${this.icon.replace(':', '-')}"></span>`;
  }
}

const hass = new (class implements HomeAssistant {
  private readonly key = 'novik-dashboard-config';

  config = {} as HassConfig;
  states = data.get('states');

  async callService(domain: string, service: string, serviceData?: {[key: string]: any}) {
    console.log('callService', domain, service, serviceData);
  }

  async callWS<T>(msg: MessageBase) {
    switch (msg.type) {
      case 'lovelace/config':
        return JSON.parse(localStorage.getItem(this.key) || '{}');
      case 'lovelace/config/save':
        return localStorage.setItem(this.key, JSON.stringify(msg.config));
      case 'config/area_registry/list':
        return data.get('areas') as T;
      case 'config/device_registry/list':
        return [] as T;
      case 'config/entity_registry/list':
        return data.get('entities') as T;
      default:
        console.log('callWS', msg);
        return null as T;
    }
  }
  panelUrl = 'dashboard';
})();

const {views} = await Strategy.generate({}, hass);

function loadView() {
  const path = location.pathname.split('/').pop() || 'home';
  const app = document.createElement('novik-view');
  app.id = 'app';
  app.setConfig(views.find((v) => v.path === path)!.cards[0]);
  app.hass = hass;
  document.getElementById('app')!.replaceWith(app);
}

window.addEventListener('popstate', loadView);

const {pushState} = history;
history.pushState = function (...args) {
  pushState.apply(this, args);
  loadView();
};

history.pushState({}, '', ['', hass.panelUrl, views[0].path].join('/'));
