import {Host} from "../models/Host";

class ApplicationService {
  public baseURL: string = '/hosts';

  public fetchHosts(): Promise<Host[]> {
    const hostURL = `${this.baseURL}`;

    return fetch(hostURL)
      .then((response) => (response.json()))
  };
}