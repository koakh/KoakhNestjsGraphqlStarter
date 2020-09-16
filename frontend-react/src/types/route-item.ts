import { DrawerSections } from ".";
import { RouteComponentProps } from 'react-router';
import { RoutePaths } from "../app/config";

export interface RouteItem {
  label: string;
  path: RoutePaths;
  component: React.FC | React.FC<any> | React.FC<RouteComponentProps>;
  exact?: boolean;
  // other non-router properties
  section?: DrawerSections;
  drawerIcon?: JSX.Element;
  visible?: boolean;
}
