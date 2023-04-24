import * as actionTypes from '../actions/actionsTypes'

const initialState = {
  articles: [],
  loading: false,
  loadingMore: false,
  NoMoreToLoad: false,
  page: 1,
  error: null,
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS_PENDING:
      return {
        ...state,
        loading: true,
        NoMoreToLoad: false,
        page: 1,
      }
    case actionTypes.FETCH_NEWS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        articles: action.payload,
        error: '',
      }
    case actionTypes.FETCH_NEWS_NOMORE:
      return {
        ...state,
        loading: false,
        NoMoreToLoad: true,
        articles: [],
        error: '',
      }
    case actionTypes.FETCH_NEWS_FAILED:
      return {
        loading: false,
        articles: [],
        error: action.payload,
      }
    case actionTypes.FETCH_MORE_PENDING:
      return {
        ...state,
        page: state.page + 1,
        loadingMore: true,
      }
    case actionTypes.FETCH_MORE_SUCCEEDED:
      return {
        ...state,
        loadingMore: false,
        articles: [...state.articles, ...action.payload],
        error: '',
      }
    case actionTypes.FETCH_MORE_FAILED:
      return {
        ...state,
        loadingMore: false,
        error: action.payload,
      }
    case actionTypes.FETCH_MORE_NOMORE:
      return {
        ...state,
        loadingMore: false,
        NoMoreToLoad: true,
      }

    default:
      return state
  }
}

export default newsReducer
