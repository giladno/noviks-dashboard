import type {AreaRegistryEntry, DeviceRegistryEntry, EntityRegistryEntry, HomeAssistant, LovelaceCardConfig} from 'types/ha';
import {NovikSettings} from 'types/settings';
import {View, tiles} from './view';

function entitiesCompareFn(a: EntityRegistryEntry, b: EntityRegistryEntry): number {
  return (
    tiles.get(a.domain!)!.order! - tiles.get(b.domain!)!.order! ||
    String(a.name || a.original_name || a.entity_id).localeCompare(String(b.name || b.original_name || b.entity_id)) ||
    a.entity_id.localeCompare(b.entity_id)
  );
}

function areasCompareFn(a: AreaRegistryEntry, b: AreaRegistryEntry, order: string[]): number {
  if (order.length) {
    const aIndex = order.indexOf(a.area_id);
    const bIndex = order.indexOf(b.area_id);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
  }
  return a.floor_id === b.floor_id ? a.name.localeCompare(b.name) : a.floor_id === null ? 1 : b.floor_id === null ? -1 : a.floor_id!.localeCompare(b.floor_id!);
}

function groupEntities(entities: Map<string, EntityRegistryEntry[]> | EntityRegistryEntry[], other = false) {
  const domainEntities =
    entities instanceof Map
      ? new Map<string, EntityRegistryEntry[]>(entities)
      : entities.reduce((domainEntities, entity) => {
          if (!domainEntities.get(entity.domain!)?.push(entity)) domainEntities.set(entity.domain!, [entity]);
          return domainEntities;
        }, new Map<string, EntityRegistryEntry[]>());
  const groups = [
    ['lights', 'light'],
    ['climate', 'climate', 'fan', 'cover'],
    ['security', 'lock', 'camera'],
  ]
    .map(([path, ...domains]) => [
      [
        path,
        {
          lights: 'Lights',
          climate: 'Climate',
          security: 'Security',
        }[path],
      ],
      domains
        .flatMap((domain) => {
          const entities = domainEntities.get(domain) || [];
          domainEntities.delete(domain);
          return entities;
        })
        .sort(entitiesCompareFn),
    ])
    .filter(([, entities]) => entities.length) as [string[], EntityRegistryEntry[]][];

  if (other) {
    const entities = Array.from(domainEntities.values()).flat().sort(entitiesCompareFn);
    if (entities.length) groups.push([['', 'Other'], entities]);
  }
  return groups;
}

export class Strategy extends HTMLElement {
  static readonly tag = `ll-strategy-dashboard-novik-strategy${import.meta.env.VITE_SUFFIX}`;

  public static async generate(_config: Record<string, any>, hass: HomeAssistant) {
    const [config, areaRegistry, deviceRegistry, entityRegistry] = await Promise.all([
      hass.callWS<any>({type: 'lovelace/config', url_path: hass.panelUrl}).catch(() => ({})),
      hass.callWS<AreaRegistryEntry[]>({type: 'config/area_registry/list'}).catch(() => [] as AreaRegistryEntry[]),
      hass.callWS<DeviceRegistryEntry[]>({type: 'config/device_registry/list'}).catch(() => [] as DeviceRegistryEntry[]),
      hass.callWS<EntityRegistryEntry[]>({type: 'config/entity_registry/list'}).catch(() => [] as EntityRegistryEntry[]),
    ]);
    const registry = {areas: areaRegistry, devices: deviceRegistry, entities: entityRegistry};
    const settings = Object.assign(
      {
        dark_mode: false,
        excluded_domains: [],
        excluded_entities: [],
        favorites: [],
        area_order: [],
        hidden_areas: [],
      },
      (config?.settings as NovikSettings) || {}
    );

    areaRegistry.sort((a, b) => areasCompareFn(a, b, settings.area_order));

    const areas = new Map<string, AreaRegistryEntry>(areaRegistry.map((area) => [area.area_id, {...area, entities: []}]));
    const devices = new Map<string, DeviceRegistryEntry>(deviceRegistry.map((device) => [device.id, device]));
    const entities = new Map<string, EntityRegistryEntry>();

    const domainEntities = new Map<string, EntityRegistryEntry[]>();
    const areaEntities = new Map<string | null, EntityRegistryEntry[]>();

    for (const entry of entityRegistry) {
      const domain = entry.entity_id.match(/^([^.]+)\./)?.[1];
      if (!domain) continue;

      entry.domain = domain;

      if (!tiles.has(domain)) continue;
      if (settings.excluded_domains.includes(domain)) continue;
      if (settings.excluded_entities.includes(entry.entity_id)) continue;

      const device = devices.get(entry.device_id ?? '');
      if (entry.disabled_by || entry.hidden_by || device?.disabled_by) continue;
      const area = areas.get(entry.area_id || device?.area_id || '');
      if (!area) continue;

      if (settings.hidden_areas?.includes(area.area_id)) continue;

      area.entities!.push(entry);
      entry.area = area;
      entities.set(entry.entity_id, entry);
      if (!domainEntities.get(domain)?.push(entry)) domainEntities.set(domain, [entry]);
      if (!areaEntities.get(area?.area_id || null)?.push(entry)) areaEntities.set(area?.area_id || null, [entry]);
    }

    const shortcuts = groupEntities(domainEntities);

    const views: {title?: string; path?: string; panel?: boolean; subview?: boolean; cards: LovelaceCardConfig[]}[] = [
      {
        title: 'Home',
        path: 'home',
        panel: true,
        cards: [
          {
            type: `custom:${View.tag}`,
            panelType: 'dashboard',
            settings,
            registry,
            chips: shortcuts,
            favorites: settings.favorites.map((id) => entities.get(id)).filter(Boolean) as EntityRegistryEntry[],
            cameras: domainEntities.get('camera')?.sort(entitiesCompareFn),
            areas: areaRegistry
              .filter((area) => areaEntities.get(area.area_id))
              .map((area) => ({
                ...area,
                entities: areaEntities
                  .get(area.area_id)!
                  .filter((entity) => entity.domain !== 'camera')
                  .sort(entitiesCompareFn),
              })),
          },
        ],
      },
    ];

    for (const [domain, entities] of shortcuts) {
      if (!entities.sort(entitiesCompareFn).length) continue;
      views.push({
        title: domain[1],
        path: domain[0],
        panel: true,
        subview: true,
        cards: [
          {
            type: `custom:${View.tag}`,
            panelType: 'domain',
            settings,
            registry,
            domain: domain[0],
            areas: Array.from(
              entities
                .reduce((areas, entity) => {
                  const {area} = entity;
                  if (!areas.get(area!.area_id)?.entities!.push(entity)) {
                    areas.set(area!.area_id, {
                      ...area!,
                      entities: [entity],
                    });
                  }
                  return areas;
                }, new Map<string, AreaRegistryEntry>())
                .values()
            ).sort((a, b) => areasCompareFn(a, b, settings.area_order)),
          },
        ],
      });
    }

    for (const area of areaRegistry) {
      const entities = areaEntities.get(area.area_id);
      if (!entities?.length) continue;
      views.push({
        title: area.name,
        path: `area-${area.area_id}`,
        panel: true,
        subview: true,
        cards: [
          {
            type: `custom:${View.tag}`,
            panelType: 'area',
            settings,
            registry,
            area,
            sensors: entities.filter((entity) => entity.domain === 'sensor'),
            domains: groupEntities(entities, true),
          },
        ],
      });
    }
    return {views};
  }
}

customElements.define(Strategy.tag, Strategy);
