import db from '../src/lib/db.js';

async function main() {
  const rows = await db.query<{ type: string; total: number }>(
    `SELECT type, COUNT(1)::int AS total
       FROM questions
      WHERE id LIKE 'frontend-curated-%'
      GROUP BY type
      ORDER BY type`,
  );
  const totals = await db.query<{ domain: string; total: number }>(
    `SELECT domain, COUNT(1)::int AS total
       FROM questions
      WHERE domain = 'frontend'
      GROUP BY domain`,
  );

  console.log(JSON.stringify({ curatedByType: rows, frontendTotals: totals }, null, 2));
}

void main();
