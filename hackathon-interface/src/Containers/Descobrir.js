import React, { Component } from 'react'
import PropTypes from 'prop-types';

import getComments from '../Actions/getCommentsYoutube'
import postInfoVideo from '../Actions/postInfoVideo'

// import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});


function RenderLoadingMessage(props){
  if (props.message !== ""){
    return (
      <div>
        <Typography variant="subheading" gutterBottom>
          {props.message}
        </Typography>
        <CircularProgress/>
      </div>
    )
  } else {
    return null
  }
}

function RenderError(props){
  if (props.message !== ""){
    return (
      <Typography variant="subheading" style={{color: 'red'}} gutterBottom>
        {props.message}
      </Typography>
    )
  } else {
    return null
  }
}

export class Descobrir extends Component {
  constructor(props){
    super(props)

    this.state = {
      videoURL:"https://www.youtube.com/watch?v=E-WHW-QNswE",
      currentTab: 0,
      gettingYoutubeInfo: false,
      sendingInfoToDatabase: false,
      currentStatusInfo: "",
      error: false,
      errorMessage: ""
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick(){
    this.setState({
      gettingYoutubeInfo: true,
      sendingInfoToDatabase: false,
      currentStatusInfo: "Getting information from YouTube API...",
      errorMessage: ""
    })
    getComments(this.state.videoURL).then((listComments) => {
      this.setState({
        gettingYoutubeInfo: false,
        sendingInfoToDatabase: true,
        currentStatusInfo: "Sending information to be processed..."
      })
      postInfoVideo(listComments).then((response) => {
        this.setState({
          gettingYoutubeInfo: false,
          sendingInfoToDatabase: false,
          currentStatusInfo: ""
        })
      }, (error) => {
        console.log("Ocorreu um erro no postInfoVideo: "+ error.response)
        this.setState({
          gettingYoutubeInfo: false,
          sendingInfoToDatabase: false,
          currentStatusInfo: "",
          error: true,
          errorMessage: "An error occurred on our server when processing the information"
        })
      })
    }, (error) => {
      this.setState({
        gettingYoutubeInfo: false,
        sendingInfoToDatabase: false,
        currentStatusInfo: "",
        error: true,
        errorMessage: "An error occurred while trying to connect to the YouTube API. Try again later"
      })
    })
  }

  handleTabChange = (event, value) => {
    this.setState({currentTab: value})
  }

  render() {
    const {currentTab, currentStatusInfo, errorMessage} = this.state
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <Grid container spacing={24} direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Tabs value={currentTab} onChange={this.handleTabChange}>
              <Tab label="Descobrir" />
              <Tab label="Verificar" />
            </Tabs>
          </Grid>
          {currentTab === 0 ? (
            <div>
              <Grid item xs={12}>
                <TextField
                  id="videoURL"
                  label="URL do vídeo"
                  value={this.state.videoURL}
                  onChange={this.handleChange('videoURL')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => {this.handleClick()}}>
                  Descubra
                </Button>
                <RenderLoadingMessage message={currentStatusInfo}/>
                <RenderError message={errorMessage}/>
              </Grid>
            </div>
          ) : null}
          {currentTab === 1 ? (
            <div>
              Verificaaaar
            </div>
          ) : null}
        </Grid>
      </div>
    )
  }
}

Descobrir.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Descobrir);
