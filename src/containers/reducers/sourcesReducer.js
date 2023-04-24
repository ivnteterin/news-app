import * as actionTypes from '../actions/actionsTypes'

const initialState = {
  sources: [],
  selectedSource: '',
  keyword: '',
  error: null,
}

const sourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SOURCE_SELECTED:
      return {
        ...state,
        NoMoreToLoad: false,
        selectedSource: action.payload,
      }
    case actionTypes.KEYWORD_SELECTED:
      return {
        ...state,
        keyword: action.payload,
      }
    case actionTypes.FETCH_SOURCES_PENDING:
      return {
        ...state,
      }
    case actionTypes.FETCH_SOURCES_SUCCEEDED:
      return {
        ...state,
        sources: action.payload,
        error: '',
      }
    case actionTypes.FETCH_SOURCES_FAILED:
      return {
        ...state,
        sources: [],
        error: action.payload,
      }
    default:
      return state
  }
}

export default sourcesReducer
