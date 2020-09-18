import { AddBox as AddBoxIcon, Explore as ExploreIcon, Fingerprint as FingerprintIcon, Home as HomeIcon, Loyalty as LoyaltyIcon } from '@material-ui/icons';
import React from 'react';
import { CausesPage, CommunityPage, FeedPage, HomePage, PersonProfilePage, PersonQueryPage, StatePage, TimelinePage, TransactionAddedPage, SignUpPage } from '../../pages';
import { DrawerListItem, DrawerSections, RouteItem } from '../../types';

export const defaultDrawerListItemIcon: JSX.Element = <AddBoxIcon />;
export const subStrCode = (code: string) => code.substr(0, 28);

export enum RoutePaths {
  HOME = '/',
  PERSONQUERY = '/personquery',
  PROFILE = '/profile',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  STATE = '/state',
  TRANSACTION = '/transaction',
  TIMELINE = '/timeline',
  FEED = '/feed',
  CAUSES = '/causes',
  COMMUNITY = '/community'
}

// route
export const routes: RouteItem[] = [
  // SECTION0
  {
    label: 'Home',
    path: RoutePaths.HOME,
    component: HomePage,
    section: DrawerSections.SECTION0,
    drawerIcon: <HomeIcon />,
    exact: true,
  },
  // SECTION1
  {
    label: 'Profile',
    path: RoutePaths.PROFILE,
    component: PersonProfilePage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
    // visible: true,
  },
  {
    label: 'Persons',
    path: RoutePaths.PERSONQUERY,
    component: PersonQueryPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  {
    label: 'Transaction',
    path: RoutePaths.TRANSACTION,
    component: TransactionAddedPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  {
    label: 'TimeLine',
    path: RoutePaths.TIMELINE,
    component: TimelinePage,
    section: DrawerSections.SECTION1,
  },
  {
    label: 'SignUp',
    path: RoutePaths.SIGNUP,
    component: SignUpPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  {
    label: 'State',
    path: RoutePaths.STATE,
    component: StatePage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  // SECTION2
  {
    label: 'Feed',
    path: RoutePaths.FEED,
    component: FeedPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <FingerprintIcon />,
  },
  {
    label: 'Causes',
    path: RoutePaths.CAUSES,
    component: CausesPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <ExploreIcon />,
  },
  {
    label: 'Community',
    path: RoutePaths.COMMUNITY,
    component: CommunityPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <LoyaltyIcon />,
  },
];

// drawer appShell
export const drawerCategories: DrawerListItem[] = routes.map((e: RouteItem) => {
  return { label: e.label, path: e.path, section: e.section, icon: e.drawerIcon, visible: e.visible }
});
