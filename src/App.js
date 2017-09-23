import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import GraphBox from './GraphBox';
import FileUpload from './FileUpload';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class App extends Component {


  render() {
    return (
      <div>
      <MuiThemeProvider>
        <Router history={browserHistory}>
          <Route path="/" component={GraphBox}/>
          <Route path="/graph" component={GraphBox}/>
          <Route path="/file" component={FileUpload}/>
        </Router>

      </MuiThemeProvider>
      </div> 
      
    );
  }
}

export default App;
