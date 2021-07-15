import { DrawerSections } from ".";
import { RouteComponentProps } from 'react-router';

export interface RouteItem {
  // page title
  title: string;
  // buttons label
  label: string;
  path: string;
  component: React.FC | React.FC<any> | React.FC<RouteComponentProps>;
  exact?: boolean;
  // other non-router properties
  section?: DrawerSections;
  drawerIcon?: JSX.Element;
  visible?: boolean;
}
