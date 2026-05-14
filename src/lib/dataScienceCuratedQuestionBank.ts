import { loadCuratedMarkdownQuestions } from './curatedMarkdownQuestionBank.js';

export const DATA_SCIENCE_TOPICS = [
  'Statistics and Probability Fundamentals',
  'Data Collection and Exploration',
  'Data Cleaning and Preprocessing',
  'Feature Engineering',
  'Machine Learning Fundamentals',
  'Supervised Learning',
  'Unsupervised Learning',
  'Model Evaluation',
  'Regression and Classification',
  'Time Series Analysis',
  'Natural Language Processing',
  'Deep Learning',
  'Big Data and Distributed Computing',
  'Experimentation and Causal Inference',
  'Data Science Production and MLOps',
  'Data Science Scenarios',
  'Data Science Architecture',
  'Data Science Coding',
  'Data Science Mixed Concepts',
  'Data Science Mock Interview',
  'Data Science FAANG',
] as const;

export function loadDataScienceCuratedQuestions() {
  return loadCuratedMarkdownQuestions({
    bankFile: 'data-science-question-bank.md',
    idPrefix: 'data-science-curated',
    domain: 'data-science',
    domainLabel: 'Data Science',
    roundTopics: {
      scenario: 'Data Science Scenarios',
      architecture: 'Data Science Architecture',
      coding: 'Data Science Coding',
      concept: 'Data Science Mixed Concepts',
      fill: 'Data Science Mixed Concepts',
      mock: 'Data Science Mock Interview',
      faang: 'Data Science FAANG',
    },
  });
}
