import { jsPDF } from 'jspdf';
export type PdfQuestion = {
  question?: string;
  questionText?: string;
  answer?: string;
  correctAnswer?: string;
  explanation?: string;
};

export async function exportQuestionsPdf(params: {
  title: string;
  domain?: string;
  sourceId?: string;
  exportType: string;
  questions: PdfQuestion[];
}) {
  const entitlementResponse = await fetch('/api/billing/entitlement?feature=pdf-export', { credentials: 'include' }).catch(() => null);
  if (!entitlementResponse) {
    throw new Error('Could not verify PDF export access. Please refresh and try again.');
  }
  const entitlementPayload = await entitlementResponse.json().catch(() => ({}));
  if (!entitlementResponse.ok || entitlementPayload.entitlement?.hasAccess === false) {
    throw new Error(entitlementPayload.entitlement?.reason || 'PDF exports are available on the Yearly plan. Upgrade to unlock.');
  }

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const width = doc.internal.pageSize.getWidth();
  const margin = 44;
  let y = 48;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Repoid', margin, y);
  y += 28;
  doc.setFontSize(14);
  doc.text(params.title, margin, y);
  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Exported ${new Date().toLocaleDateString('en-IN')} ${params.domain ? `• ${params.domain}` : ''}`, margin, y);
  y += 28;

  params.questions.forEach((item, index) => {
    const question = item.questionText || item.question || 'Question';
    const answer = item.correctAnswer || item.answer || item.explanation || 'Answer not available.';
    const lines = [
      ...doc.splitTextToSize(`${index + 1}. ${question}`, width - margin * 2),
      '',
      ...doc.splitTextToSize(`Answer: ${answer}`, width - margin * 2),
    ];
    const blockHeight = lines.length * 13 + 16;
    if (y + blockHeight > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
    doc.setFont('helvetica', 'bold');
    doc.text(lines[0], margin, y);
    y += 14;
    doc.setFont('helvetica', 'normal');
    lines.slice(1).forEach((line) => {
      if (line) doc.text(line, margin, y);
      y += 13;
    });
    y += 10;
  });

  const safeName = params.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'repoid-questions';
  doc.save(`${safeName}-${new Date().toISOString().slice(0, 10)}.pdf`);

  await fetch('/api/pdf-export-events', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ exportType: params.exportType, sourceId: params.sourceId, title: params.title }),
  }).catch(() => undefined);
}
