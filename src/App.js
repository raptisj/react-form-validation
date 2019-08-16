import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import Form from './components/Form'
import Message from './components/Message'
import Dashboard from './components/Dashboard'

import './sass/main.scss';

class App extends Component {
     constructor(props) {
        super(props);
        this.state = {
          isShow: false,
        };
    }

    showErrorMsg = () => {
      this.setState({ isShow: true });
    };

    hideErrorMsg = () => {
      this.setState({ isShow: false });
    };

    render() {
        return (
          <div>
           <Router>
            <Switch>
              <Route exact path="/dash" component={Dashboard} />
              <Route exact path="/">
                <Form errorMsg={this.showErrorMsg} hideErrorMsg={this.hideErrorMsg} />
              </Route>
            </Switch>
          </Router>
            
            <Message isShow={this.state.isShow} />
          </div>
        );
    }
}

export default App;