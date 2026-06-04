import { useSearchParams } from 'umi';
import { useEffect } from 'react';
import { handleLogin } from '@/service/user';

function getTokenFromUrl(searchParams: URLSearchParams): string | null {
  const routeToken = searchParams.get('token');

  if (routeToken) {
    return routeToken;
  }

  const pageToken = new URLSearchParams(window.location.search).get('token');

  if (pageToken) {
    return pageToken;
  }

  const hashSearch = window.location.hash.split('?')[1];
  return hashSearch ? new URLSearchParams(hashSearch).get('token') : null;
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const token = getTokenFromUrl(searchParams);

  useEffect(() => {
    if (typeof token === 'string') {
      handleLogin(token);
    }
  }, [token]);

  return <div>login success</div>;
}
