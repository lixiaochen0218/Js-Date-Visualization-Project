import React from 'react';
//import Graph2 from './Graph2';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import * as d3 from "d3";

var Stomp = require('stompjs');
var stompClient = require('stompjs');
//var sockjs = require('sockjs');
var SockJS = require('sockjs-client/dist/sockjs.js');

class GraphBox extends React.Component{
    
    
        constructor(props){
            super(props)
           
            this.data=[];
            //this.getJson();
            //this.getRequest();
            //setInterval(() => this.getRequest(), 5000);
            
        }
    
        componentDidMount() {
            console.log("G2 DidMount")
            // this.connection = new WebSocket('ws://localhost:8080/app/topic/greetings/')

            // this.connection.onmessage = evt => { 
                
            //     console.log(evt)
            //     console.log(evt.data)
            //   };
        }
    
        
    
        getJson(){
            var socket = new SockJS('http://localhost:8080/gs-guide-websocket');
            stompClient = Stomp.over(socket);
            var gg=this
            stompClient.connect({}, function (frame) {
            
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/greetings', function (message) {
                    
                    var messageBody= $.parseJSON(message.body);
                    console.log(messageBody)

                    console.log(messageBody.date)
                    console.log(messageBody.data)
                    
                    
                    var data=JSON.parse(messageBody.data);
                    gg.printGraph(data);

                    
                });
            });
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

        //test graph with some data
        changeData(){
            var airlines=[
                {"IATACode":"AF",
                 "PassengerCount":"0.9853"
                },
                {"IATACode":"AI",
                 "PassengerCount":"0.5872"
                }
            ];
           var sss= JSON.stringify(airlines);
           console.log(sss)
            console.log(airlines)
            this.printGraph(airlines);
        }

        printGraph(data){
            var sss = $('g');
            console.log(sss);
            $('g').remove();
            
            //var data = this.data;
            var svg = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;
        
            var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
                y = d3.scaleLinear().rangeRound([height, 0]);
            
            var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            
            //console.log(data);
            x.domain(data.map(function(d) { return d.IATACode; }));
            y.domain([0, d3.max(data, function(d) { return d.PassengerCount; })]);
            
            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
            
            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, ""))
                .append("text")
                .attr("transform", "rotate(-90)")
                //.attr("y", 6)
                //.attr("dy", "1.71em")
                //.attr("text-anchor", "end")
                .text("Frequency");
            
            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.IATACode); })
                .attr("y", function(d) { return y(d.PassengerCount); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.PassengerCount); });
            
        }
        
        
        render() {
            return (
                <div className="graphBox">
                <svg width="960" height="500"></svg>
                <RaisedButton label="getjson"  onClick={this.getJson.bind(this)}/>
                <RaisedButton label="changeData"  onClick={this.changeData.bind(this)}/>
              {/* <Graph2 data={this.state.data}/>       */}
                
              </div>
            );
          }
        }
    
        
    export default GraphBox;