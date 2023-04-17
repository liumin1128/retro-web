import { history } from 'umi';
import { setStorage, removeStorage, getStorage } from '@/utils/store';
import { PATH_BEFORELOGIN, USER_TOKEN } from '@/configs/base';

export async function handleLogin(token: string) {
  let path = await getStorage(PATH_BEFORELOGIN);
  if (path) {
    await removeStorage(PATH_BEFORELOGIN);
  } else {
    path = '/';
  }
  await setStorage(USER_TOKEN, token);
  history.push(path);
}

export async function handleLogout() {
  await removeStorage(USER_TOKEN);
  window.location.href = '/#/login';
}
