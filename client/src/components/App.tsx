import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="header__title">
            <h1>Apps by Host</h1>
            <p className="header__details">
              for a user averylongemailaddress@companyname.com
            </p>
          </div>
          <div className="header__checkbox">
            <input type="checkbox"/> Show as list
          </div>
        </header>
        <section className="body">
          <div className="host">
            <span className="host__hostname">7e6272f7-098e.dakota.biz</span>
            <div className="host__applications">
              <ul className="list">
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Small Fresh Pants - Kautzer - Boyer, and Sons
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Rustic Soft Sausages - Pagac, O'Keefe and Schaefer, LLC
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Ergonomic Fresh Hat - Cormier, Lemke and Jaskolski, LLC
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Small Fresh Pants - Kautzer - Boyer, and Sons
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Rustic Soft Sausages - Pagac, O'Keefe and Schaefer, LLC
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Ergonomic Fresh Hat - Cormier, Lemke and Jaskolski, LLC
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="host">
            <span className="host__hostname">7e6272f7-098e.dakota.biz</span>
            <div className="host__applications">
              <ul className="list">
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Small Fresh Pants - Kautzer - Boyer, and Sons
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Rustic Soft Sausages - Pagac, O'Keefe and Schaefer, LLC
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Ergonomic Fresh Hat - Cormier, Lemke and Jaskolski, LLC
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Small Fresh Pants - Kautzer - Boyer, and Sons
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Rustic Soft Sausages - Pagac, O'Keefe and Schaefer, LLC
                  </a>
                </li>
                <li className="list__item">
                  <a className="list__link">
                    <span>99</span>
                    Ergonomic Fresh Hat - Cormier, Lemke and Jaskolski, LLC
                  </a>
                </li>
              </ul>
            </div>
          </div>


        </section>
      </div>
    );
  }
}

export default App;
