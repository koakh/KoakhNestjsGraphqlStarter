import { DrawerSections } from ".";

export interface DrawerListItem {
  label: string,
  path: string,
  section?: DrawerSections,
  icon?: JSX.Element,
}
