const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8811';

export async function apiFetch<T>(path: string, init?: RequestInit & { noCache?: boolean }): Promise<T> {
  const { noCache, ...fetchInit } = init ?? {};
  const res = await fetch(`${API_BASE}${path}`, {
    ...fetchInit,
    headers: { 'Content-Type': 'application/json', ...fetchInit?.headers },
    ...(noCache ? { cache: 'no-store' as const } : { next: { revalidate: 60 } }),
  });
  const json = await res.json();
  // The API returns {code: 400, reason: "nothing found"} for empty results
  if (json.code && json.code >= 400) return { code: json.code, status: 'error', result: null } as T;
  return json;
}

export type ApiResponse<T> = { code: number; status: string; result: T | null };

export type ApiSearchResult<T> = {
  hits: T[];
  estimatedTotalHits?: number;
  nbHits?: number;
  limit: number;
  offset: number;
};

export type ApiSearchResponse<T> = ApiResponse<ApiSearchResult<T>>;
