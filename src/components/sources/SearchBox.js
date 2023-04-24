import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './SearchBox.css'

import selectors from '../../containers/selectors'
import thunks from '../../containers/thunks'

function SearchBox(props) {
  const navigate = useNavigate()

  function onSubmitHandler(event) {
    event.preventDefault()
    const searchFilter = document.getElementById('search')
    var searchId = searchFilter.value
    props.selectKeyword(searchId)
    props.source && searchId
      ? navigate({
          pathname: '/articles',
          search: `?source=${props.source}&keyword=${searchId}`,
        })
      : navigate({
          pathname: '/articles',
          search: `?source=${props.source}`,
        })
  }

  return (
    <form onSubmit={onSubmitHandler} className='search-box-container'>
      <input
        className='search-box'
        id='search'
        type='text'
        placeholder={props.selectedKeyword || 'Search by title..'}
      />
      <button className='search-box-submit'>&rarr;</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    source: selectors.selectedSourceSelector(state),
    selectedKeyword: selectors.selectedKeywordSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectKeyword: (keyword) => dispatch(thunks.selectKeyword(keyword)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)

SearchBox.propTypes = {
  selectKeyword: PropTypes.func,
  selectedKeyword: PropTypes.string,
  source: PropTypes.string,
}
