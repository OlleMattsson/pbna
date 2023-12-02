export function generateRandomInteger(min = 1, max = Number.MAX_SAFE_INTEGER) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
