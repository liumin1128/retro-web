import { setStorage, removeStorage, getStorage } from '@/utils/store';
import { HREF_BEFORE_LOGOUT, USER_TOKEN } from '@/configs/base';

export async function handleLogin(token: string) {
  console.log('handleLogin: ', token);
  await setStorage(USER_TOKEN, token);
  const path = await getStorage(HREF_BEFORE_LOGOUT);
  console.log('HREF_BEFORE_LOGOUT: ', path);
  await removeStorage(HREF_BEFORE_LOGOUT);
  window.location.href = `${path || '/'}`;
}

export async function handleLogout() {
  await removeStorage(USER_TOKEN);
  window.location.href = '/#/login';
}
