import React, { Component } from 'react';
import './Host.scss';
import ApplicationList from '../ApplicationList/ApplicationList';
import {HostModel} from '../../models/Host';
import {ApplicationService} from "../../services/ApplicationService";
export interface HostProps {
  showAsList: boolean;
  host: HostModel;
}

class Host extends Component<HostProps, {}>  {
  private applicationService: ApplicationService;

  constructor(props: HostProps) {
    super(props);
    this.applicationService = new ApplicationService();
  }

  public componentDidMount() {
    try {
      this.applicationService.getTopAppsByHost(this.props.host.hostname)
        .then((applications) => {
          console.log(applications);
        });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={`host ${ (this.props.showAsList) ? 'host--as-list' : '' }`}>
        <span className="host__hostname">{this.props.host.hostname}</span>
        <div className="host__applications">
          <ApplicationList
            applications={this.props.host.applications}
          ></ApplicationList>
        </div>
      </div>
    );
  }
}

export default Host;
