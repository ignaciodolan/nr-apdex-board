import {HostModel} from "../models/Host";
import axios from 'axios';
import {Config} from "../config";
import {ApplicationModel} from "../models/Application";

export class HostService {
  public baseURL: string = `${Config.API_URL}/hosts`;

  /**
   * fetchHosts
   * @description Get all hosts with their top 5 applications ordered by its apdex
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

  /**
   * removeApplicationFromHost
   * @description Remove Application from host
   * @param hostname: string
   * @param applicationId: string
   */
  public removeApplicationFromHost(hostname: string, applicationId: string): Promise<HostModel[]> {
    const hostURL = `${this.baseURL}/${hostname}/applications/${applicationId}`;

    return axios.delete(hostURL)
      .then((response) => {

        if (response.data && response.data.error) {
          throw new Error(response.data.message);
        }

        return response.data.hosts;
      });
  };

  /**
   * addApplicationToHost
   * @description Add Application to host
   * @param hostname: string
   * @param applicationId: string
   */
  public addApplicationToHost(hostname: string, applicationId: string): Promise<HostModel[]> {
    const hostURL = `${this.baseURL}/${hostname}/applications/${applicationId}`;

    return axios.put(hostURL)
      .then((response) => {

        if (response.data && response.data.error) {
          throw new Error(response.data.message);
        }

        return response.data.hosts;
      });
  };

}