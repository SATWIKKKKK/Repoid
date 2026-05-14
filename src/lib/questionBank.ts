import { DOMAIN_OPTIONS, type DomainFamily } from './prep';

export type QuestionType = 'fundamentals' | 'mcq' | 'fill_blank' | 'scenario' | 'system_design' | 'coding' | 'mock';

export interface BankQuestion {
  id: string;
  domain: string;
  domainLabel: string;
  topic: string;
  type: QuestionType;
  difficulty: 1 | 2 | 3;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  codeSnippet?: string;
  tags: string[];
  timeLimitMinutes: number;
}

type QuestionArchetype = 'ui' | 'service' | 'platform' | 'mobile' | 'fundamentals';

type QuestionDomain = {
  id: string;
  label: string;
  family: DomainFamily;
  archetype: QuestionArchetype;
  topics: string[];
};

type QuestionContext = {
  domain: QuestionDomain;
  type: QuestionType;
  difficulty: 1 | 2 | 3;
  topic: string;
  variantIndex: number;
};

const QUESTION_COUNT_PER_DOMAIN = 300;

export const QUESTION_TYPES: Array<{ id: QuestionType; label: string }> = [
  { id: 'mcq', label: 'Concept MCQ' },
  { id: 'fill_blank', label: 'Fill in the Blank' },
  { id: 'scenario', label: 'Scenario' },
  { id: 'system_design', label: 'Architecture' },
  { id: 'coding', label: 'Coding Round' },
  { id: 'mock', label: 'Mock Interview' },
];

const DOMAIN_TOPICS: Record<string, string[]> = {
  frontend: ['state synchronization', 'accessibility', 'browser rendering', 'caching and invalidation', 'form architecture', 'performance profiling', 'component composition', 'routing and navigation', 'async UI', 'testing strategy'],
  react: ['hooks and effects', 'concurrent rendering', 'context boundaries', 'suspense fallbacks', 'error boundaries', 'list rendering', 'memoization', 'form state', 'server components', 'render tracing'],
  'next-js': ['app router', 'server actions', 'route handlers', 'streaming', 'ISR and revalidation', 'middleware', 'edge runtime', 'auth flows', 'image optimization', 'data caching'],
  typescript: ['type narrowing', 'discriminated unions', 'generic utilities', 'API contracts', 'mapped types', 'inference control', 'schema validation', 'module boundaries', 'public type design', 'compiler configuration'],
  'backend-nodejs': ['idempotent writes', 'request validation', 'rate limiting', 'queue workers', 'cache invalidation', 'database transactions', 'websocket fanout', 'service observability', 'retry safety', 'background jobs'],
  'backend-python': ['async request handling', 'task queues', 'ORM query safety', 'service auth', 'API validation', 'cache boundaries', 'retry policies', 'worker recovery', 'observability', 'deployment safety'],
  'full-stack': ['optimistic updates', 'session management', 'API contracts', 'file uploads', 'feature flags', 'data fetching', 'error handling', 'analytics pipelines', 'background processing', 'search UX'],
  'system-design': ['caching', 'rate limiting', 'service boundaries', 'queue backpressure', 'search indexing', 'notification fanout', 'multi-tenant isolation', 'consistency tradeoffs', 'disaster recovery', 'observability'],
  'sql-databases': ['index selection', 'transaction boundaries', 'locking', 'query plans', 'schema evolution', 'materialized views', 'warehouse modeling', 'partitioning', 'backfills', 'data correctness'],
  devops: ['container builds', 'deploy rollbacks', 'CI parallelism', 'secret rotation', 'alert noise', 'incident response', 'terraform changes', 'autoscaling', 'log pipelines', 'health checks'],
  'cloud-aws': ['lambda concurrency', 's3 event flows', 'iam boundaries', 'rds failover', 'sqs retries', 'cloudfront caching', 'vpc design', 'dynamodb modeling', 'observability', 'cost controls'],
  'cloud-gcp': ['cloud run scaling', 'pubsub retries', 'iam boundaries', 'bigquery modeling', 'gke rollouts', 'cloud build pipelines', 'vpc design', 'service monitoring', 'spanner tradeoffs', 'cost controls'],
  'ai-ml': ['retrieval quality', 'prompt evaluation', 'embedding drift', 'offline and online metrics', 'feature stores', 'training pipelines', 'model serving', 'latency budgeting', 'hallucination control', 'feedback loops'],
  'data-engineering': ['batch backfills', 'stream processing', 'schema evolution', 'warehouse transformations', 'orchestration retries', 'data quality checks', 'checkpointing', 'lakehouse compaction', 'event ordering', 'cost optimization'],
  cybersecurity: ['xss prevention', 'authorization boundaries', 'session fixation', 'secret handling', 'audit logging', 'token rotation', 'csp policy', 'supply chain risk', 'csrf protection', 'threat modeling'],
  blockchain: ['wallet authentication', 'smart contract access control', 'oracle trust', 'gas usage', 'upgrade safety', 'event indexing', 'token flows', 'signature verification', 'liquidity risk', 'layer 2 bridging'],
  'mobile-react-native': ['offline sync', 'navigation state', 'deep linking', 'device permissions', 'list rendering', 'bridge calls', 'push notifications', 'background refresh', 'crash recovery', 'test coverage'],
  'mobile-flutter': ['widget rebuilds', 'state restoration', 'navigation state', 'platform channels', 'offline sync', 'deep linking', 'list rendering', 'animation jank', 'crash recovery', 'test coverage'],
  dsa: ['arrays and strings', 'hash maps', 'graphs', 'trees', 'dynamic programming', 'sliding window', 'heaps', 'two pointers', 'intervals', 'backtracking'],
  'cs-fundamentals': ['memory management', 'thread scheduling', 'locking', 'tcp behavior', 'process isolation', 'io models', 'cpu cache locality', 'filesystem consistency', 'distributed failure', 'queueing theory'],
  backend: ['idempotent writes', 'request validation', 'rate limiting', 'queue workers', 'cache invalidation', 'database transactions', 'websocket fanout', 'service observability', 'retry safety', 'background jobs'],
  data: ['batch backfills', 'stream processing', 'schema evolution', 'warehouse transformations', 'orchestration retries', 'data quality checks', 'checkpointing', 'lakehouse compaction', 'event ordering', 'cost optimization'],
  security: ['xss prevention', 'authorization boundaries', 'session fixation', 'secret handling', 'audit logging', 'token rotation', 'csp policy', 'supply chain risk', 'csrf protection', 'threat modeling'],
  mobile: ['offline sync', 'navigation state', 'deep linking', 'device permissions', 'list rendering', 'bridge calls', 'push notifications', 'background refresh', 'crash recovery', 'test coverage'],
  'cloud-platform': ['deploy rollbacks', 'secret rotation', 'multi-service observability', 'autoscaling', 'cost controls', 'iam boundaries', 'queue retries', 'health checks', 'platform guardrails', 'incident response'],
  web3: ['wallet authentication', 'smart contract access control', 'oracle trust', 'gas usage', 'upgrade safety', 'event indexing', 'token flows', 'signature verification', 'liquidity risk', 'layer 2 bridging'],
  languages: ['type narrowing', 'discriminated unions', 'generic utilities', 'API contracts', 'mapped types', 'inference control', 'schema validation', 'module boundaries', 'public type design', 'compiler configuration'],
};

const ARCHETYPE_META: Record<QuestionArchetype, {
  artifact: string;
  failure: string;
  metric: string;
  boundary: string;
  caller: string;
  guard: string;
}> = {
  ui: {
    artifact: 'UI state',
    failure: 'stale renders or missing feedback',
    metric: 'interaction error rate',
    boundary: 'component ownership',
    caller: 'view layer',
    guard: 'cleanup guard',
  },
  service: {
    artifact: 'service state',
    failure: 'duplicate writes or unsafe retries',
    metric: 'write failure rate',
    boundary: 'API contract and persistence boundary',
    caller: 'request handler',
    guard: 'validation and idempotency check',
  },
  platform: {
    artifact: 'pipeline state',
    failure: 'partial rollouts or bad retries',
    metric: 'recovery latency',
    boundary: 'control plane and execution path',
    caller: 'orchestration layer',
    guard: 'rollback or checkpoint guard',
  },
  mobile: {
    artifact: 'device state',
    failure: 'offline drift or permission regressions',
    metric: 'crash-free session rate',
    boundary: 'device API and sync boundary',
    caller: 'screen state',
    guard: 'subscription cleanup or offline fallback',
  },
  fundamentals: {
    artifact: 'algorithm state',
    failure: 'incorrect edge-case behavior',
    metric: 'correctness under edge cases',
    boundary: 'input assumptions and invariants',
    caller: 'core routine',
    guard: 'base case or invariant check',
  },
};

function getArchetype(family: DomainFamily): QuestionArchetype {
  switch (family) {
    case 'frontend':
    case 'full-stack':
      return 'ui';
    case 'backend':
    case 'security':
    case 'blockchain':
      return 'service';
    case 'devops':
    case 'data':
    case 'system-design':
    case 'cloud':
    case 'ai-ml':
      return 'platform';
    case 'mobile':
      return 'mobile';
    case 'cs-fundamentals':
      return 'fundamentals';
    default:
      return 'ui';
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .join('-');
}

function toIdentifier(value: string, uppercaseFirst = false) {
  const words = value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return words
    .map((word, index) => {
      const normalized = word.toLowerCase();
      if (index === 0 && !uppercaseFirst) return normalized;
      return normalized[0]?.toUpperCase() + normalized.slice(1);
    })
    .join('') || (uppercaseFirst ? 'ExampleTopic' : 'exampleTopic');
}

function questionTimeLimit(type: QuestionType) {
  if (type === 'coding') return 45;
  if (type === 'mock') return 25;
  if (type === 'system_design') return 20;
  if (type === 'scenario') return 12;
  return 8;
}

export const QUESTION_DOMAINS: QuestionDomain[] = DOMAIN_OPTIONS.map((domain) => ({
  id: domain.id,
  label: domain.label,
  family: domain.family,
  archetype: getArchetype(domain.family),
  topics: DOMAIN_TOPICS[domain.id] ?? DOMAIN_TOPICS.frontend,
}));

function buildMcqQuestion(context: QuestionContext): Omit<BankQuestion, 'id' | 'domain' | 'domainLabel' | 'topic' | 'type' | 'difficulty' | 'tags' | 'timeLimitMinutes'> {
  const meta = ARCHETYPE_META[context.domain.archetype];
  const variants = [
    {
      questionText: `In ${context.domain.label}, which change best stabilizes ${context.topic} when ${meta.failure} starts showing up in ${meta.artifact.toLowerCase()}?`,
      options: [
        `Add an explicit ${meta.guard} before mutating ${meta.artifact.toLowerCase()}.`,
        `Hide the failure and keep showing the previous ${meta.artifact.toLowerCase()}.`,
        'Retry every path without an upper bound or backoff.',
        'Move coordination into one shared mutable singleton.',
      ],
      explanation: `The safest first move is to make the failure path explicit. In ${context.domain.label}, hidden retries and shared mutable coordination turn a local defect into a broader regression.`,
    },
    {
      questionText: `Which metric gives the earliest signal that ${context.topic} degraded in ${context.domain.label}?`,
      options: [
        meta.metric,
        'The number of changed lines in the last pull request',
        'The duration of the last retrospective',
        'The size of the deployment artifact',
      ],
      explanation: `Interviewers usually want the first operational signal, not a vanity metric. ${meta.metric[0].toUpperCase() + meta.metric.slice(1)} tells you when ${context.topic} starts failing before anecdotal reports pile up.`,
    },
    {
      questionText: `Which answer best preserves a clean ${meta.boundary.toLowerCase()} for ${context.topic} in ${context.domain.label}?`,
      options: [
        `Keep the decision local to the ${meta.caller} and pass a typed contract across the boundary.`,
        'Let every downstream consumer infer missing fields independently.',
        'Store intermediate state in a process-wide global flag.',
        'Silence errors so upstream callers never see degraded states.',
      ],
      explanation: `A strong answer keeps contracts explicit. ${context.topic} becomes easier to test and easier to recover when the caller owns the decision and the boundary carries a stable shape.`,
    },
    {
      questionText: `When a production issue appears around ${context.topic}, what should you inspect first in ${context.domain.label}?`,
      options: [
        `The narrowest trace that shows where ${meta.artifact.toLowerCase()} diverged from the expected contract.`,
        'A full rewrite of the affected module before collecting evidence.',
        'A global cache flush even if the failure is isolated.',
        'A UI-only patch that hides the state transition.',
      ],
      explanation: `The most reliable debugging move is to isolate the divergence before changing behavior. That keeps ${context.topic} grounded in evidence instead of guesswork.`,
    },
    {
      questionText: `What is the safest senior-level tradeoff when ${context.topic} gets more complex in ${context.domain.label}?`,
      options: [
        'Reduce surprise by narrowing states and documenting the rollback path.',
        'Add one more hidden fallback so users never notice errors.',
        'Optimize benchmarks before defining the failure boundary.',
        'Collapse domain rules and transport rules into one helper.',
      ],
      explanation: `Senior answers usually prefer fewer states with explicit rollback over clever hidden behavior. That keeps ${context.topic} observable and maintainable under production pressure.`,
    },
  ][context.variantIndex];

  return {
    questionText: variants.questionText,
    options: variants.options,
    correctAnswer: variants.options[0],
    explanation: variants.explanation,
  };
}

function buildFillBlankQuestion(context: QuestionContext): Omit<BankQuestion, 'id' | 'domain' | 'domainLabel' | 'topic' | 'type' | 'difficulty' | 'tags' | 'timeLimitMinutes'> {
  const meta = ARCHETYPE_META[context.domain.archetype];
  const topicId = toIdentifier(context.topic, true);
  const fnName = toIdentifier(context.topic);
  const variants = [
    {
      questionText: `Fill the missing guard path for ${context.topic} in ${context.domain.label}.`,
      codeSnippet: `export async function run${topicId}(input) {\n  if (!input.requestId) return ___;\n  const result = await fetch${topicId}(input);\n  return ___;\n}`,
      correctAnswer: 'a validation error result; result',
      explanation: `A strong answer for ${context.topic} makes invalid input explicit and returns the computed result unchanged. Hidden fallback values make later debugging harder.`,
    },
    {
      questionText: `Fill the retry gap for ${context.topic} in ${context.domain.label}.`,
      codeSnippet: `for (let attempt = 0; attempt < maxAttempts; attempt += 1) {\n  try {\n    return await run${topicId}();\n  } catch (error) {\n    if (attempt === maxAttempts - 1) throw error;\n    await ___;\n  }\n}`,
      correctAnswer: 'wait(backoffForAttempt(attempt))',
      explanation: `Retries around ${context.topic} need bounded backoff, not a tight loop. Otherwise the recovery path amplifies the outage you are trying to survive.`,
    },
    {
      questionText: `Fill the cleanup logic for ${context.topic} in ${context.domain.label}.`,
      codeSnippet: `async function with${topicId}(resource, work) {\n  await resource.acquire();\n  try {\n    return await work();\n  } finally {\n    ___;\n  }\n}`,
      correctAnswer: 'await resource.release()',
      explanation: `Cleanup belongs in the guaranteed path. ${context.topic} becomes fragile when locks, subscriptions, or handles are only released on success.`,
    },
    {
      questionText: `Fill the cache boundary for ${context.topic} in ${context.domain.label}.`,
      codeSnippet: `const cached = await cache.get(cacheKey);\nif (cached) return cached;\n\nconst fresh = await load${topicId}();\nawait cache.set(cacheKey, fresh, { ttlSeconds: ___ });\nreturn fresh;`,
      correctAnswer: 'a bounded TTL that matches the staleness budget',
      explanation: `Cache lifetime is part of correctness, not only performance. ${context.topic} becomes dangerous when stale data outlives the business tolerance.`,
    },
    {
      questionText: `Fill the parser boundary for ${context.topic} in ${context.domain.label}.`,
      codeSnippet: `export function parse${topicId}(raw) {\n  const normalized = normalize(raw);\n  if (!isValid${topicId}(normalized)) return ___;\n  return {\n    key: '${fnName}',\n    value: normalized,\n  };\n}`,
      correctAnswer: 'a typed invalid-result state',
      explanation: `Parsing should reject malformed input explicitly. Guessing across the ${meta.boundary.toLowerCase()} creates ambiguous states that are expensive to debug.`,
    },
  ][context.variantIndex];

  return variants;
}

function buildScenarioQuestion(context: QuestionContext): Omit<BankQuestion, 'id' | 'domain' | 'domainLabel' | 'topic' | 'type' | 'difficulty' | 'tags' | 'timeLimitMinutes'> {
  const meta = ARCHETYPE_META[context.domain.archetype];
  const variants = [
    {
      questionText: `A release affecting ${context.topic} shipped for ${context.domain.label}. Users now report ${meta.failure}. What should you inspect first?`,
      options: [
        `Trace the ${meta.boundary.toLowerCase()} and confirm where ${meta.artifact.toLowerCase()} diverged from the expected contract.`,
        'Rebuild the whole module from scratch before collecting evidence.',
        'Hide the failure behind a static fallback and revisit it next sprint.',
        'Change the UI copy without touching the runtime behavior.',
      ],
      explanation: `Scenario rounds reward diagnosis over guesswork. ${context.topic} is a strong prompt only when the candidate can show where the contract broke before proposing a patch.`,
    },
    {
      questionText: `A team says ${context.topic} passes demos but fails under real load in ${context.domain.label}. Which explanation is strongest?`,
      options: [
        `${meta.artifact} lacks an explicit ${meta.guard}, so concurrent or repeated input violates the contract.`,
        'The feature likely needs a new icon and a higher z-index value.',
        'The best next step is to move all logic into a single helper.',
        'The bug only matters if it can be reproduced in a unit test.',
      ],
      explanation: `Happy-path demos usually hide missing guards. The strongest explanation names the runtime condition that production introduces and the contract it violates.`,
    },
    {
      questionText: `A postmortem says ${context.topic} degraded silently for two hours in ${context.domain.label}. What was most likely missing?`,
      options: [
        `An alert tied to ${meta.metric}.`,
        'One more level of nested callbacks.',
        'A larger icon set in the deployment artifact.',
        'A shorter variable name in the hot path.',
      ],
      explanation: `When failures stay silent, the missing piece is usually the first operational signal. ${meta.metric[0].toUpperCase() + meta.metric.slice(1)} would have shortened the time to detection.`,
    },
    {
      questionText: `A fix for ${context.topic} reduced the visible bug but introduced a second regression. What is the local design mistake?`,
      options: [
        `The patch changed behavior without preserving the ${meta.boundary.toLowerCase()}.`,
        'The patch used too many descriptive variable names.',
        'The team wrote the fix in TypeScript instead of plain JavaScript.',
        'The rollout did not include a design review from marketing.',
      ],
      explanation: `Local patches become regressions when they blur a boundary to fix a symptom. Strong candidates name which contract moved and what new failure it invited.`,
    },
    {
      questionText: `Your teammate wants to retry every failure around ${context.topic}. Which response is strongest in ${context.domain.label}?`,
      options: [
        'Retry only after defining the safe retry boundary, max attempts, and rollback behavior.',
        'Retry forever so users never see an intermediate error state.',
        'Retry only on Fridays when traffic is lower.',
        'Move the entire feature behind a global boolean flag and hope for the best.',
      ],
      explanation: `Retries are a production design decision, not a cosmetic patch. The best answer makes the retry boundary explicit before changing behavior.`,
    },
  ][context.variantIndex];

  return {
    questionText: variants.questionText,
    options: variants.options,
    correctAnswer: variants.options[0],
    explanation: variants.explanation,
  };
}

function buildSystemDesignQuestion(context: QuestionContext): Omit<BankQuestion, 'id' | 'domain' | 'domainLabel' | 'topic' | 'type' | 'difficulty' | 'tags' | 'timeLimitMinutes'> {
  const meta = ARCHETYPE_META[context.domain.archetype];
  const prompts = [
    `Design a ${context.topic} workflow for ${context.domain.label}. Call out the ${meta.boundary.toLowerCase()}, the first failure mode you would design for, and the primary metric you would watch.`,
    `You need to scale ${context.topic} in ${context.domain.label} without losing observability. Describe the ownership boundary, the rollback plan, and the first dashboard you would build.`,
    `Design ${context.topic} so the ${meta.caller} can fail safely in ${context.domain.label}. Which states are explicit, where does rollback live, and what gets measured?`,
    `A new product requirement makes ${context.topic} cross-team in ${context.domain.label}. Describe the boundary contract, the incident path, and one metric that would prove the design is healthy.`,
    `Design a production-ready ${context.topic} path for ${context.domain.label}. Include the boundary, the blast-radius limiter, and the first operational signal you would page on.`,
  ];

  return {
    questionText: prompts[context.variantIndex],
    correctAnswer: `A strong answer defines the ${meta.boundary.toLowerCase()}, names one concrete failure mode, gives a rollback or containment plan, and ties the design to ${meta.metric}.`,
    explanation: `Architecture answers for ${context.topic} should stay observable and bounded. Candidates lose points when they list tools without naming ownership, failure handling, and measurable health.`,
  };
}

function buildCodingQuestion(context: QuestionContext): Omit<BankQuestion, 'id' | 'domain' | 'domainLabel' | 'topic' | 'type' | 'difficulty' | 'tags' | 'timeLimitMinutes'> {
  const meta = ARCHETYPE_META[context.domain.archetype];
  const topicId = toIdentifier(context.topic, true);
  const fnName = toIdentifier(context.topic);
  const variants = [
    {
      questionText: `Implement a ${context.topic} helper that ignores stale results and exposes loading, success, and error states without hiding them from the caller.`,
      codeSnippet: `export async function load${topicId}(request, applyResult) {\n  // Track the active request and ignore stale completions.\n}`,
      correctAnswer: 'Keep a request token, set loading before the call, apply the result only if the token still matches, and return an explicit state object with loading, data, and error fields.',
      explanation: `This coding prompt checks whether the candidate can keep ${meta.artifact.toLowerCase()} correct under rapid input instead of only writing the happy path.`,
    },
    {
      questionText: `Implement a ${context.topic} handler that validates input, deduplicates by request id, and returns an explicit result object.`,
      codeSnippet: `export async function handle${topicId}(input, repo) {\n  // Return { status, data, error } without hiding validation failures.\n}`,
      correctAnswer: 'Validate the payload first, short-circuit duplicates using the request id, perform the write once, and return a stable result object with success and failure states.',
      explanation: `This checks practical service design rather than trivia. The best answer protects correctness under retries and malformed input.`,
    },
    {
      questionText: `Implement a bounded retry wrapper for ${context.topic} that stops on non-retriable errors and records the last failure.`,
      codeSnippet: `export async function retry${topicId}(operation, options) {\n  // options: { maxAttempts, delayMs, isRetriable }\n}`,
      correctAnswer: 'Loop up to maxAttempts, stop immediately for non-retriable failures, sleep between attempts, and return the last error with attempt metadata when the wrapper gives up.',
      explanation: `The right retry wrapper distinguishes safe retries from dangerous ones. That is the core judgment being tested.`,
    },
    {
      questionText: `Build a ${context.topic} cache-aside helper that keeps TTL decisions explicit and does not cache failures.`,
      codeSnippet: `export async function load${topicId}WithCache(cache, key, loader, ttlSeconds) {\n  // Keep cache writes bounded and explicit.\n}`,
      correctAnswer: 'Read from cache first, call the loader on miss, write only successful values with the provided TTL, and propagate loader errors without caching them.',
      explanation: `Cache-aside helpers should preserve correctness before they optimize latency. Caching failures makes recovery harder to reason about.`,
    },
    {
      questionText: `Implement a parser for ${context.topic} that turns raw input into a stable contract and rejects invalid state instead of guessing.`,
      codeSnippet: `export function parse${topicId}(raw) {\n  // Return a normalized ${fnName} contract or a typed invalid state.\n}`,
      correctAnswer: 'Normalize the input, whitelist supported keys, coerce valid values into the target shape, and return a typed invalid-result state when the contract cannot be satisfied.',
      explanation: `Parsing and normalization should respect the ${meta.boundary.toLowerCase()}. Silent coercion produces hard-to-debug behavior later in the flow.`,
    },
  ][context.variantIndex];

  return variants;
}

function buildMockQuestion(context: QuestionContext): Omit<BankQuestion, 'id' | 'domain' | 'domainLabel' | 'topic' | 'type' | 'difficulty' | 'tags' | 'timeLimitMinutes'> {
  const prompts = [
    `Walk me through a project decision involving ${context.topic} in ${context.domain.label}. What tradeoff did you choose, what broke first, and what would you change now?`,
    `Tell me about the last time ${context.topic} caused a production issue in ${context.domain.label}. How did you narrow the cause and what permanent fix did you ship?`,
    `If you had to mentor a junior engineer through ${context.topic} in ${context.domain.label}, what would you tell them to get right first and why?`,
    `Describe a case where you had to simplify ${context.topic} in ${context.domain.label} because the original plan was too risky or too slow to ship.`,
    `Tell me about a time metrics or user feedback changed your understanding of ${context.topic} in ${context.domain.label}. What did you do differently afterward?`,
  ];

  return {
    questionText: prompts[context.variantIndex],
    correctAnswer: 'A strong response explains the original problem, the decision made, the tradeoff or failure that followed, the signal that proved it, and the improvement carried into the next iteration.',
    explanation: `Mock interview prompts are strongest when they force real engineering storytelling. ${context.topic} should sound like a concrete decision with evidence, not a rehearsed framework answer.`,
  };
}

function buildQuestion(context: QuestionContext): Omit<BankQuestion, 'id' | 'domain' | 'domainLabel' | 'topic' | 'type' | 'difficulty' | 'tags' | 'timeLimitMinutes'> {
  switch (context.type) {
    case 'mcq':
      return buildMcqQuestion(context);
    case 'fill_blank':
      return buildFillBlankQuestion(context);
    case 'scenario':
      return buildScenarioQuestion(context);
    case 'system_design':
      return buildSystemDesignQuestion(context);
    case 'coding':
      return buildCodingQuestion(context);
    case 'mock':
      return buildMockQuestion(context);
    default:
      return buildMcqQuestion(context);
  }
}

function contextFor(domain: QuestionDomain, index: number): QuestionContext {
  const type = QUESTION_TYPES[index % QUESTION_TYPES.length].id;
  const typeIndex = Math.floor(index / QUESTION_TYPES.length);
  const difficulty = ((typeIndex % 3) + 1) as 1 | 2 | 3;
  const topic = domain.topics[typeIndex % domain.topics.length];
  const variantIndex = Math.floor(typeIndex / domain.topics.length) % 5;

  return {
    domain,
    type,
    difficulty,
    topic,
    variantIndex,
  };
}

export const QUESTION_BANK: BankQuestion[] = QUESTION_DOMAINS.flatMap((domain) => (
  Array.from({ length: QUESTION_COUNT_PER_DOMAIN }, (_, index) => {
    const context = contextFor(domain, index);
    const generated = buildQuestion(context);
    return {
      ...generated,
      id: `${domain.id}-${context.type}-${String(index + 1).padStart(3, '0')}`,
      domain: domain.id,
      domainLabel: domain.label,
      topic: context.topic,
      type: context.type,
      difficulty: context.difficulty,
      tags: [
        context.type,
        slugify(context.topic),
        domain.family,
        context.difficulty === 3 ? 'faang' : context.difficulty === 2 ? 'product' : 'core',
      ],
      timeLimitMinutes: questionTimeLimit(context.type),
    } satisfies BankQuestion;
  })
));

export function getQuestionStats() {
  return QUESTION_DOMAINS.map((domain) => ({
    ...domain,
    total: QUESTION_BANK.filter((question) => question.domain === domain.id).length,
  }));
}

export function filterQuestions(filters: {
  domain?: string;
  types?: QuestionType[];
  type?: QuestionType | 'all';
  search?: string;
  faangOnly?: boolean;
  limit?: number;
} = {}) {
  const search = filters.search?.trim().toLowerCase() ?? '';
  const typeFilter = filters.types?.length
    ? filters.types
    : filters.type && filters.type !== 'all'
      ? [filters.type]
      : [];

  const items = QUESTION_BANK.filter((question) => {
    if (filters.domain && filters.domain !== 'all' && question.domain !== filters.domain) return false;
    if (typeFilter.length && !typeFilter.includes(question.type)) return false;
    if (filters.faangOnly && !question.tags.includes('faang')) return false;
    if (!search) return true;

    return [question.questionText, question.domainLabel, question.topic, question.type, ...question.tags]
      .some((value) => value.toLowerCase().includes(search));
  });

  return typeof filters.limit === 'number' ? items.slice(0, filters.limit) : items;
}
