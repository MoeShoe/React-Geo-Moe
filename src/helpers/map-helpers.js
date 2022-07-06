export const calcZoomLevel = (area) => {
  if (area < 150) return 12;
  if (area < 500) return 11;
  if (area < 1_000) return 10;
  if (area < 5_000) return 9;
  if (area < 30_000) return 8;
  if (area < 150_000) return 7;
  if (area < 1_500_000) return 6;
  if (area < 5_000_000) return 5;
  return 4;
};
