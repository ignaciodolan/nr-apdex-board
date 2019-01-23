
import {ApplicationModel} from "./Application";

export interface HostModel {
  hostname: string;
  applications: ApplicationModel[];
  created_at: Date;
  updated_at: Date;
}