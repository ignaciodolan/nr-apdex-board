import React, { Component } from 'react';
import './ApplicationRow.scss';

class ApplicationList extends Component {
  render() {
    return (
        <li className="list__item">
          <a className="list__link">
            <span>99</span>
            Rustic Soft Sausages - Pagac, O'Keefe and Schaefer, LLC
          </a>
        </li>
    );
  }
}

export default ApplicationList;
