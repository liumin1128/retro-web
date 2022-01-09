import { history } from 'umi';
import { useEffect } from 'react';
import get from 'lodash/get';
import { handleLogin } from '@/service/user';

export default function Home() {
  const token = get(history, 'location.query.token');

  useEffect(() => {
    if (typeof token === 'string') {
      handleLogin(token);
    }
  }, [token]);

  return <div>login success</div>;
}
