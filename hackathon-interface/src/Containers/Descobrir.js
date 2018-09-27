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
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  discoveryContainer: {
    paddingTop: theme.spacing.unit * 6,
  },
  videoURLTF: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 5,
  },
  messageContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  }
});


function RenderLoadingMessage(props){
  const {classes} = props
  if (props.message !== ""){
    return (
      <Grid container className={classes.messageContainer} direction="row" justify="center" alignItems="center">
        <Grid item xs={10}>
          <Typography variant="subheading" gutterBottom align="center">
            {props.message}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <CircularProgress/>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

function RenderError(props){
  const {classes} = props
  if (props.message !== ""){
    return (
      <Typography variant="subheading" style={{color: 'red'}} gutterBottom className={classes.messageContainer} align="center">
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
      // videoURL:"https://www.youtube.com/watch?v=E-WHW-QNswE",
      videoURL:"",
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
    if (this.state.videoURL === ""){
      this.setState({errorMessage: "You need to enter a URL to proceed "})
      return
    }
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
            <Tabs value={currentTab} onChange={this.handleTabChange} fullWidth>
              <Tab label="Discovery" />
              <Tab label="Verify" />
            </Tabs>
          </Grid>
          {currentTab === 0 ? (
            <Grid container className={classes.discoveryContainer} direction="row" justify="center" alignItems="center">
              <Paper elevation={24} className={classes.paperRoot}>
                <Typography variant="title" gutterBottom>
                  Enter a video URL to discover your category
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    id="videoURL"
                    label="Video URL"
                    value={this.state.videoURL}
                    onChange={this.handleChange('videoURL')}
                    margin="normal"
                    className={classes.videoURLTF}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={() => {this.handleClick()}} fullWidth>
                    Discovery
                  </Button>
                  <RenderLoadingMessage message={currentStatusInfo} classes={classes}/>
                  <RenderError message={errorMessage} classes={classes}/>
                </Grid>
              </Paper>
            </Grid>
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
