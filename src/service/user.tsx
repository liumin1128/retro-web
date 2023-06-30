import { setStorage, removeStorage, getStorage } from '@/utils/store';
import { PATH_BEFORELOGIN, USER_TOKEN } from '@/configs/base';

export async function handleLogin(token: string) {
  const path = await getStorage(PATH_BEFORELOGIN);
  await removeStorage(PATH_BEFORELOGIN);
  await setStorage(USER_TOKEN, token);
  setTimeout(() => {
    window.location.href = `/#${path || '/'}`;
  }, 1000);
  // history.push(path);
}

export async function handleLogout() {
  await removeStorage(USER_TOKEN);
  window.location.href = '/#/login';
}
