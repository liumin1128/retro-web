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
    component: '@/layouts/dashboard',
    wrappers: [
      '@/wrappers/sentry',
      '@/wrappers/apollo',
      '@/wrappers/material-ui',
      // '@/wrappers/auth',
    ],
    routes: [
      {
        path: '/',
        wrappers: ['@/layouts/dashboard'],
        component: '@/pages/home',
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
            path: '/retro/organization',
            component: '@/pages/retro/organization',
            title: 'Organization List',
            exact: true,
          },
          {
            path: '/retro/organization/create',
            component: '@/pages/retro/organization/create',
            title: 'Organization Create',
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
        path: '/seatselection',
        // component: '@/layouts/retro',
        routes: [
          {
            path: '/seatselection',
            component: '@/pages/seatselection',
            title: 'Retro List',
            exact: true,
          },
        ],
      },

      {
        path: '/home',
        component: '@/pages/home',
        title: 'Home',
        exact: true,
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

      {
        path: '/',
        redirect: '/retro',
      },
    ],
  },
];
