import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import { AtlasCase, AtlasData } from '../lib/types';

const EXCEL_FILE = path.resolve(process.cwd(), 'ai_map_with_topics.xlsx');
const OUTPUT_FILE = path.resolve(process.cwd(), 'data/atlas.json');

function normalizeCell(value: unknown): string {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function splitList(value: string): string[] {
  if (!value) return [];
  const separator = value.includes('|') ? '|' : value.includes(',') ? ',' : '|';
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildAtlas(cases: AtlasCase[]): AtlasData {
  const byIndustry: AtlasData['byIndustry'] = {};
  const industries = new Set<string>();

  cases.forEach((aiCase) => {
    industries.add(aiCase.industry);
    if (!byIndustry[aiCase.industry]) byIndustry[aiCase.industry] = {};
    if (!byIndustry[aiCase.industry][aiCase.type]) byIndustry[aiCase.industry][aiCase.type] = {};
    if (!byIndustry[aiCase.industry][aiCase.type][aiCase.unit]) byIndustry[aiCase.industry][aiCase.type][aiCase.unit] = {};
    const topicKey = aiCase.process_topic || aiCase.process;
    if (!byIndustry[aiCase.industry][aiCase.type][aiCase.unit][topicKey]) {
      byIndustry[aiCase.industry][aiCase.type][aiCase.unit][topicKey] = [];
    }

    const topicEntry = byIndustry[aiCase.industry][aiCase.type][aiCase.unit][topicKey];
    let processEntry = topicEntry.find((item) => item.process === aiCase.process);
    if (!processEntry) {
      processEntry = { process: aiCase.process, cases: [] };
      topicEntry.push(processEntry);
    }

    processEntry.cases.push(aiCase);
  });

  return {
    industries: Array.from(industries),
    byIndustry,
    cases,
  };
}

function main() {
  if (!fs.existsSync(EXCEL_FILE)) {
    console.warn(`⚠️  Excel file not found at ${EXCEL_FILE}. Please place 'ai_map_with_topics.xlsx' in the project root.`);
    process.exit(0);
  }

  const workbook = XLSX.readFile(EXCEL_FILE);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

  const cases: AtlasCase[] = [];

  rows.forEach((row, index) => {
    const industry = normalizeCell(row.industry);
    const type = normalizeCell(row.type);
    const unit = normalizeCell(row.unit);
    const process_topic = normalizeCell(row.process_topic);
    const process = normalizeCell(row.process);
    const ids = splitList(normalizeCell(row.ai_case_ids));
    const labels = splitList(normalizeCell(row.ai_case_labels));
    const rawText = normalizeCell(row.ai_cases_raw);

    ids.forEach((id, idx) => {
      const label = labels[idx] || `AI Case ${id}`;
      cases.push({
        id,
        label,
        raw_text: rawText,
        industry,
        type,
        unit,
        process_topic,
        process,
      });
    });
  });

  const atlas = buildAtlas(cases);
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(atlas, null, 2), 'utf8');
  console.log(`✅ Atlas data written to ${OUTPUT_FILE}`);
}

main();
