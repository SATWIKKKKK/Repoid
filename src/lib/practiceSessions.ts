export type PracticeQuestionType = 'fill-blank' | 'mcq' | 'code-reading';

export type PracticeSessionQuestion = {
  id: string;
  type: PracticeQuestionType;
  question: string;
  codeBlock: string | null;
  blank: string | null;
  options: string[] | null;
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
};

export type PracticeSessionAnswer = {
  questionId: string;
  answer: string;
  confirmedAt: string;
};

export type PracticeSessionResult = {
  questionId: string;
  type: PracticeQuestionType;
  question: string;
  codeBlock?: string | null;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
  tags: string[];
};

export type PracticeSession = {
  id: string;
  domain: string;
  domainLabel: string;
  topic: string;
  status: string;
  questions: PracticeSessionQuestion[];
  answers: PracticeSessionAnswer[];
  score: number | null;
  correctAnswers: number;
  totalQuestions: number;
  timeSpentSeconds: number | null;
  generatedAt: string;
  completedAt: string | null;
  savedAt: string | null;
  performanceLabel: string | null;
  weakTags: string[];
  results: PracticeSessionResult[];
};

export type PracticeSessionSummary = Pick<
  PracticeSession,
  'id' | 'domain' | 'domainLabel' | 'topic' | 'status' | 'score' | 'correctAnswers' | 'totalQuestions' | 'generatedAt' | 'completedAt' | 'savedAt' | 'weakTags'
>;

export type PracticeOverview = {
  domain: string;
  suggestedTopics: string[];
  history: PracticeSessionSummary[];
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

export function normalizePracticeAnswerText(value: string) {
  return value
    .toLowerCase()
    .replace(/[`'"“”‘’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isPracticeAnswerCorrect(question: PracticeSessionQuestion, answer: string) {
  const submitted = normalizePracticeAnswerText(answer);
  const expected = normalizePracticeAnswerText(question.correctAnswer);
  if (!submitted || !expected) return false;
  if (submitted === expected) return true;
  if (question.type === 'fill-blank') {
    return expected.includes(submitted) || submitted.includes(expected);
  }
  return false;
}

export function formatPracticeDuration(totalSeconds: number | null) {
  if (totalSeconds === null || !Number.isFinite(totalSeconds)) return 'Not recorded';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export async function fetchPracticeOverview(domain: string): Promise<ApiResult<PracticeOverview>> {
  return requestJson<PracticeOverview>(`/api/practice/overview?domain=${encodeURIComponent(domain)}`);
}

export async function fetchPracticeSessions(options: { domain?: string; savedOnly?: boolean } = {}): Promise<ApiResult<PracticeSessionSummary[]>> {
  const params = new URLSearchParams();
  if (options.domain) params.set('domain', options.domain);
  if (options.savedOnly) params.set('savedOnly', 'true');
  const suffix = params.toString() ? `?${params.toString()}` : '';
  const result = await requestJson<{ sessions: PracticeSessionSummary[] }>(`/api/practice/sessions${suffix}`);
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.sessions };
}

export async function searchPracticeSession(payload: { domain: string; topic: string; level: string }): Promise<ApiResult<PracticeSession>> {
  const result = await requestJson<{ session: PracticeSession }>('/api/practice/search', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.session };
}

export async function fetchPracticeSession(sessionId: string): Promise<ApiResult<PracticeSession>> {
  const result = await requestJson<{ session: PracticeSession }>(`/api/practice/${encodeURIComponent(sessionId)}`);
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.session };
}

export async function savePracticeSessionAnswers(sessionId: string, answers: PracticeSessionAnswer[]): Promise<ApiResult<string>> {
  const result = await requestJson<{ success: boolean; savedAt: string }>(`/api/practice/${encodeURIComponent(sessionId)}/answers`, {
    method: 'PATCH',
    body: JSON.stringify({ answers }),
  });
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.savedAt };
}

export async function completePracticeSession(sessionId: string, payload: { answers: PracticeSessionAnswer[]; timeSpentSeconds: number }): Promise<ApiResult<PracticeSession>> {
  const result = await requestJson<{ session: PracticeSession }>(`/api/practice/${encodeURIComponent(sessionId)}/complete`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.session };
}

export async function togglePracticeSessionSaved(sessionId: string, saved: boolean): Promise<ApiResult<string | null>> {
  const result = await requestJson<{ savedAt: string | null }>(`/api/practice/${encodeURIComponent(sessionId)}/save`, {
    method: 'POST',
    body: JSON.stringify({ saved }),
  });
  if (result.ok === false) return result;
  return { ok: true as const, data: result.data.savedAt };
}
