import {
  formatPracticeDomainList,
  PRACTICE_DOMAIN_LABELS,
  toPracticeDomain,
  type PracticeDomainId,
} from './practiceSessionConfig.js';

export type ScenarioDomainId = PracticeDomainId;

export const SCENARIO_ANGLES = [
  'production incident',
  'architectural decision',
  'team disagreement',
  'performance crisis',
  'security event',
  'stakeholder conflict',
  'deadline tradeoff',
] as const;

export const SCENARIO_TOPIC_CATEGORIES: Record<ScenarioDomainId, Record<string, string[]>> = {
  frontend: {
    Performance: ['React Performance Debugging', 'Bundle Size Crisis', 'SSR Migration', 'Build Pipeline Optimization'],
    Architecture: ['Component Architecture Decision', 'CSS Architecture Migration', 'State Management Refactor', 'Design System Adoption'],
    Delivery: ['Accessibility Audit', 'Third-party Library Removal', 'Testing Strategy', 'Mobile Responsiveness Emergency'],
    Teamwork: ['Code Review Conflict', 'Deadline vs Quality Tradeoff', 'New Framework Evaluation'],
  },
  backend: {
    Reliability: ['API Rate Limiting Under Load', 'Background Job Failure', 'Cache Invalidation Strategy', 'Service Dependency Outage'],
    Data: ['Database Migration in Production', 'Data Consistency Problem', 'Performance Bottleneck Investigation', 'Observability Gap'],
    Platform: ['Authentication System Overhaul', 'API Versioning Decision', 'Third-party API Deprecation', 'Scaling Decision'],
    Risk: ['Security Vulnerability Discovery', 'Microservice Extraction', 'Webhook Reliability Issue'],
  },
  'full-stack': {
    Product: ['Full Feature End to End', 'Onboarding Flow', 'Notification System', 'Export Feature'],
    Architecture: ['Auth Flow Redesign', 'Role-Based Access Control', 'API Contract Change', 'Multi-tenant Architecture'],
    Data: ['Database Schema Migration', 'Search Implementation', 'Performance Across Stack', 'File Upload System'],
    Integrations: ['Real-time Feature Addition', 'Payment Integration', 'Third-party OAuth Integration'],
  },
  cybersecurity: {
    'Web App Security': ['SQL Injection Discovery', 'Broken Access Control Fix', 'JWT Implementation Review', 'CORS Misconfiguration'],
    'Incident Response': ['Credential Leak Response', 'Data Breach Response', 'Brute Force Attack'],
    Governance: ['Security Audit Preparation', 'Dependency Vulnerability', 'Secrets in Codebase'],
  },
  'data-analytics': {
    Metrics: ['North Star Metric Definition', 'Metric Inconsistency', 'Dashboard Accuracy Audit'],
    Experimentation: ['A-B Test Analysis', 'Retention Drop Investigation', 'Funnel Analysis'],
    Operations: ['Stakeholder Data Request', 'Cohort Analysis', 'Data Pipeline Failure', 'Report Automation'],
  },
  'data-science': {
    Modeling: ['Model Performance Degradation', 'Feature Selection Decision', 'Model Deployment Decision', 'Model Retraining Strategy'],
    Experimentation: ['A-B Test Design', 'Experiment Result Interpretation', 'Baseline Comparison'],
    Data: ['Imbalanced Dataset Crisis', 'Data Quality Issue'],
    Communication: ['Stakeholder Communication of Uncertainty'],
  },
  'ai-ml': {
    'LLM Systems': ['LLM Hallucination in Production', 'Prompt Engineering Failure', 'RAG Pipeline Debugging', 'Structured Output Failure'],
    Runtime: ['Inference Latency Crisis', 'Vector Search Quality', 'Model Version Rollback'],
    Strategy: ['Evaluation Framework Design', 'Fine-tuning Decision', 'Dataset Curation Issue'],
  },
};

const EXTRA_SCENARIO_TOPIC_ENTRIES: Array<{ topic: string; domains: ScenarioDomainId[]; aliases?: string[] }> = [
  { topic: 'Kafka Consumer Groups', domains: ['backend'] },
  { topic: 'API Rate Limiting', domains: ['backend', 'full-stack'] },
  { topic: 'Docker Networking', domains: ['backend'] },
  { topic: 'React Server Components', domains: ['frontend'], aliases: ['server components'] },
  { topic: 'CSS Centering', domains: ['frontend'] },
  { topic: 'Webhook Retries', domains: ['backend'] },
  { topic: 'Feature Flags', domains: ['full-stack', 'frontend'] },
];

const TOPIC_DOMAIN_MAP = new Map<string, ScenarioDomainId[]>();

function addTopicMapping(topic: string, domains: ScenarioDomainId[]) {
  TOPIC_DOMAIN_MAP.set(normalizeScenarioTopic(topic), [...domains]);
}

for (const [domain, categories] of Object.entries(SCENARIO_TOPIC_CATEGORIES) as Array<[ScenarioDomainId, Record<string, string[]>]>) {
  for (const topics of Object.values(categories)) {
    for (const topic of topics) addTopicMapping(topic, [domain]);
  }
}

for (const entry of EXTRA_SCENARIO_TOPIC_ENTRIES) {
  addTopicMapping(entry.topic, entry.domains);
  for (const alias of entry.aliases ?? []) addTopicMapping(alias, entry.domains);
}

export function normalizeScenarioTopic(value: string) {
  return value
    .toLowerCase()
    .replace(/[()]/g, ' ')
    .replace(/[^a-z0-9+#.\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function toScenarioDomain(value: string): ScenarioDomainId | '' {
  return toPracticeDomain(value);
}

export function getScenarioTopicDomains(topic: string) {
  return TOPIC_DOMAIN_MAP.get(normalizeScenarioTopic(topic)) ?? null;
}

export function findScenarioTopicDomains(topic: string) {
  const normalizedTopic = normalizeScenarioTopic(topic);
  if (!normalizedTopic) return null;

  const exactMatch = TOPIC_DOMAIN_MAP.get(normalizedTopic);
  if (exactMatch?.length) return [...exactMatch];

  const matchedDomains = new Set<ScenarioDomainId>();
  for (const [mappedTopic, domains] of TOPIC_DOMAIN_MAP.entries()) {
    if (!mappedTopic.includes(normalizedTopic) && !normalizedTopic.includes(mappedTopic)) continue;
    for (const domain of domains) matchedDomains.add(domain);
  }

  return matchedDomains.size ? [...matchedDomains] : null;
}

export function getScenarioTagCloud(domain: string) {
  const canonical = toScenarioDomain(domain);
  if (!canonical) return [];
  return [...new Set(Object.values(SCENARIO_TOPIC_CATEGORIES[canonical]).flat())];
}

export function getScenarioTopicCategories(domain: string) {
  const canonical = toScenarioDomain(domain);
  return canonical ? { ...SCENARIO_TOPIC_CATEGORIES[canonical] } : {};
}

export function formatScenarioDomainList(domains: readonly ScenarioDomainId[]) {
  return formatPracticeDomainList(domains);
}

export const SCENARIO_DOMAIN_LABELS = PRACTICE_DOMAIN_LABELS;