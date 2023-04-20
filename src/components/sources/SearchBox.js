import React from 'react';
import "./SearchBox.css"
import { connect } from 'react-redux';
import {selectKeyword } from '../../containers/store/thunks';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";


function SearchBox(props) {
  const navigate = useNavigate();


  function onSubmitHandler(e) {
    e.preventDefault();
    const searchFilter = document.getElementById("search");
    var searchId = searchFilter.value;
    props.selectKeyword(searchId);
    navigate({
      pathname: '/articles',
      search: `?source=${props.source}&keyword=${searchId}`,
    });
  }

  return (
    <form onSubmit={onSubmitHandler} className='search-box-container'>
      <input className='search-box' id="search" type="text" placeholder={props.selectedKeyword || "Search by title.."} />
      <button className='search-box-submit'>&rarr;</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    source: state.selectedSource,
    selectedKeyword: state.keyword, 
  }
}


const mapDispatchToProps =  dispatch => {
  return {
    selectKeyword: (keyword) => dispatch(selectKeyword(keyword))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchBox);


SearchBox.propTypes = {
  selectKeyword: PropTypes.func,
  selectedKeyword: PropTypes.string,
  source: PropTypes.string,
};