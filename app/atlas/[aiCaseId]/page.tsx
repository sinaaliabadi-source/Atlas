import Link from 'next/link';
import { notFound } from 'next/navigation';
import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import atlasData from '../../../data/atlas.json';
import { AtlasCase } from '../../../lib/types';

interface Props {
  params: { aiCaseId: string };
}

export default function CaseDetailPage({ params }: Props) {
  const { aiCaseId } = params;
  const currentIndex = atlasData.cases.findIndex((item) => item.id === aiCaseId);
  if (currentIndex === -1) {
    notFound();
  }
  const currentCase = atlasData.cases[currentIndex];

  const relatedOccurrences = atlasData.cases.filter((item) => item.id === aiCaseId);

  const prevCase = atlasData.cases[currentIndex - 1] as AtlasCase | undefined;
  const nextCase = atlasData.cases[currentIndex + 1] as AtlasCase | undefined;

  return (
    <Layout>
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <p className="text-sm text-blue-600 font-semibold mb-2">AI Case</p>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">{currentCase.label}</h1>
        <p className="text-slate-700 leading-7 mb-6 whitespace-pre-line">{currentCase.raw_text}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-2xl border border-slate-100 p-4 bg-blue-50/50">
            <h2 className="font-bold text-slate-900 mb-3">مسیر انتخابی</h2>
            <ul className="space-y-2 text-slate-700">
              <li><strong>صنعت:</strong> {currentCase.industry}</li>
              <li><strong>نوع:</strong> {currentCase.type}</li>
              <li><strong>واحد:</strong> {currentCase.unit}</li>
              <li><strong>موضوع فرایند:</strong> {currentCase.process_topic || '—'}</li>
              <li><strong>فرایند:</strong> {currentCase.process}</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-100 p-4 bg-white">
            <h2 className="font-bold text-slate-900 mb-3">حضور این AI Case در مسیرهای دیگر</h2>
            <div className="space-y-3 text-slate-700">
              {relatedOccurrences.map((item, idx) => (
                <div key={`${item.unit}-${idx}`} className="rounded-xl bg-slate-50 p-3">
                  <p className="font-semibold">{item.industry} / {item.type} / {item.unit}</p>
                  <p className="text-sm">{item.process_topic} → {item.process}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/atlas">
            <Button variant="secondary">بازگشت به اطلس</Button>
          </Link>
          {prevCase && (
            <Link href={`/atlas/${encodeURIComponent(prevCase.id)}`}>
              <Button variant="ghost">AI Case قبلی</Button>
            </Link>
          )}
          {nextCase && (
            <Link href={`/atlas/${encodeURIComponent(nextCase.id)}`}>
              <Button variant="ghost">AI Case بعدی</Button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
}
