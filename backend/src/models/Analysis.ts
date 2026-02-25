export interface Analysis {
  id?: number;
  user_id: number;
  image_path?: string;
  results: object; // JSON
  created_at?: string;
}

export interface CreateAnalysisData {
  user_id: number;
  image_path?: string;
  results: object;
}

export interface AnalysisResult {
  skin_type: string;
  concerns: string[];
  recommendations: string[];
}