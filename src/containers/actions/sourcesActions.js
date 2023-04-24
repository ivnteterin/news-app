import * as actionTypes from './actionsTypes'

const selectedKeyword = (keyword) => {
  return {
    type: actionTypes.KEYWORD_SELECTED,
    payload: keyword,
  }
}
const fetchSourcesPending = (articles) => {
  return {
    type: actionTypes.FETCH_SOURCES_PENDING,
    payload: articles,
  }
}
const fetchSourcesSuccess = (sources) => {
  return {
    type: actionTypes.FETCH_SOURCES_SUCCEEDED,
    payload: sources,
  }
}
const fetchSourcesFailure = (error) => {
  return {
    type: actionTypes.FETCH_SOURCES_FAILED,
    payload: error,
  }
}
const selectedSource = (sourceId) => {
  return {
    type: actionTypes.SOURCE_SELECTED,
    payload: sourceId,
  }
}

export {
  selectedSource,
  selectedKeyword,
  fetchSourcesPending,
  fetchSourcesSuccess,
  fetchSourcesFailure,
}
