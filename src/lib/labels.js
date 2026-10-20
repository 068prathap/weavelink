export const finishLabels = {
  raw: 'Raw (greige)',
  dyed: 'Dyed',
  finished: 'Finished and packed',
};

export function sizeText(size) {
  if (!size?.width || !size?.height) return '';
  return `${size.width} x ${size.height} ${size.unit}`;
}

export const unitLabels = {
  piece: 'piece',
  kg: 'kg',
  roll: 'roll',
};
