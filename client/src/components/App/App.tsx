import React, { Component } from 'react';
import './App.scss';
import Host from '../Host/Host';
import Header from '../Header/Header';

export interface State {
  showAsList: boolean;
}

class App extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showAsList: false
    };
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }

  handleLayoutChange(showAsList: boolean) {
    this.setState({
      showAsList: showAsList
    })
  }

  render() {
    return (
      <div className="App">
        <Header
          showAsList={this.state.showAsList}
          onChangeLayout={this.handleLayoutChange}
        ></Header>
        <section className="body">
          <Host
            showAsList={this.state.showAsList}
          ></Host>
        </section>
      </div>
    );
  }
}

export default App;
