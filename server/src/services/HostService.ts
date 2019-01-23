import Host from '../models/Host';
import Application from '../models/Application';

export class HostService {

  /**
   * Fetch hosts
   * @description Get all hosts with their top 5 (by default) applications ordered by its apdex
   * @param limitApplications: number
   */
  public static async getHosts(limitApplications?:number = 5): Promise<Host[]> {
    return await Host.find()
      .populate({
        path: 'applications',
        options: {
          limit: limitApplications,
          sort: { apdex: -1},
        }
      });
  }

  /**
   * Fetch hosts
   * @description Get all hosts with their top 25 applications ordered by its apdex
   * @param hostname: string
   * @param limitApplications: number
   */
  public static async getApplicationsFromHost(hostname: string, limitApplications?:number = 25): Promise<Application[]> {
    const host = await Host.findOne({hostname: hostname})
      .populate({
        path: 'applications',
        options: {
          limit: limitApplications,
          sort: { apdex: -1},
        }
      });

    return host.applications;
  }

  /**
   * findHostByHostname
   * @description Find host by its hostname
   * @param hostname: string
   */
  private static async findHostByHostname(hostname:string): Host {
    const host = await Host.findOne({hostname: hostname});
    if(!host) {
      throw new Error('Host not found');
    }
    return host;
  }

  /**
   * findApplicationById
   * @description Find application by its id
   * @param applicationId: string
   */
  private static async findApplicationById(applicationId: string): Application {
    const application = await Application.findOne({_id: applicationId});
    if(!application) {
      throw new Error('Application not found');
    }
    return application;
  }

  /**
   * hostHasApplication
   * @description check if application already exists in host
   * @param host: Host
   * @param applicationId: string
   */
  private static hostHasApplication(host: Host, applicationId: string): boolean {
    const applications = host.applications.map(obj => obj.toString());
    return applications.includes(applicationId);
  }

  /**
   * saveApplicationToHost
   * @description store new application to host applications list
   * @param hostname: string
   * @param applicationId: string
   */
  public static async saveApplicationToHost(hostname: string, applicationId: string): void {
    const host = await this.findHostByHostname(hostname);
    const application = await this.findApplicationById(applicationId);

    if (this.hostHasApplication(host, applicationId)) {
      throw new Error(`Application: ${application.name} already exists in ${host.hostname}`)
    }

    host.applications.push(application._id);
    await host.save();
    return host;
  }

  /**
   * deleteApplicationFromHost
   * @description delete application from host applications list
   * @param hostname: string
   * @param applicationId: string
   */
  public static async deleteApplicationFromHost(hostname: string, applicationId: string): void {
    const host = await this.findHostByHostname(hostname);
    const application = await this.findApplicationById(applicationId);

    if (!this.hostHasApplication(host, applicationId)) {
      throw new Error(`Application: ${application.name} doesn't exists in ${host.hostname}`)
    }

    host.applications.remove(applicationId);
    await host.save();
    return host;
  }

}