export interface AtlasCase {
  id: string;
  label: string;
  raw_text: string;
  industry: string;
  type: string;
  unit: string;
  process_topic: string;
  process: string;
}

export interface AtlasData {
  industries: string[];
  byIndustry: Record<string, Record<string, Record<string, Record<string, { process: string; cases: AtlasCase[] }[]>>>>;
  cases: AtlasCase[];
}
