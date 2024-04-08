export type RouteType = {
  path: string;
  name: string;
  icon: string;
  component: () => React.JSX.Element;
  layout: string | string[];
  upgrade?: boolean;
};
