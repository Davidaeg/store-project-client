export enum Orders {
  Ascendent = 'ascendent',
  Descendent = 'descendent',
  Default = 'default'
}

export const options = Object.entries(Orders).map(([label, value]) => ({
  label,
  value
}));
