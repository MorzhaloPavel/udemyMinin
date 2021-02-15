import React, {Component} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishdQuiz from '../../components/FinishdQuiz/FinishdQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader';


class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuidtion: 0,
    answerState: null,
    quiz: [],
    loading: true
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState) [0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuidtion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[answerId]) {
        results[answerId] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
           activeQuidtion: this.state.activeQuidtion + 1,
           answerState: null
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[answerId] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    } 
  }

  isQuizFinished() {
    return this.state.activeQuidtion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuidtion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
      const quiz = response.data

      this.setState({
        quiz,
        loading: false
      })
    } catch(e) {
      console.log()
    }
    
  }

  render() {
    return (
      <div className={'Quiz'}>
        <div className={'QuizWrapper'}>
          <h1>Ответьте на все вопросы</h1>

          {
            this.state.loading
            ? <Loader />
            : this.state.isFinished 
              ? <FinishdQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
                  onToggle={this.props.onToggle}
              />
              : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuidtion].answers}
                question={this.state.quiz[this.state.activeQuidtion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLengt={this.state.quiz.length}
                answerNamber={this.state.activeQuidtion + 1}
                state={this.state.answerState}
              />
          }

        </div>
      </div>
    )
  }
}


export default Quiz;
