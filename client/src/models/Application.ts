
export interface ApplicationModel {
  name: string;
  contributors: [string];
  version: number;
  apdex: number;
  created_at: Date;
  updated_at: Date;
}