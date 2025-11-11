import type {AreaRegistryEntry, DeviceRegistryEntry, EntityRegistryEntry} from './ha';

export interface Registry {
  areas: AreaRegistryEntry[];
  devices: DeviceRegistryEntry[];
  entities: EntityRegistryEntry[];
}

export interface NovikSettings {
  dark_mode: boolean;
  excluded_domains: string[];
  excluded_entities: string[];
  favorites: string[];
  area_order: string[];
  hidden_areas: string[];
}
