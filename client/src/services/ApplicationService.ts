import {ApplicationModel} from "../models/Application";
import {Config} from "../config";
import axios from 'axios';

export class ApplicationService {
  public baseURL: string = `${Config.API_URL}/applications`;

  /**
   * Fetch hosts
   * Get all hosts with their top 25 applications ordered by its apdex
   */
  public getTopAppsByHost(hostname: string): Promise<ApplicationModel[]> {
    const hostURL = `${this.baseURL}/?hostname=${hostname}`;

    return axios.get(hostURL)
      .then((response) => {
        if (response.data && response.data.error) {
          throw new Error(response.data.message);
        }

        return response.data.applications;
      })
  };
}