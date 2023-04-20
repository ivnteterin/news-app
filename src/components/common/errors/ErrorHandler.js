import React from 'react';
import PropTypes from 'prop-types';
import "./ErrorHandler.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../buttons/Button';


function ErrorHandler(props) {
  return (
    <>
    <div className='error'>
    <div className="error-img"></div>
      <p>{props.error.name}</p>{props.error.message}
    </div>
    <p className='error-note'>Sorry, something went terribly wrong :/</p>
    <p className='error-note'>Try again later, or don&apos;t</p>
    <div><Link to={`/`}><Button title="Back to Homepage"/></Link></div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    error: state.error,
  }
}




export default connect(mapStateToProps)(ErrorHandler);





ErrorHandler.propTypes = {
  error: PropTypes.any,
}
