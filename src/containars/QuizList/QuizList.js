import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import './QuizList.css'
import Loader from '../../components/UI/Loader/Loader'
import axios from '../../axios/axios-quiz'

export default class QuizList extends Component {
  state = {
    quezes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quezes.map(quiz => {
      return (
        <li 
        key={quiz.id}
        >
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('quizes.json')
      const quezes = []
      Object.keys(response.data).forEach((key, index) => {
        quezes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })
      this.setState({
        quezes,
        loading: false
      })
    } catch(e) {
      console.log(e)
    }
    
  }

  render() {
    return (
      <div className={'QuizList'}>
        <div>
          <h1>Список тестов</h1>

          {
            this.state.loading 
            ? <Loader />
            : <ul>
               {this.renderQuizes()}
              </ul>
          }

          
        </div>
      </div>
    )
  }
}