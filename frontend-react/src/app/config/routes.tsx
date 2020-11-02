import { AccountTree as AccountTreeIcon, AddBox as AddBoxIcon, Apartment as ApartmentIcon, Assessment as AssessmentIcon, DynamicFeed as DynamicFeedIcon, Explore as ExploreIcon, Fingerprint as FingerprintIcon, Home as HomeIcon, Loyalty as LoyaltyIcon, People as PeopleIcon, LocalPlay as LocalPlayIcon } from '@material-ui/icons';
import React from 'react';
import { CausesPage, CauseUpsertForm, CommunityPage, FeedPage, HomePage, ParticipantUpsertForm, PersonProfilePage, PersonQueryPage, PersonUpsertForm, SignInPage, SignUpPage, ResultPage, StatePage, TimelinePage, TransactionAddedPage, TransactionUpsertForm, AssetUpsertForm } from '../../pages';
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
  RESULT_PAGE = 'SIGNUP_RESULT',
  STATE = 'STATE',
  TRANSACTIONS = 'TRANSACTIONS',
  TIMELINE = 'TIMELINE',
  FEED = 'FEED',
  CAUSES = 'CAUSES',
  COMMUNITY = 'COMMUNITY',
  ASSET_UPSERT_FORM = 'ASSET_UPSERT_FORM',
  CAUSE_UPSERT_FORM = 'CAUSE_UPSERT_FORM',
  PARTICIPANT_UPSERT_FORM = 'PARTICIPANT_UPSERT_FORM',
  PERSON_UPSERT_FORM = 'PERSON_UPSERT_FORM',
  TRANSACTION_UPSERT_FORM = 'TRANSACTION_UPSERT_FORM',
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
    drawerIcon: <FingerprintIcon />,
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
    // section: DrawerSections.SECTION1,
    // drawerIcon: USE DEFAULT HERE,
    exact: true,
    visible: false,
  },
  [RouteKey.SIGN_UP]: {
    title: 'SignUp',
    label: 'SignUp',
    path: '/signup',
    component: SignUpPage,
    // section: DrawerSections.SECTION1,
    exact: true,
  },
  [RouteKey.RESULT_PAGE]: {
    title: 'Result Page',
    label: 'Result Page',
    path: '/result-page',
    component: ResultPage,
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
    drawerIcon: <DynamicFeedIcon />,
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
  },
  // SECTION3
  [RouteKey.PERSON_UPSERT_FORM]: {
    title: 'New Person',
    label: 'New Person',
    path: '/new-person',
    component: PersonUpsertForm,
    section: DrawerSections.SECTION3,
    drawerIcon: <PeopleIcon />,
  },
  [RouteKey.PARTICIPANT_UPSERT_FORM]: {
    title: 'New Participant',
    label: 'New Participant',
    path: '/new-participant',
    component: ParticipantUpsertForm,
    section: DrawerSections.SECTION3,
    drawerIcon: <ApartmentIcon />,
  },
  [RouteKey.CAUSE_UPSERT_FORM]: {
    title: 'New Cause',
    label: 'New Cause',
    path: '/new-cause',
    component: CauseUpsertForm,
    section: DrawerSections.SECTION3,
    drawerIcon: <AssessmentIcon />,
  },
  [RouteKey.ASSET_UPSERT_FORM]: {
    title: 'New Asset',
    label: 'New Asset',
    path: '/new-asset',
    component: AssetUpsertForm,
    section: DrawerSections.SECTION3,
    drawerIcon: <LocalPlayIcon />,
  },
  [RouteKey.TRANSACTION_UPSERT_FORM]: {
    title: 'New Transaction',
    label: 'New Transaction',
    path: '/new-transaction',
    component: TransactionUpsertForm,
    section: DrawerSections.SECTION3,
    drawerIcon: <AccountTreeIcon />,
  },
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
