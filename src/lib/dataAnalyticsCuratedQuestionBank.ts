import { loadCuratedMarkdownQuestions } from './curatedMarkdownQuestionBank.js';

export const DATA_ANALYTICS_TOPICS = [
  'Statistics Fundamentals',
  'SQL for Analytics',
  'Excel and Spreadsheets',
  'Data Visualization',
  'Business Metrics and KPIs',
  'Dashboard Design',
  'Data Cleaning',
  'Exploratory Data Analysis',
  'A/B Testing and Experimentation',
  'Product Analytics',
  'Marketing Analytics',
  'Financial Analytics',
  'Python for Analytics',
  'BI Tools',
  'Data Storytelling',
  'Data Analytics Scenarios',
  'Data Analytics Architecture',
  'Data Analytics Coding',
  'Data Analytics Mixed Concepts',
  'Data Analytics Mock Interview',
  'Data Analytics FAANG',
] as const;

export function loadDataAnalyticsCuratedQuestions() {
  return loadCuratedMarkdownQuestions({
    bankFile: 'data-analytics-question-bank.md',
    idPrefix: 'data-analytics-curated',
    domain: 'data-analytics',
    domainLabel: 'Data Analytics',
    topicAliases: {
      'BUSINESS METRICS AND KPI': 'Business Metrics and KPIs',
      'BUSINESS METRICS AND KPIS': 'Business Metrics and KPIs',
    },
    roundTopics: {
      scenario: 'Data Analytics Scenarios',
      architecture: 'Data Analytics Architecture',
      coding: 'Data Analytics Coding',
      concept: 'Data Analytics Mixed Concepts',
      fill: 'Data Analytics Mixed Concepts',
      mock: 'Data Analytics Mock Interview',
      faang: 'Data Analytics FAANG',
    },
  });
}
