import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-dced7-default-rtdb.firebaseio.com/'
})