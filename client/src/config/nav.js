// Single source of truth for the sidebar nav items.
// Icons are inline SVG path data (24x24 viewBox, stroke-based) so no icon
// library dependency is required - see SidebarNav.vue for how these render.
export const navItems = [
  {
    labelKey: 'nav.overview',
    to: '/',
    icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75'
  },
  {
    labelKey: 'nav.inventory',
    to: '/inventory',
    icon: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9'
  },
  {
    labelKey: 'nav.orders',
    to: '/orders',
    icon: 'M9 12h6m-6 4h6M9 4.5V4a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 4v.5m-6 0H7A2.25 2.25 0 004.75 6.75v12.5A2.25 2.25 0 007 21.5h10a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0017 4.5h-2m-6 0h6'
  },
  {
    labelKey: 'nav.finance',
    to: '/spending',
    icon: 'M12 6v12m-3-9.75c0-1.036 1.343-1.875 3-1.875s3 .84 3 1.875-1.343 1.875-3 1.875-3 .84-3 1.875 1.343 1.875 3 1.875 3 .84 3 1.875-1.343 1.875-3 1.875-3-.84-3-1.875'
  },
  {
    labelKey: 'nav.demandForecast',
    to: '/demand',
    icon: 'M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941'
  },
  {
    labelKey: 'nav.reports',
    to: '/reports',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
  }
]
