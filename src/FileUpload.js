import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
//import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import $ from 'jquery';



class FileUpload extends React.Component{

    upload(){

        var code="";
        //var file = $("#file").val();
        var file   = document.querySelector('input[type=file]').files[0];
        console.log(file)
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            code = reader.result;
            console.log(code);
            console.log(code.data);
          }, false);

        reader.addEventListener("loadend", function () {
            console.log("loadend"); 
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/hello/upload",
                //enctype: 'multipart/form-data',
                data: {
                    name: file.name,
                    code: code
                },
                
                success: function (response) {
                    console.log(response)
                }
            });
        }, false);

        if (file) {
        reader.readAsDataURL(file);
        console.log("readAsDataURL")
        }

          
        
        
        
    }

    render(){
        const style = {
            margin: 12,
          };


        return(
            <div>
                <TextField
                hintText="Name"
                floatingLabelText="Input project name ..."
                floatingLabelFixed={true}
                style={style}
                />
                <RaisedButton label="Upload" primary={true} style={style} onClick={this.upload}/>
                <br />
                <input type="file" id="file" name="file" size="10"/>
            </div>
        );
    }
}    

export default FileUpload;