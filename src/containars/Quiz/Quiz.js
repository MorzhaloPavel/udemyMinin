import React, {Component} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishdQuiz from '../../components/FinishdQuiz/FinishdQuiz'

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuidtion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Какого цвета неба?',
        rigthAnswerId: 2,
        id: 1,
        answers: [
          {text: 'Черный', id: 1},
          {text: 'Синий', id: 2},
          {text: 'Красный', id: 3},
          {text: 'Зелёный', id: 4}
        ]
      },
      {
        question: 'В каком году оснавали Санкт-Петербург?',
        rigthAnswerId: 3,
        id: 2,
        answers: [
          {text: '1700', id: 1},
          {text: '1702', id: 2},
          {text: '1703', id: 3},
          {text: '1803', id: 4}
        ]
      }
    ]
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

    if (question.rigthAnswerId === answerId) {
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

  render() {
    return (
      <div className={'Quiz'}>
        <div className={'QuizWrapper'}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.isFinished 
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
