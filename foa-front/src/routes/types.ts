//file to define AppRoute data structure

import { ReactNode } from 'react';

export interface AppRoute {
  path: string;
  name: string;
  icon?: ReactNode;
  children?: Omit<AppRoute, 'children'>[];
  hidden?: boolean;
}