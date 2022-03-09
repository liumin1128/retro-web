// import React, { useState, useEffect } from 'react';
// import { Redirect, IRoute } from 'umi';
// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
// import { UserContextProvider, useUserContext } from '@/context/user';
// // import userRelogin from '@/service/user/relogin';

// const AuthRouter = (props: IRoute) => {
//   const { location, children } = props;
//   const { pathname } = location;

//   const isLoginPage =
//     [
//       '/login',
//       '/login/account',
//       '/login/phone/step1',
//       '/login/phone/step2',
//     ].findIndex((i) => i === pathname) !== -1;

//   const [loading, setLoading] = useState(!isLoginPage);
//   const { user, setUser } = useUserContext();

//   const isLogin = !loading && !!user?.userinfo;

//   // useEffect(() => {
//   //   async function relogin() {
//   //     setLoading(true);
//   //     // const res = await userRelogin();
//   //     if (!setUser) return;

//   //     // eslint-disable-next-line
//   //     //@ts-ignore
//   //     setUser({ userinfo: res?.data?.self });
//   //     setLoading(false);
//   //   }
//   //   if (!isLoginPage) {
//   //     relogin();
//   //   }
//   // }, [setUser, isLoginPage]);

//   // 登陆页面特殊处理
//   if (!loading && !isLoginPage && !isLogin) {
//     return <Redirect to="/login" />;
//   }

//   return (
//     <>
//       {children}
//       {loading && (
//         <Backdrop sx={{ zIndex: 999999999, color: '#fff' }} open>
//           <CircularProgress />
//         </Backdrop>
//       )}
//     </>
//   );
// };

// export default ({ children, ...props }: IRoute) => (
//   <UserContextProvider>
//     <AuthRouter {...props}>{children}</AuthRouter>
//   </UserContextProvider>
// );
