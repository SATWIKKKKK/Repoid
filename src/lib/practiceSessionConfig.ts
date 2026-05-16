export type PracticeDomainId =
  | 'frontend'
  | 'backend'
  | 'full-stack'
  | 'cybersecurity'
  | 'data-analytics'
  | 'data-science'
  | 'ai-ml';

export const PRACTICE_DOMAIN_LABELS: Record<PracticeDomainId, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  'full-stack': 'Full Stack',
  cybersecurity: 'Cybersecurity',
  'data-analytics': 'Data Analytics',
  'data-science': 'Data Science',
  'ai-ml': 'AI / ML',
};

const PRACTICE_DOMAIN_ALIASES: Record<string, PracticeDomainId> = {
  frontend: 'frontend',
  react: 'frontend',
  'next-js': 'frontend',
  typescript: 'frontend',
  languages: 'frontend',
  backend: 'backend',
  'backend-nodejs': 'backend',
  'backend-python': 'backend',
  'full-stack': 'full-stack',
  fullstack: 'full-stack',
  cybersecurity: 'cybersecurity',
  security: 'cybersecurity',
  'data-analytics': 'data-analytics',
  'data-science': 'data-science',
  'ai-ml': 'ai-ml',
};

export const PRACTICE_TAG_CLOUD: Record<PracticeDomainId, string[]> = {
  backend: [
    'Message Queues',
    'WebSockets',
    'Rate Limiting',
    'Database Replication',
    'Event-Driven Architecture',
    'gRPC',
    'Background Jobs',
    'API Versioning',
    'Circuit Breakers',
    'Service Mesh',
    'CQRS',
    'Distributed Tracing',
    'File Storage',
    'Container Orchestration',
    'Search Infrastructure',
  ],
  frontend: [
    'React Hooks',
    'State Management',
    'Performance Optimization',
    'Accessibility',
    'CSS Layout',
    'Form Handling',
    'Code Splitting',
    'Server-Side Rendering',
    'Web APIs',
    'Animation',
    'Component Architecture',
    'TypeScript Patterns',
    'Testing',
    'Error Boundaries',
    'Micro-frontends',
  ],
  'full-stack': [
    'Auth Flows',
    'Real-Time Features',
    'File Uploads',
    'API Contracts',
    'Role-Based Access',
    'WebSockets',
    'Database Migrations',
    'Caching Strategies',
    'End-to-End Testing',
    'Deployment Pipelines',
    'Monorepo Patterns',
    'Feature Flags',
    'API Rate Limiting',
    'Error Monitoring',
    'Background Processing',
  ],
  cybersecurity: [
    'SQL Injection',
    'XSS',
    'CSRF',
    'Broken Authentication',
    'IDOR',
    'Security Headers',
    'JWT Vulnerabilities',
    'CORS Misconfiguration',
    'Secrets Management',
    'Dependency Auditing',
    'Container Security',
    'OAuth Flows',
    'API Security',
    'Logging and Monitoring',
    'Penetration Testing Basics',
  ],
  'data-analytics': [
    'Window Functions',
    'Cohort Analysis',
    'Funnel Analysis',
    'Retention Metrics',
    'A-B Testing',
    'Dashboard Design',
    'Data Modeling',
    'Business Metrics',
    'SQL Optimization',
    'ETL Patterns',
    'Data Quality',
    'Metric Definition',
    'Pivot Tables',
    'Time Series Analysis',
    'Reporting Automation',
  ],
  'data-science': [
    'Feature Engineering',
    'Cross Validation',
    'Imbalanced Datasets',
    'Hypothesis Testing',
    'EDA Patterns',
    'Model Selection',
    'Regularization',
    'Dimensionality Reduction',
    'Time Series Forecasting',
    'Model Interpretability',
    'Data Cleaning',
    'Experiment Design',
    'Statistical Inference',
    'Ensemble Methods',
    'Deployment Patterns',
  ],
  'ai-ml': [
    'Prompt Engineering',
    'RAG Architecture',
    'Embedding Models',
    'Fine-tuning',
    'Inference Optimization',
    'Evaluation Frameworks',
    'Vector Databases',
    'LLM APIs',
    'Agents and Tool Use',
    'Model Distillation',
    'Dataset Curation',
    'Hallucination Mitigation',
    'Structured Outputs',
    'Multimodal Models',
    'ML System Design',
  ],
};

const TOPIC_ENTRIES: Array<{ topic: string; domains: PracticeDomainId[]; aliases?: string[] }> = [
  { topic: 'React', domains: ['frontend', 'full-stack'], aliases: ['react js', 'reactjs'] },
  { topic: 'React Hooks', domains: ['frontend', 'full-stack'], aliases: ['hooks'] },
  { topic: 'State Management', domains: ['frontend', 'full-stack'], aliases: ['redux', 'zustand', 'context api'] },
  { topic: 'Accessibility', domains: ['frontend', 'full-stack'], aliases: ['a11y', 'web accessibility'] },
  { topic: 'CSS Layout', domains: ['frontend', 'full-stack'], aliases: ['flexbox', 'grid layout', 'css grid'] },
  { topic: 'Form Handling', domains: ['frontend', 'full-stack'], aliases: ['forms', 'react forms'] },
  { topic: 'Code Splitting', domains: ['frontend', 'full-stack'], aliases: ['lazy loading'] },
  { topic: 'Server-Side Rendering', domains: ['frontend', 'full-stack'], aliases: ['ssr', 'next.js ssr'] },
  { topic: 'Web APIs', domains: ['frontend', 'full-stack'], aliases: ['browser apis', 'dom apis'] },
  { topic: 'Animation', domains: ['frontend'], aliases: ['web animation', 'css animation'] },
  { topic: 'Component Architecture', domains: ['frontend', 'full-stack'] },
  { topic: 'TypeScript Patterns', domains: ['frontend', 'full-stack'], aliases: ['typescript', 'typescript for frontend'] },
  { topic: 'Testing', domains: ['frontend', 'backend', 'full-stack'], aliases: ['unit testing', 'integration testing'] },
  { topic: 'Error Boundaries', domains: ['frontend', 'full-stack'] },
  { topic: 'Micro-frontends', domains: ['frontend', 'full-stack'], aliases: ['microfrontends'] },
  { topic: 'GraphQL', domains: ['frontend', 'backend', 'full-stack'] },
  { topic: 'XSS', domains: ['cybersecurity', 'frontend', 'full-stack'], aliases: ['cross site scripting'] },
  { topic: 'Message Queues', domains: ['backend', 'full-stack'], aliases: ['queues', 'rabbitmq'] },
  { topic: 'Kafka', domains: ['backend', 'full-stack', 'data-science'] },
  { topic: 'WebSockets', domains: ['backend', 'frontend', 'full-stack'], aliases: ['realtime', 'real-time features'] },
  { topic: 'Rate Limiting', domains: ['backend', 'full-stack'], aliases: ['api rate limiting'] },
  { topic: 'Database Replication', domains: ['backend', 'data-science'] },
  { topic: 'Event-Driven Architecture', domains: ['backend', 'full-stack', 'data-science'] },
  { topic: 'gRPC', domains: ['backend', 'full-stack'] },
  { topic: 'Background Jobs', domains: ['backend', 'full-stack'], aliases: ['background processing', 'job queues'] },
  { topic: 'API Versioning', domains: ['backend', 'full-stack'] },
  { topic: 'Circuit Breakers', domains: ['backend', 'full-stack'] },
  { topic: 'Service Mesh', domains: ['backend'] },
  { topic: 'CQRS', domains: ['backend', 'full-stack'] },
  { topic: 'Distributed Tracing', domains: ['backend', 'full-stack'] },
  { topic: 'File Storage', domains: ['backend', 'full-stack'] },
  { topic: 'Container Orchestration', domains: ['backend', 'cybersecurity'] },
  { topic: 'Search Infrastructure', domains: ['backend', 'full-stack', 'data-science'] },
  { topic: 'Auth Flows', domains: ['full-stack', 'backend', 'frontend', 'cybersecurity'], aliases: ['authentication', 'oauth flows'] },
  { topic: 'File Uploads', domains: ['full-stack', 'backend', 'frontend'] },
  { topic: 'API Contracts', domains: ['full-stack', 'backend', 'frontend'] },
  { topic: 'Role-Based Access', domains: ['full-stack', 'backend', 'cybersecurity'], aliases: ['rbac'] },
  { topic: 'Database Migrations', domains: ['full-stack', 'backend'] },
  { topic: 'Caching Strategies', domains: ['full-stack', 'backend'] },
  { topic: 'End-to-End Testing', domains: ['full-stack', 'frontend', 'backend'] },
  { topic: 'Deployment Pipelines', domains: ['full-stack', 'backend', 'cybersecurity'] },
  { topic: 'Monorepo Patterns', domains: ['full-stack', 'frontend'] },
  { topic: 'Feature Flags', domains: ['full-stack', 'backend', 'frontend'] },
  { topic: 'Error Monitoring', domains: ['full-stack', 'backend', 'frontend'] },
  { topic: 'SQL Injection', domains: ['cybersecurity', 'backend', 'full-stack'] },
  { topic: 'CSRF', domains: ['cybersecurity', 'frontend', 'full-stack'] },
  { topic: 'Broken Authentication', domains: ['cybersecurity', 'backend', 'full-stack'] },
  { topic: 'IDOR', domains: ['cybersecurity', 'backend', 'full-stack'] },
  { topic: 'Security Headers', domains: ['cybersecurity', 'frontend', 'backend'] },
  { topic: 'JWT Vulnerabilities', domains: ['cybersecurity', 'backend', 'full-stack'] },
  { topic: 'CORS Misconfiguration', domains: ['cybersecurity', 'frontend', 'backend', 'full-stack'] },
  { topic: 'Secrets Management', domains: ['cybersecurity', 'backend', 'ai-ml'] },
  { topic: 'Dependency Auditing', domains: ['cybersecurity', 'frontend', 'backend'] },
  { topic: 'Container Security', domains: ['cybersecurity', 'backend'] },
  { topic: 'API Security', domains: ['cybersecurity', 'backend', 'full-stack'] },
  { topic: 'Logging and Monitoring', domains: ['cybersecurity', 'backend', 'data-analytics'] },
  { topic: 'Penetration Testing Basics', domains: ['cybersecurity'] },
  { topic: 'Window Functions', domains: ['data-analytics', 'data-science', 'backend'] },
  { topic: 'Cohort Analysis', domains: ['data-analytics'] },
  { topic: 'Funnel Analysis', domains: ['data-analytics'] },
  { topic: 'Retention Metrics', domains: ['data-analytics'] },
  { topic: 'A-B Testing', domains: ['data-analytics', 'data-science'], aliases: ['ab testing', 'a/b testing'] },
  { topic: 'Dashboard Design', domains: ['data-analytics'] },
  { topic: 'Data Modeling', domains: ['data-analytics', 'data-science', 'backend'] },
  { topic: 'Business Metrics', domains: ['data-analytics'] },
  { topic: 'SQL Optimization', domains: ['data-analytics', 'backend'] },
  { topic: 'ETL Patterns', domains: ['data-analytics', 'data-science'] },
  { topic: 'Data Quality', domains: ['data-analytics', 'data-science', 'ai-ml'] },
  { topic: 'Metric Definition', domains: ['data-analytics'] },
  { topic: 'Pivot Tables', domains: ['data-analytics'] },
  { topic: 'Time Series Analysis', domains: ['data-analytics', 'data-science'] },
  { topic: 'Reporting Automation', domains: ['data-analytics'] },
  { topic: 'Pandas', domains: ['data-science', 'ai-ml'], aliases: ['pandas dataframes', 'pandas data frames'] },
  { topic: 'Feature Engineering', domains: ['data-science', 'ai-ml'] },
  { topic: 'Cross Validation', domains: ['data-science', 'ai-ml'] },
  { topic: 'Imbalanced Datasets', domains: ['data-science', 'ai-ml'] },
  { topic: 'Hypothesis Testing', domains: ['data-science', 'data-analytics'] },
  { topic: 'EDA Patterns', domains: ['data-science', 'data-analytics'], aliases: ['eda'] },
  { topic: 'Model Selection', domains: ['data-science', 'ai-ml'] },
  { topic: 'Regularization', domains: ['data-science', 'ai-ml'] },
  { topic: 'Dimensionality Reduction', domains: ['data-science', 'ai-ml'] },
  { topic: 'Time Series Forecasting', domains: ['data-science', 'ai-ml'] },
  { topic: 'Model Interpretability', domains: ['data-science', 'ai-ml'] },
  { topic: 'Data Cleaning', domains: ['data-science', 'data-analytics'] },
  { topic: 'Experiment Design', domains: ['data-science', 'data-analytics', 'ai-ml'] },
  { topic: 'Statistical Inference', domains: ['data-science', 'data-analytics'] },
  { topic: 'Ensemble Methods', domains: ['data-science', 'ai-ml'] },
  { topic: 'Deployment Patterns', domains: ['data-science', 'ai-ml', 'backend'] },
  { topic: 'Prompt Engineering', domains: ['ai-ml'] },
  { topic: 'RAG Architecture', domains: ['ai-ml', 'backend'], aliases: ['rag'] },
  { topic: 'Embedding Models', domains: ['ai-ml'] },
  { topic: 'Fine-tuning', domains: ['ai-ml'] },
  { topic: 'Inference Optimization', domains: ['ai-ml', 'backend'] },
  { topic: 'Evaluation Frameworks', domains: ['ai-ml', 'data-science'] },
  { topic: 'Vector Databases', domains: ['ai-ml', 'backend'] },
  { topic: 'LLM APIs', domains: ['ai-ml', 'backend', 'frontend'] },
  { topic: 'Agents and Tool Use', domains: ['ai-ml'] },
  { topic: 'Model Distillation', domains: ['ai-ml'] },
  { topic: 'Dataset Curation', domains: ['ai-ml', 'data-science'] },
  { topic: 'Hallucination Mitigation', domains: ['ai-ml'] },
  { topic: 'Structured Outputs', domains: ['ai-ml', 'backend'] },
  { topic: 'Multimodal Models', domains: ['ai-ml'] },
  { topic: 'ML System Design', domains: ['ai-ml', 'data-science'] },
  { topic: 'SQL Joins', domains: ['data-analytics', 'data-science', 'backend'], aliases: ['joins'] },
];

const TOPIC_DOMAIN_MAP = new Map<string, PracticeDomainId[]>();

function addTopicMapping(topic: string, domains: PracticeDomainId[]) {
  TOPIC_DOMAIN_MAP.set(normalizePracticeTopic(topic), [...domains]);
}

for (const entry of TOPIC_ENTRIES) {
  addTopicMapping(entry.topic, entry.domains);
  for (const alias of entry.aliases ?? []) addTopicMapping(alias, entry.domains);
}

export function normalizePracticeTopic(value: string) {
  return value
    .toLowerCase()
    .replace(/[()]/g, ' ')
    .replace(/[^a-z0-9+#.\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function toPracticeDomain(value: string): PracticeDomainId | '' {
  const normalized = String(value ?? '').trim().toLowerCase();
  return PRACTICE_DOMAIN_ALIASES[normalized] ?? '';
}

export function getPracticeTopicDomains(topic: string) {
  return TOPIC_DOMAIN_MAP.get(normalizePracticeTopic(topic)) ?? null;
}

export function getPracticeTagCloud(domain: string) {
  const canonical = toPracticeDomain(domain);
  return canonical ? [...PRACTICE_TAG_CLOUD[canonical]] : [];
}

export function formatPracticeDomainList(domains: readonly PracticeDomainId[]) {
  const labels = domains.map((domain) => PRACTICE_DOMAIN_LABELS[domain]);
  if (!labels.length) return '';
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} or ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')}, or ${labels[labels.length - 1]}`;
}