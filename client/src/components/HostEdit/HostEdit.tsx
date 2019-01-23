import React, { Component } from 'react';
import './HostEdit.scss';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import {ApplicationModel} from "../../models/Application";
import {HostModel} from "../../models/Host";
import {ApplicationService} from "../../services/ApplicationService";
import {HostService} from "../../services/HostService";
import swal from 'sweetalert';

interface HostEditProps {
  host: HostModel;
  onUpdatedHost: () => void;
}
interface HostEditState {
  applications: ApplicationModel[];
  loading: boolean;
  applicationId: string;
}

class HostEdit extends Component<HostEditProps, HostEditState> {
  private applicationService: ApplicationService;
  private hostService: HostService;

  constructor(props: HostEditProps) {
    super(props);
    this.state = {
      applications: [],
      loading: false,
      applicationId: '',
    };
    this.applicationService = new ApplicationService();
    this.hostService = new HostService();
    this.removeApplicationFromHost = this.removeApplicationFromHost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private async updateHostsAndApplications() {
    const applications = await this.applicationService.getTopAppsByHost(this.props.host.hostname);
    this.setState({applications});
    this.props.onUpdatedHost();
  }

  public async removeApplicationFromHost(applicationId:string)  {
    try {
      await this.hostService.removeApplicationFromHost(this.props.host.hostname, applicationId);
      await this.updateHostsAndApplications();
    } catch (e) {
      console.log(e);
    }
  }

  public handleChange(event: any) {
    this.setState({applicationId: event.target.value});

  }
  public async handleSubmit(event: any) {
    event.preventDefault();
    if (this.state.applicationId !== '') {
      try {
        await this.hostService.addApplicationToHost(this.props.host.hostname, this.state.applicationId);
        this.setState({applicationId: ''});
        await this.updateHostsAndApplications();
      } catch (e) {
        swal('Error', `${e}`)
      }

    }
  }
  public async componentDidMount() {
    try {
      const applications = await this.applicationService.getTopAppsByHost(this.props.host.hostname)
      this.setState({
        loading: true,
        applications
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={`edit-host ${(!this.state.loading)? 'edit-host--loading': ''}`}>
        <form
          className="edit-host__form"
          onSubmit={this.handleSubmit}>
          <h3>Add application to host:</h3>
          <input
            className="edit-host__form__input"
            type="text" value={this.state.applicationId}
            placeholder="Application ID"
            onChange={this.handleChange} />
          <input className="edit-host__form__submit" type="submit" value="Submit" />
        </form>
        <h3>Top 25 applicationss from host:</h3>
        <ol className="edit-host__list">
          {
            this.state.applications.map((application) =>
              <li key={application._id}>
                {application.apdex} - {application.name}
                <button
                  className="list__remove-button"
                  onClick={(() => this.removeApplicationFromHost(application._id))}
                >Remove</button>
              </li>
            )
          }
        </ol>
      </div>
    );
  }

}

export default HostEdit;
