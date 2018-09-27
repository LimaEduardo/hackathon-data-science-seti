import React, { Component } from 'react'

import getComments from '../Actions/getCommentsYoutube'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Descobrir extends Component {
  constructor(props){
    super(props)

    this.state = {
      videoURL:""
    }

    this.handleClick = this.handleClick.bind(this)
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick(){
    getComments(this.state.videoURL)
  }

  render() {
    return (
      <Grid container>
        <TextField
          id="videoURL"
          label="URL do vídeo"
          value={this.state.videoURL}
          onChange={this.handleChange('videoURL')}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={() => {this.handleClick()}}>
          Descubra
        </Button>
      </Grid>
    )
  }
}

export default Descobrir
