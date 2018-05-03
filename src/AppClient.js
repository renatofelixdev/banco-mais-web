import React, { Component } from 'react';
import Header from './components/template/Header';
import Menu from './components/template/MenuClient';
import 'material-design-lite/material';
import './css/general.css';

import PropTypes from 'prop-types';

class App extends Component {
  componentDidMount() {
    window.componentHandler.upgradeDom();
  }

  render() {
    return (
      <div className="app-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">

          <Header/>

          <Menu store={this.context.store}/>

          <main className="mdl-layout__content mdl-color--grey-100">
              <div className="mdl-grid app-content">
                {this.props.children}
              </div>
          </main>
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object.isRequired
}


export default App;

