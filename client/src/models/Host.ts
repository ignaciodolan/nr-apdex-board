
import {Application} from "./Application";

export interface Host {
  hostname: string;
  applications: [Application];
  created_at: Date;
  updated_at: Date;
}