import type {AreaRegistryEntry} from 'types/ha';

export const specialAreas = new Map<string, AreaRegistryEntry & {order: number}>([
  [':favorites', {area_id: ':favorites', name: 'Favorites', icon: 'mdi:star', floor_id: null, order: -1}],
  [':cameras', {area_id: ':cameras', name: 'Cameras', icon: 'mdi:cctv', floor_id: null, order: 1}],
]);

export function areasCompareFn(a: AreaRegistryEntry, b: AreaRegistryEntry, order: string[]): number {
  if (order.length) {
    const aIndex = order.indexOf(a.area_id);
    const bIndex = order.indexOf(b.area_id);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
  }

  const aOrder = specialAreas.get(a.area_id)?.order ?? 0;
  const bOrder = specialAreas.get(b.area_id)?.order ?? 0;
  if (aOrder) return aOrder - bOrder;
  if (bOrder) return -bOrder;

  return a.floor_id === b.floor_id ? a.name.localeCompare(b.name) : a.floor_id === null ? 1 : b.floor_id === null ? -1 : a.floor_id!.localeCompare(b.floor_id!);
}
