export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const basepath = (string) => {
  const pathFragments = string.split('/');

  return pathFragments[pathFragments.length - 1];
};

export const dashes2capitals = (string) =>
  string
    .split('-')
    .map(capitalize)
    .join('');
