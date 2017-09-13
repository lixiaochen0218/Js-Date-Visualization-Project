import React, { Component } from 'react';
//import Graph from './Graph';
import Graph2 from './Graph2';
import GraphBox from './GraphBox';
import FileUpload from './FileUpload';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class App extends Component {


  render() {
    return (
      <MuiThemeProvider>
      <div>
        <FileUpload/>
        {/* <Graph/> */}
        {/* <Graph2 /> */}
        <GraphBox url="/data1.json"/>
      </div>
      </MuiThemeProvider>
      
      
    );
  }
}

export default App;
