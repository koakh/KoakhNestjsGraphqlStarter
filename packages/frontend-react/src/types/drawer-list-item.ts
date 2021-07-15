import { DrawerSections } from "./drawer-sections";

export interface DrawerListItem {
  label: string;
  path: string;
  section?: DrawerSections;
  icon?: JSX.Element;
  visible?: boolean;
}
