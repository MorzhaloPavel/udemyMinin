import React from 'react';
import './AnswersItem.css'

const AnswersItem = props => {
  const cls = ['AnswersItem']

  if (props.state) {
    cls.push([props.state])
  }
  return (
    <li 
    className={cls.join(' ')}
    onClick={() => props.onAnswerClick(props.answer.id)}
    >
      { props.answer.text }
    </li>
  )
}

export default AnswersItem;