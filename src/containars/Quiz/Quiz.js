import React, {Component} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishdQuiz from '../../components/FinishdQuiz/FinishdQuiz'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'



class Quiz extends Component {
  
  

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
  
  componentWillUnmount() {
    this.props.retryQuiz()
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
                  onRetry={this.props.retryQuiz}
                  onToggle={this.props.onToggle}
              />
              : <ActiveQuiz
                answers={this.props.quiz[this.props.activeQuistion].answers}
                question={this.props.quiz[this.props.activeQuistion].question}
                onAnswerClick={this.props.quizAnswerClick}
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
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () =>  dispatch(retryQuiz())    
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
