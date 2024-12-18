export default [
  {
    path: '/login',
    component: '@/layouts/blank',
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
    component: '@/layouts/blank',
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
    wrappers: [
      '@/wrappers/sentry',
      '@/wrappers/apollo',
      '@/wrappers/material-ui',
      '@/wrappers/snackbar',
      '@/wrappers/header',
    ],
    component: '@/layouts/base',
    routes: [
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
      {
        path: '/seatselection',
        wrappers: ['@/wrappers/auth/SeatSelection'],
        routes: [
          {
            path: '/seatselection/schedule',
            component: '@/pages/seatselection/schedule',
            title: 'Seat Table',
            exact: true,
          },
          {
            path: '/seatselection/setting',
            component: '@/pages/seatselection/setting',
            title: 'Seat Setting',
            routes: [
              {
                path: '/seatselection/setting/date',
                component: '@/pages/seatselection/setting/date',
                title: 'Seat List Date',
                exact: true,
              },
              {
                path: '/seatselection/setting/seat',
                component: '@/pages/seatselection/setting/seat',
                title: 'Seat List Seat',
                exact: true,
              },
              {
                path: '/seatselection/setting/user',
                component: '@/pages/seatselection/setting/user',
                title: 'Seat Setting User',
                exact: true,
              },
              {
                path: '/seatselection/setting',
                redirect: '/seatselection/setting/user',
              },
            ],
          },
          {
            path: '/seatselection/',
            redirect: '/seatselection/schedule',
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
        path: '/user/profile',
        component: '@/pages/user/profile',
        routes: [
          {
            path: '/user/profile/userinfo',
            component: '@/pages/user/profile/userinfo',
            title: 'UserInfo',
            exact: true,
          },

          {
            path: '/user/profile/password',
            component: '@/pages/user/profile/password',
            title: 'Password',
            exact: true,
          },

          {
            path: '/user/profile/oauth',
            component: '@/pages/user/profile/oauth',
            title: 'Oauth',
            exact: true,
          },

          {
            path: '/user/profile',
            redirect: '/user/profile/userinfo',
          },
        ],
      },

      {
        path: '/403',
        component: '@/pages/403',
      },

      {
        path: '/',
        redirect: '/retro',
      },
    ],
  },
];
