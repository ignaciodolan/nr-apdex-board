import React, { Component } from 'react';
import './Host.scss';
import ApplicationList from '../ApplicationList/ApplicationList';

export interface HostProps {
  showAsList: boolean;
}

class Host extends Component<HostProps, {}>  {
  constructor(props: HostProps) {
    super(props);
  }
  render() {
    return (
      <div className={`host ${ (this.props.showAsList) ? 'host--as-list' : '' }`}>
        <span className="host__hostname">7e6272f7-098e.dakota.biz</span>
        <div className="host__applications">
          <ApplicationList></ApplicationList>
        </div>
      </div>
    );
  }
}

export default Host;
