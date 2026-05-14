import db from '../src/lib/db.js';
import { loadBackendCuratedQuestions } from '../src/lib/backendCuratedQuestionBank.js';

async function main() {
  const curated = loadBackendCuratedQuestions();
  const totals = await db.query<{ domain: string; total: number }>(
    `SELECT domain, COUNT(1)::int AS total
       FROM questions
      WHERE domain = 'backend'
      GROUP BY domain`,
  );
  const roundRows = await db.query<{ round_tag: string; total: number }>(
    `SELECT tag AS round_tag, COUNT(1)::int AS total
       FROM questions q
       CROSS JOIN LATERAL jsonb_array_elements_text(q.tags) AS tag
      WHERE q.domain = 'backend' AND tag LIKE 'round:%'
      GROUP BY tag
      ORDER BY tag`,
  );

  console.log(JSON.stringify({ report: curated.report, databaseTotals: totals, roundRows }, null, 2));
}

void main();
