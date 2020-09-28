import { AddBox as AddBoxIcon, Explore as ExploreIcon, Fingerprint as FingerprintIcon, Home as HomeIcon, Loyalty as LoyaltyIcon } from '@material-ui/icons';
import React from 'react';
import { CausesPage, CommunityPage, FeedPage, HomePage, PersonProfilePage, PersonQueryPage, StatePage, TimelinePage, TransactionAddedPage, SignUpPage, SignInPage, SignUpResultPage } from '../../pages';
import { DrawerListItem, DrawerSections, RouteItem } from '../../types';
import { getEnumKeyFromEnumValue } from '../../utils';

export const defaultDrawerListItemIcon: JSX.Element = <AddBoxIcon />;
export const subStrCode = (code: string) => code.substr(0, 28);

export enum RouteKey {
  HOME = 'HOME',
  PERSON_QUERY = 'PERSON_QUERY',
  PROFILE = 'PROFILE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGNUP_RESULT = 'SIGNUP_RESULT',
  STATE = 'STATE',
  TRANSACTIONS = 'TRANSACTIONS',
  TIMELINE = 'TIMELINE',
  FEED = 'FEED',
  CAUSES = 'CAUSES',
  COMMUNITY = 'COMMUNITY',
}

// route
export const routes: Record<RouteKey, RouteItem> = {
  // SECTION0
  [RouteKey.HOME]: {
    title: 'Home',
    label: 'Home',
    path: '/',
    component: HomePage,
    section: DrawerSections.SECTION0,
    drawerIcon: <HomeIcon />,
    exact: true,
  },
  // SECTION1
  [RouteKey.PROFILE]: {
    title: 'Profile',
    label: 'Profile',
    path: '/profile',
    component: PersonProfilePage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
    // visible: true,
  },
  [RouteKey.PERSON_QUERY]: {
    title: 'Persons',
    label: 'Persons',
    path: '/persons',
    component: PersonQueryPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  [RouteKey.TRANSACTIONS]: {
    title: 'Transactions',
    label: 'Transactions',
    path: '/transactions',
    component: TransactionAddedPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  [RouteKey.TIMELINE]: {
    title: 'TimeLine',
    label: 'TimeLine',
    path: '/timeline',
    component: TimelinePage,
    section: DrawerSections.SECTION1,
  },
  [RouteKey.SIGN_IN]: {
    title: 'SignIn',
    label: 'SignIn',
    path: '/signin',
    component: SignInPage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
    visible: false,
  },
  [RouteKey.SIGN_UP]: {
    title: 'SignUp',
    label: 'SignUp',
    path: '/signup',
    component: SignUpPage,
    section: DrawerSections.SECTION1,
    exact: true,
  },
  [RouteKey.SIGNUP_RESULT]: {
    title: 'SignUp Result Page',
    label: 'SignUp Result Page',
    path: '/signup-result',
    component: SignUpResultPage,
    section: DrawerSections.SECTION1,
    exact: true,
    visible: false,
  },
  [RouteKey.STATE]: {
    title: 'State',
    label: 'State',
    path: '/state',
    component: StatePage,
    section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
  },
  // SECTION2
  [RouteKey.FEED]: {
    title: 'Feed',
    label: 'Feed',
    path: '/feed',
    component: FeedPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <FingerprintIcon />,
  },
  [RouteKey.CAUSES]: {
    title: 'Causes',
    label: 'Causes',
    path: '/causes',
    component: CausesPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <ExploreIcon />,
  },
  [RouteKey.COMMUNITY]: {
    title: 'Community',
    label: 'Community',
    path: '/community',
    component: CommunityPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <LoyaltyIcon />,
  }
};

// drawer appShell: convert record to DrawerListItem[]
export const drawerCategories: DrawerListItem[] = [];
for (const key in routes) {
  if (routes.hasOwnProperty(key)) {
    const keyEnum: RouteKey = getEnumKeyFromEnumValue(RouteKey, key);
    drawerCategories.push({
      label: routes[keyEnum].label,
      path: routes[keyEnum].path,
      section: routes[keyEnum].section,
      icon: routes[keyEnum].drawerIcon,
      visible: routes[keyEnum].visible
    });
  }
}
