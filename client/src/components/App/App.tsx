import React, { Component } from 'react';
import './App.scss';
import Host from '../Host/Host';
import Header from '../Header/Header';
import {HostService} from '../../services/HostService';
import { HostModel } from '../../models/Host';

interface State {
  showAsList: boolean;
  hosts: Array<HostModel>;
}

interface Props {

}
class App extends Component<Props, State> {
  hostService: HostService;
  constructor(props: Props) {
    super(props);
    this.state = {
      showAsList: false,
      hosts: []
    };
    this.hostService = new HostService();
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.handleHostUpdated = this.handleHostUpdated.bind(this);
  }

  public componentDidMount() {
    try {
      this.hostService.fetchHosts()
        .then((hosts) => {
          this.setState({ hosts });
        });
    } catch (e) {
      console.log(e);
    }
  }

  public handleHostUpdated() {
    try {
      this.hostService.fetchHosts()
        .then((hosts) => {
          this.setState({ hosts });
        });
    } catch (e) {
      console.log(e);
    }
  }
  public handleLayoutChange(showAsList: boolean) {
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
          {
            this.state.hosts.map((host) =>
              <Host
                showAsList={this.state.showAsList}
                host={host}
                key={host.hostname}
                onUpdatedHost={this.handleHostUpdated}
              ></Host>
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
