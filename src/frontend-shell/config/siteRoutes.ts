export const ROUTES = {
  home: '/',
  selection: '/selection',
  selectionArchive: '/selection/archive',
  selectionDetail: '/selection/:slug',
  standards: '/standards',
  cultivation: '/cultivation',
  membership: '/membership',
  support: '/support',
  story: '/story',
  login: '/login',
  account: '/account',
  applicationDetail: '/account/applications/:id',
} as const;

export const PUBLIC_NAV_ITEMS = [
  { label: 'Selection', to: ROUTES.selection },
  { label: 'Standards', to: ROUTES.standards },
  { label: 'Cultivation', to: ROUTES.cultivation },
  { label: 'Membership', to: ROUTES.membership },
  { label: 'Support', to: ROUTES.support },
  { label: 'Story', to: ROUTES.story },
] as const;

export const LEGACY_RETIRED_ROUTES = [
  { legacyPath: '/collection', replacementTo: ROUTES.selection, replacementLabel: 'Selection' },
  { legacyPath: '/collection/:id', replacementTo: ROUTES.selection, replacementLabel: 'Selection' },
  { legacyPath: '/learn', replacementTo: ROUTES.standards, replacementLabel: 'Standards' },
  { legacyPath: '/about', replacementTo: ROUTES.story, replacementLabel: 'Story' },
  { legacyPath: '/business', replacementTo: ROUTES.support, replacementLabel: 'Support' },
  { legacyPath: '/member', replacementTo: ROUTES.account, replacementLabel: 'Account' },
  { legacyPath: '/posts', replacementTo: ROUTES.story, replacementLabel: 'Story' },
  { legacyPath: '/posts/:slug', replacementTo: ROUTES.story, replacementLabel: 'Story' },
] as const;
