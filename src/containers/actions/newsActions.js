import * as actionTypes from './actionsTypes'

const fetchNewsPending = () => {
  return {
    type: actionTypes.FETCH_NEWS_PENDING,
  }
}
const fetchNewsSuccess = (articles) => {
  return {
    type: actionTypes.FETCH_NEWS_SUCCEEDED,
    payload: articles,
  }
}
const fetchNewsFailure = (error) => {
  return {
    type: actionTypes.FETCH_NEWS_FAILED,
    payload: error,
  }
}
const fetchNewsNoMore = () => {
  return {
    type: actionTypes.FETCH_NEWS_NOMORE,
  }
}

const fetchMorePending = () => {
  return {
    type: actionTypes.FETCH_MORE_PENDING,
  }
}
const fetchMoreSuccess = (articles) => {
  return {
    type: actionTypes.FETCH_MORE_SUCCEEDED,
    payload: articles,
  }
}
const fetchMoreNoMore = () => {
  return {
    type: actionTypes.FETCH_MORE_NOMORE,
  }
}
const fetchMoreFailure = (error) => {
  return {
    type: actionTypes.FETCH_MORE_FAILED,
    payload: error,
  }
}

export {
  fetchNewsPending,
  fetchNewsSuccess,
  fetchNewsFailure,
  fetchNewsNoMore,
  fetchMorePending,
  fetchMoreSuccess,
  fetchMoreFailure,
  fetchMoreNoMore,
}
