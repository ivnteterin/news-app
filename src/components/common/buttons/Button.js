import React from 'react'
import './Buttons.css'
import PropTypes from 'prop-types'

export default function Button({ title, onClick }) {
  return (
    <div className='loadmore-container'>
      <button className='btn' onClick={onClick}>
        {title}
      </button>
    </div>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
}
