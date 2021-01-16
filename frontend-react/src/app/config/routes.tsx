import { AccountTree as AccountTreeIcon, AddBox as AddBoxIcon, Apartment as ApartmentIcon, Assessment as AssessmentIcon, DynamicFeed as DynamicFeedIcon, Explore as ExploreIcon, Fingerprint as FingerprintIcon, Home as HomeIcon, LocalMall as LocalMallIcon, LocalPlay as LocalPlayIcon, Loyalty as LoyaltyIcon, People as PeopleIcon } from '@material-ui/icons';
import React from 'react';
import { AssetsQueryPage, AssetUpsertForm, CausesQueryPage, CauseUpsertForm, DashBoardPage, UseCasesPage, FeedPage, HomePage, ParticipantsQueryPage, ParticipantUpsertForm, PersonProfilePage, PersonQueryPage, PersonUpsertForm, ResultPage, SignInPage, SignUpPage, StatePage, TimelinePage, TransactionGoodsForm, TransactionsQueryPage, TransactionUpsertForm } from '../../pages';
import { CommunityPage } from '../../pages/section1/CommunityPage';
import { DrawerListItem, DrawerSections, RouteItem } from '../../types';
import { getEnumKeyFromEnumValue } from '../../utils';

export const defaultDrawerListItemIcon: JSX.Element = <AddBoxIcon />;
export const subStrCode = (code: string) => code.substr(0, 28);

export enum RouteKey {
  HOME = 'HOME',
  // section1
  PROFILE = 'PROFILE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  RESULT_PAGE = 'RESULT_PAGE',
  STATE = 'STATE',
  DASHBOARD = 'DASHBOARD',
  TIMELINE = 'TIMELINE',
  USE_CASES = 'USE_CASES',
  GRAPH = 'GRAPH',
  COMMUNITY = 'COMMUNITY',
  // section2
  PARTICIPANTS = 'PARTICIPANTS',
  PERSONS = 'PERSONS',
  CAUSES = 'CAUSES',
  ASSETS = 'ASSETS',
  TRANSACTIONS = 'TRANSACTIONS',
  // section3
  ASSET_UPSERT_FORM = 'ASSET_UPSERT_FORM',
  CAUSE_UPSERT_FORM = 'CAUSE_UPSERT_FORM',
  PARTICIPANT_UPSERT_FORM = 'PARTICIPANT_UPSERT_FORM',
  PERSON_UPSERT_FORM = 'PERSON_UPSERT_FORM',
  TRANSACTION_UPSERT_FORM = 'TRANSACTION_UPSERT_FORM',
  TRANSACTION_GOODS_FORM = 'TRANSACTION_GOODS_FORM',
}

// TODO: add title and label to i18n
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
    visible: true,
  },
  [RouteKey.USE_CASES]: {
    title: 'UseCases',
    label: 'UseCases',
    path: '/use-cases',
    component: UseCasesPage,
    section: DrawerSections.SECTION1,
    visible: false,
  },
  [RouteKey.GRAPH]: {
    title: 'Graph Starter',
    label: 'Graph',
    path: '/graph',
    component: FeedPage,
    section: DrawerSections.SECTION1,
    drawerIcon: <DynamicFeedIcon />,
  },
  [RouteKey.DASHBOARD]: {
    title: 'DashBoard',
    label: 'DashBoard',
    path: '/dashBoard',
    component: DashBoardPage,
    section: DrawerSections.SECTION1,
    visible: false,
  },
  [RouteKey.TIMELINE]: {
    title: 'TimeLine',
    label: 'TimeLine',
    path: '/timeline',
    component: TimelinePage,
    section: DrawerSections.SECTION1,
    visible: false,
  },
  [RouteKey.STATE]: {
    title: 'State',
    label: 'State',
    path: '/state',
    component: StatePage,
    section: DrawerSections.SECTION1,
    exact: true,
    visible: false,
  },
  [RouteKey.RESULT_PAGE]: {
    title: 'Result Page',
    label: 'Result Page',
    path: '/result-page',
    component: ResultPage,
    section: DrawerSections.SECTION1,
    visible: false,
  },
  [RouteKey.COMMUNITY]: {
    title: 'Community',
    label: 'Community',
    path: '/community',
    component: CommunityPage,
    section: DrawerSections.SECTION1,
    drawerIcon: <LoyaltyIcon />,
    visible: false,
  },
  [RouteKey.SIGN_IN]: {
    title: 'SignIn',
    label: 'SignIn',
    path: '/signin',
    component: SignInPage,
    // section: NO SECTION,
    visible: false,
  },
  [RouteKey.SIGN_UP]: {
    title: 'SignUp',
    label: 'SignUp',
    path: '/signup',
    component: SignUpPage,
    section: DrawerSections.SECTION1,
    // section: NO SECTION,
    visible: false,
  },
  [RouteKey.PARTICIPANTS]: {
    title: 'Organizations',
    label: 'Organizations',
    path: '/organizations',
    component: ParticipantsQueryPage,
    section: DrawerSections.SECTION2,
  },
  // SECTION2
  [RouteKey.PERSONS]: {
    title: 'Persons',
    label: 'Persons',
    path: '/persons',
    component: PersonQueryPage,
    section: DrawerSections.SECTION2,
  },
  [RouteKey.CAUSES]: {
    title: 'Causes',
    label: 'Causes',
    path: '/causes',
    component: CausesQueryPage,
    section: DrawerSections.SECTION2,
    drawerIcon: <ExploreIcon />,
  },
  [RouteKey.ASSETS]: {
    title: 'Assets',
    label: 'Assets',
    path: '/assets',
    component: AssetsQueryPage,
    section: DrawerSections.SECTION2,
  },
  [RouteKey.TRANSACTIONS]: {
    title: 'Transactions',
    label: 'Transactions',
    path: '/transactions',
    // TransactionSubscriptionPage
    component: TransactionsQueryPage,
    section: DrawerSections.SECTION2,
  },
  // SECTION3
  [RouteKey.PARTICIPANT_UPSERT_FORM]: {
    title: 'New Organization',
    label: 'New Organization',
    path: '/new-organization',
    component: ParticipantUpsertForm,
    section: DrawerSections.SECTION3,
    drawerIcon: <ApartmentIcon />,
  },
  [RouteKey.PERSON_UPSERT_FORM]: {
    title: 'New Person',
    label: 'New Person',
    path: '/new-person',
    component: PersonUpsertForm,
    section: DrawerSections.SECTION3,
    drawerIcon: <PeopleIcon />,
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
  [RouteKey.TRANSACTION_GOODS_FORM]: {
    title: 'Reader (Hardware Required)',
    label: 'Barcode Reader',
    path: '/goods-transaction',
    component: TransactionGoodsForm,
    section: DrawerSections.SECTION3,
    drawerIcon: <LocalMallIcon />,
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
