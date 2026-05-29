export type SavedRoundType = 'practice' | 'scenario' | 'coding' | 'mock' | 'github';

export type SavedSessionCard = {
  id: string;
  roundType: SavedRoundType;
  domain: string;
  domainLabel: string;
  title: string;
  savedAt: string;
  status: string;
  score: number | null;
  resumePath: string;
  resultsPath: string;
};

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

async function requestJson<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(path, { credentials: 'include', ...init });
    const data = (await response.json().catch(() => ({}))) as T & { error?: string };
    if (!response.ok) return { ok: false, error: String(data.error ?? 'Request failed.') };
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network request failed.' };
  }
}

export async function fetchSavedSessions(options: { domain?: string; roundType?: string } = {}) {
  const params = new URLSearchParams();
  if (options.domain && options.domain !== 'all') params.set('domain', options.domain);
  if (options.roundType && options.roundType !== 'all') params.set('roundType', options.roundType);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  const result = await requestJson<{ sessions: SavedSessionCard[] }>(`/api/saved-sessions${suffix}`);
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.sessions };
}

export async function deleteSavedSession(roundType: SavedRoundType, sessionId: string) {
  return requestJson<{ success: boolean }>(`/api/saved-sessions/${encodeURIComponent(roundType)}/${encodeURIComponent(sessionId)}`, { method: 'DELETE' });
}
