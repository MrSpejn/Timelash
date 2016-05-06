export const white_light = '#FFFFFF';
export const white_dark  = '#F7F7F7';

export const gray_light = '#dddddd';
export const gray_medium = '#aaaaaa';
export const gray_dark = '#888888';

export const brand_blue = '#1F77B4';
export const brand_blue_10 = '#2B93DB';
export const brand_blue_20 = '#57A9E2';
export const brand_blue_30 = '#82BFEA';
export const brand_blue_10d = darken(brand_blue, -10);
export const brand_blue_20d = darken(brand_blue, -20);
export const brand_blue_30d = darken(brand_blue, -30);

export const brand_orange = '#FF7F0E';
export const brand_orange_10 = '#FF9A41';
export const brand_orange_20 = '#FFB574';
export const brand_orange_30 = '#FFD0A7';
export const brand_orange_10d = darken(brand_orange, -10);
export const brand_orange_20d = darken(brand_orange, -20);
export const brand_orange_30d = darken(brand_orange, -30);


function protect(color) {
  if (color <= 0)   return '00';
  if (color >= 255) return 'FF';
  if (color < 16)   return `0${color.toString(16)}`;
  return color.toString(16);
}
export function darkenPercentage(color, amount) {
  amount = (100 + amount) / 100;
  const number = parseInt(color.slice(1), 16);
  const red    = Math.floor((number >> 16) * amount);
  const green  = Math.floor((number >> 8 & 0x00FF) * amount);
  const blue   = Math.floor((number & 0x0000FF) * amount);
  return `#${protect(red)}${protect(green)}${protect(blue)}`;
}

export function darken(color, amount) {
  const number = parseInt(color.slice(1), 16);
  const red    = (number >> 16) + amount;
  const green  = (number >> 8 & 0x00FF) + amount;
  const blue   = (number & 0x0000FF) + amount;

  return `#${protect(red)}${protect(green)}${protect(blue)}`;
}