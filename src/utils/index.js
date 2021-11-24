const hexToHSL = (H) => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
};

const HSLToHex = (h, s, l) => {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
};

const closet = (max, min, value) =>
  Math.abs(min - value) < Math.abs(max - value) ? min : max;

const buildAccentArray = (l, currentAccent) => {
  const accents = [];
  const coef = 100;
  for (let index = 0; index < 10; index++) {
    if (currentAccent === index * 100) {
      accents.push(l);
    } else {
      if (Boolean(index === 0)) {
        accents.push(coef - 95);
      } else {
        accents.push(coef - index * 10);
      }
    }
  }
  return accents;
};

// Trouve la couleur actuel
export const getCurrentColor = (color) => hexToHSL(color);

//Trouve l'accent actuel le plus proche par rapport a light du hsl
export const getCurrentColorAccent = (l) => {
  const accentValue = Math.ceil(100 - l) * 10;
  const min = Number(String(accentValue).charAt(0) * 100);
  const max = (Number(String(accentValue).charAt(0)) + 1) * 100;
  return closet(max, min, accentValue);
};

export const getColorPalette = (color) => {
  const { h, s, l } = getCurrentColor(color);
  const currentAccent = getCurrentColorAccent(l);
  const lights = buildAccentArray(l, currentAccent);
  const palette = [];
  for (let index = 0; index < 10; index++) {
    if (index * 100 === currentAccent) {
      const key = `${currentAccent}`;
      palette.push({ [key]: HSLToHex(h, s, l) });
    } else {
      if (Boolean(index === 0)) {
        palette.push({ 50: HSLToHex(h, s, lights[index]) });
      } else {
        const key = `${index * 100}`;
        palette.push({ [key]: HSLToHex(h, s, lights[index]) });
      }
    }
  }
  console.log({ palette });
  return palette;
};
