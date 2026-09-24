export type SearchValue = string | string[] | undefined;

export function one(value: SearchValue) {
  return Array.isArray(value) ? value[0] : value;
}

export function many(value: SearchValue) {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values.flatMap((v) => v.split(',')).filter(Boolean);
}

export function pageNum(value: SearchValue) {
  const n = Number(one(value) ?? 1);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}
