import React, {Component} from 'react';
import './Header.scss';

export interface HeaderProps {
  showAsList: boolean;
  onChangeLayout?: (showAsList: boolean) => void;
}

class Header extends Component<HeaderProps, {}>  {
  constructor(props: HeaderProps) {
    super(props);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }

  handleLayoutChange(e: any) {
    if (this.props.onChangeLayout) {
      this.props.onChangeLayout(e.target.checked);
    }
  }

  render() {
    return (
      <header className="header">
        <div className="header__title">
          <h1>Apps by Host</h1>
          <p className="header__details">
            for a user averylongemailaddress@companyname.com
          </p>
        </div>
        <div className="header__checkbox">
          <input
            type="checkbox"
            checked={this.props.showAsList}
            onChange={this.handleLayoutChange}
          /> { (!this.props.showAsList) ? 'Show as list' : 'Show as an awesome grid'}
        </div>
      </header>
    );
  }
}

export default Header;
