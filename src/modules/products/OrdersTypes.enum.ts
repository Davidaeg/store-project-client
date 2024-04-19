export enum Orders {
  Ascendente= 'Ascendente',
  Descendente = 'Descendente',
  Predeterminada= 'Por defecto'
}

export const options = Object.entries(Orders).map(([label, value]) => ({
  label,
  value
}));
