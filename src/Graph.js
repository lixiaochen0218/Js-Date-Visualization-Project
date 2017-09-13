import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as d3 from "d3";

var data = [30, 86, 168, 281, 303, 365];


class Graph extends React.Component{

    constructor(props){
        super(props);
        // this.state=data;
        this.printGraph(data);
    }
    componentDidMount() {
        console.log("G1 DidMount")        
    }

    printGraph2(e){
        var data = this.state.data;
        console.log(e)
        var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
    
        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);
        
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        d3.json(jsonFile, function(error, data) {
        if (error) throw error;
        console.log(data);
        x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
        
        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, ""))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "1.71em")
            .attr("text-anchor", "end")
            .text("Frequency");
        
        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.letter); })
            .attr("y", function(d) { return y(d.frequency); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.frequency); });
        });
    }


    changedata(){
        console.log("changedata")
    }

    printGraph(){
    d3.select(".chart") 
    .selectAll("div")
    .data(data)
        .enter()
        .append("div")
        .style("width", function(d) { return d + "px"; })
        .text(function(d) { return '$' +  d; });
    }
    
      render() {
        return (
          
          <div className="graph1">
            <div className="chart"></div>
            <div className="ui">
            <RaisedButton label="graph1" onClick={this.printGraph} />
            </div>
          </div>
    
        
          
        );
      }
    }


export default Graph;