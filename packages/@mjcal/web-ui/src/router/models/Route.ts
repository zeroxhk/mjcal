export type RouteParamKey<T extends string = string> = RouteParamKeyList<T>[number];

export type RouteParamKeyList<T extends string = string> = string extends T
  ? string[]
  : T extends `${infer _Start}/:${infer P}/${infer Rest}`
  ? [P, ...RouteParamKeyList<`/${Rest}`>]
  : T extends `${infer _Start}/:${infer P}`
  ? [P]
  : [];

export type RouteParam<T extends string = string> = Record<RouteParamKey<T>, string>;
