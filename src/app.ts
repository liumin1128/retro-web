import { matchRoutes } from 'umi';
import { handleOAuthLoginFromUrl } from '@/service/user';

type ClientRoute = {
  title?: string;
};
type MatchRoutesParams = Parameters<typeof matchRoutes>;

export function render(oldRender: () => void) {
  if (handleOAuthLoginFromUrl()) {
    return;
  }

  oldRender();
}

// 监听路由变化
export function onRouteChange({
  clientRoutes,
  location,
}: {
  clientRoutes: MatchRoutesParams[0];
  location: Location;
}) {
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()
    ?.route as ClientRoute;
  if (route) document.title = route.title || '';
}
