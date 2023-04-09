import { setStorage, removeStorage, getStorage } from '@/utils/store';
import { PATH_BEFORELOGIN, USER_TOKEN } from '@/configs/base';

export async function handleLogin(token: string) {
  let path = await getStorage(PATH_BEFORELOGIN);
  if (path) {
    await removeStorage(PATH_BEFORELOGIN);
  } else {
    path = '/';
  }
  console.log('登录成功，跳转到', path);
  await setStorage(USER_TOKEN, token);
  window.location.href = path;
}
