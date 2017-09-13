import React from 'react';
import Graph2 from './Graph2';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import * as d3 from "d3";

class GraphBox extends React.Component{
    
    
        constructor(props){
            super(props)
           
            this.data=[];
            this.getRequest();
            //setInterval(() => this.getRequest(), 5000);
            
        }
    
        componentDidMount() {
            console.log("G2 DidMount")
        }
    
        
    
        
    
        getRequest(){
            $.ajax({
                url:this.props.url,
                dataType:'JSON',
                cache:false,
                success:airline =>{
                    this.data=airline
                    console.log(this.data);
                    this.printGraph();
                },
                error:(xhr,status,error) =>{
                    console.log(error)
                    
                }
            });
        }

        changeData(){
            var airlines=[
                {"letter":"AF",
                 "frequency":"0.9853"
                },
                {"letter":"AI",
                 "frequency":"0.5872"
                }
            ];
            this.data=airlines;
            console.log(this.data)
            this.printGraph();
        }

        printGraph(){
            var sss = $('g');
            console.log(sss);
            $('g').remove();
            
            var data = this.data;
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
            return (
                <div className="graphBox">
                <svg width="960" height="500"></svg>
                <RaisedButton label="changeData"  onClick={this.changeData.bind(this)}/>
              {/* <Graph2 data={this.state.data}/>       */}
                
              </div>
            );
          }
        }
    
        
    export default GraphBox;