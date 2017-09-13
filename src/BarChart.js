import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import * as d3 from "d3";

var data = [30, 86, 168, 281, 303, 365];

class BarChart extends Component {


  componentDidMount() {
    console.log("DidMount")
    d3.select(".chart") 
    .selectAll("div")
    .data(data)
      .enter()
      .append("div")
      .style("width", function(d) { return d + "px"; })
      .text(function(d) { return '$' +  d; });

      var circle = d3.selectAll("circle");
      circle.style("fill", "steelblue");
      circle.attr("r", 30);

      //circle.attr("cx", function() { return Math.random() * 720; });
      circle.data([49, 81, 144]);
      circle.attr("r", function(d) { return Math.sqrt(d); });
      circle.attr("cx", function(d, i) { return i * 100 + 30; });

      var svg = d3.select("svg");
      
      circle = svg.selectAll("circle")
          .data([32, 57, 112, 293]);
      
      var circleEnter = circle.enter().append("circle");

      circleEnter.attr("cy", 60);
      circleEnter.attr("cx", function(d,i) { return i * 100 + 30; });
      circleEnter.attr("r", function(d) { return Math.sqrt(d); });


      
    
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="all">
        <div className="chart"></div>
        <div className="ui">
        <RaisedButton label="click" />
        </div>
      </div>

    </MuiThemeProvider>
      
    );
  }
}

export default BarChart;