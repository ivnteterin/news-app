import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import selectors from '../../../containers/selectors'

import Button from '../buttons/Button'
import './ErrorHandler.css'

function ErrorHandler(props) {
  return (
    <>
      <div className='error'>
        <div className='error-img'></div>
        <p>{props.error.name}</p>
        {props.error.message}
      </div>
      <p className='error-note'>Sorry, something went terribly wrong :/</p>
      <p className='error-note'>Try again later, or don&apos;t</p>
      <div>
        <Link to={'/'}>
          <Button title='Back to Homepage' />
        </Link>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    error:
      selectors.sourcesErrorSelector(state) ||
      selectors.articleErrorSelector(state) ||
      selectors.newsErrorSelector(state),
  }
}

export default connect(mapStateToProps)(ErrorHandler)

ErrorHandler.propTypes = {
  error: PropTypes.any,
}
