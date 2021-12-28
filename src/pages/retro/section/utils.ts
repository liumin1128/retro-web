function getSortNum(str) {
  if (str === 'CLOSED') return 0;
  return 1;
}

export function sortItem(a, b) {
  const sa = getSortNum(a.status);
  const sb = getSortNum(b.status);
  if (sa !== sb) return sb - sa;
  return b.createdAt - a.createdAt;
}
