'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import atlasData from '../../data/atlas.json';
import Stepper from '../../components/Stepper';
import Button from '../../components/Button';
import CaseCard from '../../components/CaseCard';
import Layout from '../../components/Layout';
import { AtlasCase } from '../../lib/types';

const steps = ['انتخاب صنعت', 'انتخاب نوع', 'انتخاب واحد', 'انتخاب فرایند', 'انتخاب AI Case'];

export default function AtlasPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [search, setSearch] = useState('');

  const industryList = atlasData.industries;
  const typeList = selectedIndustry ? Object.keys(atlasData.byIndustry[selectedIndustry] || {}) : [];
  const unitList = selectedIndustry && selectedType ? Object.keys(atlasData.byIndustry[selectedIndustry]?.[selectedType] || {}) : [];
  const topicList = useMemo(() => {
    if (!selectedIndustry || !selectedType || !selectedUnit) return [];
    return Object.keys(atlasData.byIndustry[selectedIndustry]?.[selectedType]?.[selectedUnit] || {});
  }, [selectedIndustry, selectedType, selectedUnit]);

  const processes = useMemo(() => {
    if (!selectedIndustry || !selectedType || !selectedUnit || !selectedTopic) return [];
    return atlasData.byIndustry[selectedIndustry][selectedType][selectedUnit][selectedTopic];
  }, [selectedIndustry, selectedType, selectedUnit, selectedTopic]);

  const cases = processes.flatMap((p) => p.cases);

  const searchResults = useMemo(() => {
    const term = search.trim();
    if (!term) return [] as AtlasCase[];
    return atlasData.cases.filter(
      (item) => item.label.includes(term) || item.process.includes(term)
    );
  }, [search]);

  const goToStep = (nextStep: number) => {
    setCurrentStep(Math.min(Math.max(nextStep, 0), steps.length - 1));
  };

  const resetDeeper = (level: 'industry' | 'type' | 'unit' | 'topic') => {
    if (level === 'industry') {
      setSelectedIndustry('');
      setSelectedType('');
      setSelectedUnit('');
      setSelectedTopic('');
      goToStep(0);
    } else if (level === 'type') {
      setSelectedType('');
      setSelectedUnit('');
      setSelectedTopic('');
      goToStep(1);
    } else if (level === 'unit') {
      setSelectedUnit('');
      setSelectedTopic('');
      goToStep(2);
    } else {
      setSelectedTopic('');
      goToStep(3);
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-50/60 via-transparent to-cyan-50/70" />
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">اطلس تعاملی AI Caseها</h1>
              <p className="text-slate-600 mt-2">صنعت → نوع → واحد → فرایند → AI Case</p>
            </div>
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder="جستجوی AI Case یا فرایند..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 rounded-2xl border border-slate-100 bg-white shadow-lg max-h-80 overflow-auto divide-y divide-slate-100"
                  >
                    {searchResults.map((result) => (
                      <a
                        key={result.id}
                        href={`/atlas/${encodeURIComponent(result.id)}`}
                        className="block px-4 py-3 hover:bg-blue-50/60"
                      >
                        <p className="font-semibold text-slate-900">{result.label}</p>
                        <p className="text-sm text-slate-600">{result.process}</p>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Stepper steps={steps} currentStep={currentStep} />

          <div className="grid gap-4">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="industries"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-3 gap-3"
                >
                  {industryList.map((industry) => (
                    <Button
                      key={industry}
                      variant={selectedIndustry === industry ? 'primary' : 'secondary'}
                      className="justify-between flex"
                      onClick={() => {
                        setSelectedIndustry(industry);
                        setSelectedType('');
                        setSelectedUnit('');
                        setSelectedTopic('');
                        goToStep(1);
                      }}
                    >
                      {industry}
                    </Button>
                  ))}
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="types"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-3 gap-3"
                >
                  {typeList.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? 'primary' : 'secondary'}
                      onClick={() => {
                        setSelectedType(type);
                        setSelectedUnit('');
                        setSelectedTopic('');
                        goToStep(2);
                      }}
                    >
                      {type}
                    </Button>
                  ))}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="units"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-3 gap-3"
                >
                  {unitList.map((unit) => (
                    <Button
                      key={unit}
                      variant={selectedUnit === unit ? 'primary' : 'secondary'}
                      onClick={() => {
                        setSelectedUnit(unit);
                        setSelectedTopic('');
                        goToStep(3);
                      }}
                    >
                      {unit}
                    </Button>
                  ))}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="topics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-3 gap-3"
                >
                  {topicList.map((topic) => (
                    <Button
                      key={topic}
                      variant={selectedTopic === topic ? 'primary' : 'secondary'}
                      onClick={() => {
                        setSelectedTopic(topic);
                        goToStep(4);
                      }}
                    >
                      {topic}
                    </Button>
                  ))}
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="cases"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {cases.map((item) => (
                    <CaseCard key={item.id} id={item.id} label={item.label} process={item.process} />
                  ))}
                  {cases.length === 0 && <p className="text-slate-600">هیچ AI Case برای این مسیر یافت نشد.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-white shadow-lg border border-slate-100 rounded-full px-4 py-2 flex items-center gap-3">
          <Button variant="ghost" onClick={() => goToStep(currentStep - 1)} disabled={currentStep === 0}>
            قبلی
          </Button>
          <Button
            variant="primary"
            onClick={() => goToStep(currentStep + 1)}
            disabled={currentStep === steps.length - 1}
          >
            بعدی
          </Button>
          <Button variant="ghost" onClick={() => resetDeeper('industry')}>
            شروع دوباره
          </Button>
        </div>
      </div>
    </Layout>
  );
}
