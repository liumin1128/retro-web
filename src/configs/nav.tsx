import React from 'react';

export interface NavItem {
  key: string;
  title: string;
  icon?: React.ReactNode;
  path: string;
  subItems?: NavItem[];
}

const NavItems: NavItem[] = [
  {
    key: 'home',
    icon: <i className="ezze icon-dashboard" />,
    title: 'Home',
    path: '/',
  },
  {
    key: 'orders',
    icon: <i className="ezze icon-file" />,
    title: 'Orders',
    path: '/orders',
  },
  {
    key: 'liveshows',
    icon: <i className="ezze icon-video" />,
    title: 'Liveshows',
    path: '/liveshows',
  },
  {
    key: 'products',
    icon: <i className="ezze icon-product" />,
    title: 'Products',
    path: '/products',
  },
  {
    key: 'tickets',
    icon: <i className="ezze icon-ticket" />,
    title: 'Tickets',
    path: '/tickets',
  },
  {
    key: 'audience',
    icon: <i className="ezze icon-user" />,
    title: 'Audience',
    path: '/audience',
  },
  {
    key: 'commerce',
    icon: <i className="ezze icon-chart" />,
    title: 'Commerce',
    path: '/commerce',
  },
  {
    key: 'help',
    icon: <i className="ezze icon-info" />,
    title: 'Help',
    path: '/help',
  },
];

export default NavItems;
