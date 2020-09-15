import { AddBox as AddBoxIcon, Explore as ExploreIcon, Fingerprint as FingerprintIcon, Home as HomeIcon, Loyalty as LoyaltyIcon } from '@material-ui/icons';
import React from 'react';
import { CausesPage, CommunityPage, FeedPage, HomePage, PersonProfilePage, SignInPage, SignUpPage, StatePage, TransactionAddedPage, PersonQueryPage } from '../../pages';
import { DrawerListItem, DrawerSections, RouteItem } from '../../types';

export const defaultDrawerListItemIcon: JSX.Element = <AddBoxIcon />;
export const subStrCode = (code: string) => code.substr(0, 28);

// TODO: use from env vars
export const drawerWidth: number = 240;
export const drawerTitle: string = 'Koakh Material UI Starter';

// route
export const routes: RouteItem[] = [
  // SECTION0
  {
    label: 'Home',
    path: "/",
    component: HomePage,
    section: DrawerSections.SECTION0,
    drawerIcon: <HomeIcon />,
    exact: true,
  },
  // SECTION1
  {
    label: 'Persons',
    path: "/personquery",
    component: PersonQueryPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  {
    label: 'Profile',
    path: "/profile",
    component: PersonProfilePage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  {
    label: 'SignIn',
    path: "/signin",
    component: SignInPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  {
    label: 'SignUp',
    path: "/signup",
    component: SignUpPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  {
    label: 'State',
    path: "/state",
    component: StatePage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  {
    label: 'Transaction',
    path: "/transaction",
    component: TransactionAddedPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },  
  // SECTION2
  {
    label: 'Feed',
    path: "/feed",
    component: FeedPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <FingerprintIcon />,
  },
  {
    label: "Causes",
    path: "/causes",
    component: CausesPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <ExploreIcon />,
  },
  {
    label: "Community",
    path: "/community",
    component: CommunityPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <LoyaltyIcon />,
  },
];

// drawer appShell
export const drawerCategories: DrawerListItem[] = routes.map((e: RouteItem) => {
  return { label: e.label, path: e.path, section: e.section, icon: e.drawerIcon }
});
