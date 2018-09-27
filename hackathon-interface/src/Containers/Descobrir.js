import React, { Component } from 'react'

import getComments from '../Actions/getCommentsYoutube'
import postInfoVideo from '../Actions/postInfoVideo'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Descobrir extends Component {
  constructor(props){
    super(props)

    this.state = {
      videoURL:"https://www.youtube.com/watch?v=E-WHW-QNswE"
    }

    this.handleClick = this.handleClick.bind(this)
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick(){
    getComments(this.state.videoURL).then((listComments) => {
      console.log(listComments)
      postInfoVideo(listComments).then((response) => {
        console.log(response)
      }, (error) => {
        console.log("Ocorreu um erro no postInfoVideo: "+ error.response)
      })
    })
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
