export type RouteObject<T extends any[] = any[]> = {
  route?: string;
  path: (...args: T) => string;
};

export function getRoute<T extends RouteObject>(routeObj: T): string {
  return routeObj.route ?? routeObj.path();
}
