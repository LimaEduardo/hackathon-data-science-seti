import axios from 'axios'

export default function postInfoVideo(json){
  const url = "http://localhost:5000"
  axios.post(url, json).then((response) => {
    console.log("Tudo certo! ", response.data)
  }, (error) => {
    console.log("Ocorreu um erro: ", error.response)
  })
}