import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import * as d3 from "d3";
import $ from 'jquery';

class Graph2 extends React.Component{


    constructor(props){
        super(props)
        //this.d=this.props.data;
        //console.log(this.d);
        //this.printGraph();
        
    }

    

    printGraph(){
        var data = this.d;
        var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
    
        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);
        
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        
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
        
    }

    
    
    
    render() {

        let data= this.props.data;
        console.log(data);


        return (
         
          <div className="graph2">
            <div className="chart2"></div>
            <svg width="860" height="500"></svg>
            <div className="ui">
            {/* <RaisedButton label="graph2" name="data1.json" onClick={this.printGraph.bind(this)}/>
            <RaisedButton label="getRequest" name="data2.json" onClick={this.getRequest.bind(this)}/> */}
            </div>
          </div>
    
          
        );
      }
    }

    
export default Graph2;


//d3.tsv()