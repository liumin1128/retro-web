import { useSearchParams } from 'umi';
import { useEffect } from 'react';
import { handleLogin } from '@/service/user';

export default function Home() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (typeof token === 'string') {
      handleLogin(token);
    }
  }, [token]);

  return <div>login success</div>;
}
