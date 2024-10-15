export interface NavigationItem {
  kind?: 'page' | 'divider';
  title?: string;
  segment?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
}

export type Navigation = NavigationItem[];
