import type {HassConfig, HassEntities, MessageBase} from 'home-assistant-js-websocket';
import {NovikSettings, Registry} from './settings';

export interface AreaRegistryEntry {
  area_id: string;
  entities?: EntityRegistryEntry[];
  floor_id?: string | null;
  icon?: string | null;
  name: string;
}

export interface DeviceRegistryEntry {
  area_id: string | null;
  disabled_by: 'user' | 'integration' | 'config_entry' | null;
  id: string;
}

export interface EntityRegistryEntry {
  area_id?: string | null;
  area?: AreaRegistryEntry | null;
  device_id?: string | null;
  disabled_by?: 'user' | 'integration' | 'config_entry' | null;
  domain?: string;
  entity_id: string;
  hidden_by?: 'user' | 'integration' | null;
  icon?: string | null;
  name?: string | null;
  original_name?: string | null;
}

export interface LovelaceCardConfig {
  panelType: 'dashboard' | 'area' | 'domain';
  registry: Registry;
  settings: NovikSettings;
  type: 'custom:novik-view';
  [key: string]: any;
}

export interface HomeAssistant {
  callService: (domain: string, service: string, serviceData?: {[key: string]: any}) => Promise<void>;
  callWS: <T>(msg: MessageBase) => Promise<T>;
  config: HassConfig;
  panelUrl: string;
  states: HassEntities;
}
