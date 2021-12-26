export default [
  {
    path: '/login',
    component: '@/layouts/login',
    wrappers: [
      '@/wrappers/material-ui',
      '@/wrappers/apollo-provider',
      // '@/wrappers/auth',
    ],
    routes: [
      {
        path: '/login',
        component: '@/pages/login',
        title: 'Login',
        exact: true,
      },
      {
        path: '/login/oauth',
        component: '@/pages/login/oauth',
        title: 'oauth',
        exact: true,
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/base',
    wrappers: [
      '@/wrappers/material-ui',
      '@/wrappers/apollo-provider',
      // '@/wrappers/auth',
    ],
    routes: [
      {
        path: '/',
        component: '@/pages/home',
        title: 'Home',
        exact: true,
      },
      {
        path: '/dynamic',
        component: '@/pages/dynamic',
        title: 'Dynamic',
        exact: true,
      },
      {
        path: '/retro',
        routes: [
          {
            path: '/retro',
            component: '@/pages/retro',
            title: 'Retro List',
            exact: true,
          },
          {
            path: '/retro/:retro',
            component: '@/pages/retro/section',
            title: 'Retro',
            exact: true,
          },
        ],
      },
    ],
  },
];
