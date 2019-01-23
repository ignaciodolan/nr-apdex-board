import React, { Component } from 'react';
import './ApplicationList.scss';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import {ApplicationModel} from "../../models/Application";

interface ApplicationProps {
  applications: ApplicationModel[]
}

class ApplicationList extends Component<ApplicationProps, {}> {
  constructor(props: ApplicationProps) {
    super(props);
  }
  render() {
    return (
      <ul className="list">
        {
          this.props.applications.map((application) =>
            <ApplicationRow
              key={application.name}
              application={application}
            ></ApplicationRow>
          )
        }
      </ul>
    );
  }
}

export default ApplicationList;
