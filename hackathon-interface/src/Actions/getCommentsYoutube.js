import axios from 'axios'
import queryString from 'query-string'

function getInfoVideo(API_KEY,VIDEO_ID){
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${VIDEO_ID}&key=${API_KEY}&part=snippet`
  return new Promise((resolve, reject) => {
    axios.get(url).then((response) => {
      const title = response.data.items[0].snippet.title
      resolve(title)
    }, (error) => {
      console.log("Ocorreu um erro no getInfoVideo: "+error.response)
      reject(error)
    })
  })
}

function getCommentsVideo(API_KEY,VIDEO_ID){
  const MAX_RESULTS = 100
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${VIDEO_ID}&maxResults=${MAX_RESULTS}`
  return new Promise((resolve, reject) => {
    axios.get(url).then((response) => {
      const comments = response.data.items
      const listComments = []
      comments.forEach(comment => {
        const pureComment = comment.snippet.topLevelComment.snippet.textDisplay
        listComments.push(pureComment)
      });
      resolve(listComments)
    }, (error) => {
      console.log("Ocorreu um erro no getCommentsVideo: "+error.response)
      reject(error)
    })
  })
}

export default function getComments(videoURL) {
  return new Promise ((resolve, reject) => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const VIDEO_ID = queryString.parseUrl(videoURL).query.v
    
    if (API_KEY === "" || VIDEO_ID === ""){
      //TODO: ERROR
      console.log("error", API_KEY, VIDEO_ID)
    } else {
      getInfoVideo(API_KEY,VIDEO_ID).then((title) => {
        getCommentsVideo(API_KEY,VIDEO_ID).then((comments) => {
          const response = {
            'title': title,
            'comments': comments
          }
          resolve(response)
        }, (error) => {
          reject(error)
        })
      }, (error) => {
        reject(error)
      })
    }
  })
}