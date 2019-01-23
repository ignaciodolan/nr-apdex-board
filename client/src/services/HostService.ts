import {HostModel} from "../models/Host";
import axios from 'axios';
import {Config} from "../config";
import {ApplicationModel} from "../models/Application";

export class HostService {
  public baseURL: string = `${Config.API_URL}/hosts`;

  /**
   * Fetch hosts
   * Get all hosts with their top 5 applications ordered by its apdex
   */
  public fetchHosts(): Promise<HostModel[]> {
    const hostURL = `${this.baseURL}`;

    return axios.get(hostURL)
      .then((response) => {

        if (response.data && response.data.error) {
          throw new Error(response.data.message);
        }

        return response.data.hosts;
      });
  };

}