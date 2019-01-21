
export interface Application {
  name: string;
  contributors: [string];
  version: number;
  apdex: number;
  created_at: Date;
  updated_at: Date;
}