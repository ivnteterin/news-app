import * as actionTypes from '../actions/actionsTypes'

const initialState = {
  selectedArticle: {},
  loading: false,
  error: null,
}

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ARTICLE_PENDING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.FETCH_ARTICLE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        selectedArticle: action.payload,
        error: '',
      }
    case actionTypes.FETCH_ARTICLE_FAILED:
      return {
        ...state,
        loading: false,
        selectedArticle: {},
        error: action.payload,
      }

    case actionTypes.ARTICLE_SELECTED:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        selectedArticle: action.payload,
      }

    default:
      return state
  }
}

export default articleReducer
