export default [
  {
    path: '/login',
    component: '@/layouts/base',
    wrappers: [
      '@/wrappers/sentry',
      '@/wrappers/apollo',
      '@/wrappers/material-ui',
    ],
    routes: [
      {
        path: '/login/',
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
    path: '/register',
    component: '@/layouts/base',
    wrappers: [
      '@/wrappers/sentry',
      '@/wrappers/apollo',
      '@/wrappers/material-ui',
    ],
    routes: [
      {
        path: '/register/',
        component: '@/pages/login/register',
        title: 'register',
        exact: true,
      },
    ],
  },

  {
    path: '/',
    component: '@/layouts/base',
    wrappers: [
      '@/wrappers/sentry',
      '@/wrappers/apollo',
      '@/wrappers/material-ui',
    ],
    routes: [
      {
        path: '/',
        wrappers: ['@/layouts/retro'],
        component: '@/pages/retro',
        title: 'Home',
        exact: true,
      },

      {
        path: '/retro',
        component: '@/layouts/retro',
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

      {
        path: '/dynamic',
        component: '@/layouts/dynamic',
        routes: [
          {
            path: '/dynamic',
            component: '@/pages/dynamic',
            title: 'Dynamic',
            exact: true,
          },
          {
            path: '/dynamic/:id',
            component: '@/pages/dynamic/detail',
            title: 'Dynamic Detail',
            exact: true,
          },
        ],
      },
    ],
  },
];
