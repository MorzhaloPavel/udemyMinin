import React, {Component} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishdQuiz from '../../components/FinishdQuiz/FinishdQuiz'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import fetchQuizById from '../../store/actions/quiz'


class Quiz extends Component {
  

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState) [0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuistion]
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
           activeQuistion: this.state.activeQuistion + 1,
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
    return this.props.activeQuistion + 1 === this.props.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuistion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    this.props.fetchQuizById(this.props.match.params.id)
    
  }

  render() {
    
    return (
      <div className={'Quiz'}>
        <div className={'QuizWrapper'}>
          <h1>Ответьте на все вопросы</h1>

          {
            this.props.loading && this.props.quiz
            ? <Loader />
            : this.props.isFinished 
              ? <FinishdQuiz
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRetry={this.retryHandler}
                  onToggle={this.props.onToggle}
              />
              : <ActiveQuiz
                answers={this.props.quiz[this.props.activeQuistion].answers}
                question={this.props.quiz[this.props.activeQuistion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLengt={this.props.quiz.length}
                answerNamber={this.props.activeQuistion + 1}
                state={this.props.answerState}
              />
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuistion: state.quiz.activeQuistion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
