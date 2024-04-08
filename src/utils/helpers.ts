export const getDistance = (A: { x: number; y: number }, B: { x: number; y: number }) => {
  return Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
};
