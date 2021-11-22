import React, { useEffect } from 'react';
import { history } from 'umi';
import get from 'lodash/get';
import { setStorage, removeStorage, getStorage } from '@/utils/store';
import { PATH_BEFORELOGIN, USER_TOKEN } from '@/configs/base';

async function handleLogin(token: string) {
  let path = await getStorage(PATH_BEFORELOGIN);
  if (path) {
    await removeStorage(PATH_BEFORELOGIN);
  } else {
    path = '/';
  }
  await setStorage(USER_TOKEN, token);
  history.push(path);
}

export default function Home() {
  const token = get(history, 'location.query.token');

  useEffect(() => {
    if (typeof token === 'string') {
      handleLogin(token);
    }
  }, [token]);

  return <div>login success</div>;
}
