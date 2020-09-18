import { DrawerSections } from ".";
import { RouteComponentProps } from 'react-router';

export interface RouteItem {
  label: string;
  path: string;
  component: React.FC | React.FC<any> | React.FC<RouteComponentProps>;
  exact?: boolean;
  // other non-router properties
  section?: DrawerSections;
  drawerIcon?: JSX.Element;
  visible?: boolean;
}
