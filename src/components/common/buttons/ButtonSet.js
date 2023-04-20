import React from 'react';
import Button from './Button';
import "./Buttons.css"

export default function ButtonSet() {
  return (
    <div className='btns'>    
      <Button title="Latest" />
      <Button title="Breaking" />
      <Button title="Technology" />
      <Button title="Sport" />
      <Button title="Hollywood" />
    </div>
  )
}
