import React, { Component } from 'react';
import './Host.scss';
import ApplicationList from '../ApplicationList/ApplicationList';
import HostEdit from '../HostEdit/HostEdit';
import {HostModel} from '../../models/Host';
import {ApplicationService} from "../../services/ApplicationService";
import swal from 'sweetalert';
import {SwalOptions} from "sweetalert/typings/modules/options/index";

export interface HostProps {
  showAsList: boolean;
  host: HostModel;
  onUpdatedHost:  () => void;
}
export interface HostState {
  showEditButton: boolean;
  editHost: boolean;
}

class Host extends Component<HostProps, HostState>  {
  private applicationService: ApplicationService;

  constructor(props: HostProps) {
    super(props);
    this.state = {
      showEditButton: false,
      editHost: false
    };
    this.applicationService = new ApplicationService();
    this.toggleEditButton = this.toggleEditButton.bind(this);
    this.showEditOptions = this.showEditOptions.bind(this);
  }

  public toggleEditButton() {
    this.setState({
      showEditButton: !this.state.showEditButton
    });
  }
  public showEditOptions() {
    this.setState({
      editHost: !this.state.editHost
    });
  }

  render() {
    return (
      <div className={`host ${ (this.props.showAsList) ? 'host--as-list' : '' }`}
           onMouseEnter={this.toggleEditButton}
           onMouseLeave={this.toggleEditButton}
      >
        <span className="host__hostname">{this.props.host.hostname}</span>
        <button
          className={`host__edit-btn ${(!this.state.showEditButton) ? 'host__edit-btn--hide':''}`}
          onClick={this.showEditOptions}
        >Edit</button>
        <div className="host__applications">
          {
            ((this.state.editHost) ?
                <HostEdit
                  host={this.props.host}
                  onUpdatedHost={this.props.onUpdatedHost}
                ></HostEdit>
              :
                <ApplicationList
                  applications={this.props.host.applications}
                ></ApplicationList>
            )
          }

        </div>
      </div>
    );
  }
}

export default Host;
