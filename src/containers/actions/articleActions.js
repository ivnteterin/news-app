import * as actionTypes from './actionsTypes'

const fetchArticlePending = () => {
  return {
    type: actionTypes.FETCH_ARTICLE_PENDING,
  }
}
const fetchArticleSuccess = (article) => {
  return {
    type: actionTypes.FETCH_ARTICLE_SUCCEEDED,
    payload: article,
  }
}
const fetchArticleFailure = (error) => {
  return {
    type: actionTypes.FETCH_ARTICLE_FAILED,
    payload: error,
  }
}

const selectedArticle = (article) => {
  return {
    type: actionTypes.ARTICLE_SELECTED,
    payload: article,
  }
}

export { selectedArticle, fetchArticlePending, fetchArticleSuccess, fetchArticleFailure }
