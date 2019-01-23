import React, { Component } from 'react';
import './ApplicationRow.scss';
import {ApplicationModel} from "../../models/Application";
import swal from 'sweetalert';


interface ApplicationProps {
  application: ApplicationModel
}

class ApplicationRow extends Component<ApplicationProps, {}> {
  constructor(props: ApplicationProps) {
    super(props);
  }

  handleClick() {
    swal('Application information:',
      `
      Release version: ${this.props.application.version}
      App Id: ${this.props.application._id}
      `
    );
  }

  render() {
    return (
        <li className="list__item">
          <a className="list__link" onClick={()=>this.handleClick()}>
            <span>{this.props.application.apdex}</span>
            {this.props.application.name}
          </a>
        </li>
    );
  }
}

export default ApplicationRow;
