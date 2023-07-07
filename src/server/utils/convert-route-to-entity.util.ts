const mapping: Record<string, string> = {
  catalogs: 'catalog',
  companies: 'company',
  projects: 'project',
  resources: 'resource',
  reviews: 'review',
  suppliers: 'supplier',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
