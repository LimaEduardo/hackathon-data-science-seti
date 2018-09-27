import axios from 'axios'

export default function postInfoVideo(json){
  return new Promise((resolve, reject) => {
    const url = "http://localhost:5000/verificaCategoria"
    axios.post(url, json).then((response) => {
      console.log("Tudo certo! ", response.data)
      resolve(response)
    }, (error) => {
      reject(error)
    })
  })
}