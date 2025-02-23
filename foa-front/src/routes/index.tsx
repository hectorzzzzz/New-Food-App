//file to set routes

import { AppRoute } from './types';

export const protectedRoutes: AppRoute[] = [
  {
    path: '/',
    name: 'Home',
    icon: <i className='fe fe-home' />,
  },
  {
    path: '/orders',
    name: 'Order List',
    icon: <i className='fe fe-list' />,
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    icon: <i className='fe fe-user' />,
    hidden: true,
  },
];