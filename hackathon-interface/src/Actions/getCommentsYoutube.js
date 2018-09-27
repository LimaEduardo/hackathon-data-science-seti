import axios from 'axios'
import queryString from 'query-string'

export default function getComments(videoURL) {
  return new Promise ((resolve, reject) => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const VIDEO_ID = queryString.parseUrl(videoURL).query.v
    const MAX_RESULTS = 100
    if (API_KEY === "" || VIDEO_ID === ""){
      //TODO: ERROR
      console.log("error", API_KEY, VIDEO_ID)
    } else {
      const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&textFormat=plainText&part=snippet&videoId=${VIDEO_ID}&maxResults=${MAX_RESULTS}}`
      axios.get(url).then((response) => {
        // let data = []
        // response.data.forEach(element => {
        //   let object = element;
        //   object['show'] = true;
        //   data.push(object)
        // });
        // resolve(data);
      }).catch((error) => {
        reject(resolve.data)
      })
    }
  })
}