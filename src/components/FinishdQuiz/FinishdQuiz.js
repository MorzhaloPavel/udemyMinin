import React from 'react'
import './FinishdQuiz.css'
import Button from "../UI/Button/Button"
import {Link} from 'react-router-dom'


const FinishdQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)

  return (
    <div className={'FinishdQuiz'}>
      <ul>
        { props.quiz.map((quizItem, index) => {
          const cls = [
            props.results[quizItem.id] ==='error' ? 'fa fa-times error' : 'fa fa-check success'
          ]
          return (
            <li 
            key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <i className={cls} />
            </li>
          )
        }
        )}
      </ul>
      <p>Правильно {successCount} из {props.quiz.length}</p>
      <div>
        <Button onClick={props.onRetry} type='primary'>Повторить</Button>
        <Link to='/'>
          <Button onClick={props.onToggle} type='successs'>Перейти в список тестов</Button>
        </Link>
        
      </div>
    </div>
  )

}

export default FinishdQuiz;