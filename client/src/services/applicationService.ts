import {Application} from "../models/Application";

class ApplicationService {
  public baseURL: string = '/applications';

  public fetchApplicationsByHost(hostname: string): Promise<Application[]> {
    const applicationsURL = `${this.baseURL}/?hostname=${hostname}`;

    return fetch(applicationsURL)
      .then((response) => (response.json()))
  };
}