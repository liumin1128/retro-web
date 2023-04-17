import { matchRoutes } from 'umi';
import type { RouteObject } from 'react-router-dom';

// 监听路由变化
export function onRouteChange({
  clientRoutes,
  location,
}: {
  clientRoutes: RouteObject[];
  location: Location;
}) {
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()
    ?.route as RouteObject & { title: string };
  if (route) document.title = route.title || '';
}
