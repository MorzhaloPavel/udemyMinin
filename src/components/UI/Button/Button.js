import React from 'react';
import './Button.css'

const Button = props => {
  const cls = [
    'Button',
    [props.type]
  ]

  return (
    <button 
    className={cls.join(' ')}
    onClick={props.onClick}
    disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button;