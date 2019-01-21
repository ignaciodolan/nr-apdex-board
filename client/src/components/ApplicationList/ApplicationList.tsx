import React, { Component } from 'react';
import './ApplicationList.scss';
import ApplicationRow from '../ApplicationRow/ApplicationRow';

class ApplicationList extends Component {
  render() {
    return (
      <ul className="list">
        <ApplicationRow></ApplicationRow>
      </ul>
    );
  }
}

export default ApplicationList;
