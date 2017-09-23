import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import $ from 'jquery';
import * as d3 from "d3";

import AppBarExample from './AppBarExample'
import DateDialog from './DateDialog';




var Stomp = require('stompjs');
var stompClient = require('stompjs');
var SockJS = require('sockjs-client/dist/sockjs.js');

const style = {
    margin: 12,
};


class GraphBox extends React.Component{
    
    
        constructor(props){
            super(props)
           
            this.data=[];
            this.stompC = null;
            this.state={
                snackbar:false,
                snackbarMessage:"",
                connect:false,
                disconnect:true,
                example:false,
                date:""
            }

            //setInterval(() => this.getRequest(), 5000);
            
        }

      

        
    
        componentDidMount() {
            console.log("G2 DidMount")
            
        }

        componentWillUnmonut(){
            this.disconnect();
            //alert("unmount")
        }
    
        
    
        connect(){
            this.handleOpenSnackbar("connecting with WebSocket");
            //store this
            var ghostThis=this
            
            var socket = new SockJS('http://localhost:8080/gs-guide-websocket');
            stompClient = Stomp.over(socket);
            this.stompC=stompClient;
            stompClient.connect({}, function (frame) {
            
                //console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/greetings', function (message) {
                    
                    var messageBody= $.parseJSON(message.body);
                    // console.log(messageBody)
                    // console.log(messageBody.date)
                    // console.log(messageBody.data)
                
                    var data=JSON.parse(messageBody.data);
                    
                    //check if user pause the update
                    if(ghostThis.state.date===messageBody.date){
                        return;
                    }

                    ghostThis.printGraph(data);
                    ghostThis.setState({date:messageBody.date});

                    
                });
            });

            //make connect and example button disabled
            this.setState({connect:true,disconnect:false,example:true});
        }

        disconnect(){
            if (this.stompC !== null) {
                this.stompC.disconnect();
                //make connect and example button abled
                this.setState({connect:false,disconnect:true,example:false});
                console.log("Disconnected");
                this.handleOpenSnackbar("Disconnected with WebSocket");
                return;
            }
            console.log("Disconnect error");
            
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
        exampleData(){
            var airlines=[
                {"IATACode":"AF","PassengerCount":9835},
                {"IATACode":"AI","PassengerCount":5872},
                {"IATACode":"CA","PassengerCount":8021},
                {"IATACode":"AF","PassengerCount":9972},
                {"IATACode":"AI","PassengerCount":13045},
                {"IATACode":"NZ","PassengerCount":9438},
                {"IATACode":"AS","PassengerCount":5638},
                {"IATACode":"NH","PassengerCount":16706},
                {"IATACode":"AA","PassengerCount":6455},
                {"IATACode":"OZ","PassengerCount":7514},
                {"IATACode":"BA","PassengerCount":9434},
            ];
           //var sss= JSON.stringify(airlines);
           this.disconnect();
            console.log(airlines)
            this.printGraph(airlines);
            this.handleOpenSnackbar("Example Airline data");
        }

        changeDate(){
           
            console.log("change date")
            this.stompC.send("/app/hello", {}, "201701");
        }

        printGraph(data){

            //delete old graph
            var sss = $('g');
            if(sss){
                $('g').remove();
            }
            
            
            //var data = this.data;
            var svg = d3.select("#svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;
           
            width = width +200;
            

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
                .call(d3.axisLeft(y).ticks(10))
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

        handleDialogSubmit = (date) => {
            if(this.stompC==null){
                this.handleOpenSnackbar("no connection");
                return;
            }
            if(date==="start"){
                this.stompC.send("/app/hello", {}, "start");
                this.handleOpenSnackbar("restart update data");
            }else if(date.length===6){
                this.stompC.send("/app/hello", {}, date);
                console.log("dialog: "+date);
                this.handleOpenSnackbar("changing to "+date);
            }else{
                this.stompC.send("/app/hello", {}, "start");
                this.handleOpenSnackbar("restart update data");
            }
        }

        handleOpenSnackbar = (m) =>{
            this.setState({snackbar:true});
            this.setState({snackbarMessage:m});
        }

        handleRequestCloseSnackbar = () =>{
            this.setState({snackbar:false});
        }
        
        
        render() {
            return (
                <div className="graphBox">
                <AppBarExample />
                <div display="inline-block">
                <RaisedButton label="connect" disabled={this.state.connect} style={style} primary={true} onClick={this.connect.bind(this)}/>
                <RaisedButton label="disconnect" disabled={this.state.disconnect} style={style} secondary={true} onClick={this.disconnect.bind(this)}/>    
                <RaisedButton label="example" disabled={this.state.example} style={style} primary={true} onClick={this.exampleData.bind(this)}/>
                <RaisedButton label="file upload" style={style} href={"http://localhost:3000/file"} primary={false}/>
                </div>

                {/* <TextField
                    hintText={"Change the date in here... "+this.state.date}
                    style={styleTextField}
                />
                <RaisedButton label="change date" disabled={this.state.disconnect} style={style} primary={true} onClick={this.changeDate.bind(this)}/> */}
                <h2 style={style}>{this.state.date}</h2>
                <svg id="svg" width="1160" height="500"></svg>

                <div display="inline-block">
                <DateDialog data={this.state.date} ifdisable={this.state.disconnect} onDialogSubmit={this.handleDialogSubmit}/>
                </div>
                
                <Snackbar
                open={this.state.snackbar}
                message={this.state.snackbarMessage}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestCloseSnackbar}
                />
                
              </div>
            );
          }
        }
    
        
    export default GraphBox;