import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */

const style = {
  margin: 12,
};

export default class DateDialog extends React.Component {
  state = {
    open: false,
    textFieldValue: ''
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    console.log("handleClose")
    //send date to GraphBox through props
    this.props.onDialogSubmit(this.state.textFieldValue);
  };

  handleRestart = () =>{
    this.setState({open: false});
    //send start to GraphBox through props
    this.props.onDialogSubmit("start");
  }



  _handleTextFieldChange = (e) => {
    this.setState({
        textFieldValue: e.target.value
    });
}



  render() {
    const actions = [
   <FlatButton
        label="restart"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleRestart}
      />,   <FlatButton
        label="submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div display="inline-block">
        <RaisedButton primary={true} style={style} label="change month" disabled={this.props.ifdisable}onClick={this.handleOpen} />
        <Dialog
          title="Dialog With Month"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
                    hintText={"Change the date... "+this.props.data}
                    onChange={this._handleTextFieldChange}
                />
        </Dialog>
      </div>
    );
  }
}