export type ScenarioQuestionType = 'decision' | 'technical' | 'tradeoff' | 'communication';

export type Scenario = {
  id: string;
  userId: string | null;
  domain: string;
  topic: string;
  level: string;
  title: string;
  context: string;
  role: string;
  question: string;
  type: ScenarioQuestionType;
  hint: string;
  scenarioType?: string;
  seed: string;
  questionHash: string;
  generatedAt: string;
};

export type ScenarioEvaluation = {
  aiUnavailable?: boolean;
  score: number;
  feedback: string;
  whatWorked: string;
  whatWasMissed: string;
  seniorEngineerWouldSay: string;
};

export type ScenarioAttempt = {
  id: string;
  scenario: Scenario;
  status: string;
  startedAt: string;
  durationMinutes: number;
  completedAt: string | null;
  score: number | null;
  timeSpentSeconds: number | null;
  answer: string;
  evaluation: ScenarioEvaluation | null;
  summary: string;
  focusAreas: string[];
  nextSteps: string[];
};

export type ScenarioHistoryItem = {
  attemptId: string;
  scenarioId: string;
  topic: string;
  title: string;
  status: string;
  score: number | null;
  generatedAt: string;
  completedAt: string | null;
  savedAt?: string | null;
};

export type ScenarioOverview = {
  domain: string;
  suggestedTopics: string[];
  history: ScenarioHistoryItem[];
};

export type ScenarioResultAttempt = {
  id: string;
  roundType: string;
  scenario: {
    id: string;
    title: string;
    topic: string;
    domain: string;
    domainLabel: string;
    context: string;
    role: string;
    question: string;
    type: ScenarioQuestionType;
    hint: string;
    score: number | null;
    answer: string;
    feedback: string;
    whatWorked: string;
    whatWasMissed: string;
    seniorEngineerWouldSay: string;
    startedAt: string;
    completedAt: string | null;
  };
};

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; suggestedDomain?: string; aiUnavailable?: boolean };

async function requestJson<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(path, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      ...init,
    });
    const data = (await response.json().catch(() => ({}))) as T & { error?: string; suggestedDomain?: string; aiUnavailable?: boolean };
    if (!response.ok) {
      return {
        ok: false,
        error: String(data.error ?? 'Request failed.'),
        suggestedDomain: data.suggestedDomain ? String(data.suggestedDomain) : undefined,
        aiUnavailable: Boolean(data.aiUnavailable),
      };
    }
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Network request failed.' };
  }
}

export async function fetchScenarioOverview(domain: string): Promise<ApiResult<ScenarioOverview>> {
  return requestJson<ScenarioOverview>(`/api/scenarios/overview?domain=${encodeURIComponent(domain)}`);
}

export async function generateScenario(payload: { domain: string; topic: string; level: string }): Promise<ApiResult<Scenario>> {
  const result = await requestJson<{ scenario: Scenario }>('/api/scenarios/generate', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.scenario };
}

export async function fetchScenario(scenarioId: string): Promise<ApiResult<Scenario>> {
  const result = await requestJson<{ scenario: Scenario }>(`/api/scenarios/${encodeURIComponent(scenarioId)}`);
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.scenario };
}

export async function startScenarioAttempt(scenarioId: string): Promise<ApiResult<ScenarioAttempt>> {
  const result = await requestJson<{ attempt: ScenarioAttempt }>(`/api/scenarios/${encodeURIComponent(scenarioId)}/start`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.attempt };
}

export async function fetchScenarioAttempt(attemptId: string): Promise<ApiResult<ScenarioAttempt>> {
  const result = await requestJson<{ attempt: ScenarioAttempt }>(`/api/scenarios/attempts/${encodeURIComponent(attemptId)}`);
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.attempt };
}

export async function submitScenarioAttempt(
  scenarioId: string,
  attemptId: string,
  payload: { answer: string; timeSpentSeconds?: number; autoSubmitted?: boolean },
): Promise<ApiResult<ScenarioAttempt>> {
  const result = await requestJson<{ attempt: ScenarioAttempt }>(
    `/api/scenarios/${encodeURIComponent(scenarioId)}/attempts/${encodeURIComponent(attemptId)}/submit`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  );
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.attempt };
}

export async function fetchScenarioResult(attemptId: string): Promise<ApiResult<ScenarioResultAttempt>> {
  const result = await requestJson<{ attempt: ScenarioResultAttempt }>(`/api/round-attempts/by-id/${encodeURIComponent(attemptId)}`);
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.attempt };
}

export async function saveScenarioAttempt(attemptId: string, saved = true): Promise<ApiResult<string | null>> {
  const result = await requestJson<{ savedAt: string | null }>(`/api/scenarios/${encodeURIComponent(attemptId)}/save`, {
    method: 'POST',
    body: JSON.stringify({ saved }),
  });
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.savedAt };
}
