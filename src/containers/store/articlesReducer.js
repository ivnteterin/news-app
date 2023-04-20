import * as actionTypes from './actionsTypes';

const initialState = {
  articles: [],
  sources: [],
  selectedArticle: {},
  loading: false,
  loadingMore: false,
  NoMoreToLoad: false,
  page:1,
  selectedSource:"",
  keyword:"",
  error: null,
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS_PENDING:
      return {
        ...state,
        loading:true, 
        NoMoreToLoad:false,
        page: 1,
      }
    case actionTypes.FETCH_NEWS_SUCCEEDED:
      return {
        ...state,
        loading:false,
        articles: action.payload,
        error:"",
      }
      case actionTypes.FETCH_NEWS_NOMORE:
        return {
          ...state,
          loading:false,
          NoMoreToLoad:true,
          articles: [],
          error:"",
        }
    case actionTypes.FETCH_NEWS_FAILED:

      return {
        loading:false,
        articles:[],
        error:action.payload
      }
      case actionTypes.FETCH_MORE_PENDING:
        return {
          ...state,
          page: state.page + 1,
          loadingMore:true, 
        }
      case actionTypes.FETCH_MORE_SUCCEEDED:
        return {
          ...state,
          loadingMore:false,
          articles: 
            [...state.articles,
            ...action.payload]
          ,
          error:"",
        }
      case actionTypes.FETCH_MORE_FAILED:
  
        return {
          ...state,
          loadingMore:false,
          error:action.payload
        }
      case actionTypes.FETCH_MORE_NOMORE:
  
        return {
          ...state,
          loadingMore: false,
          NoMoreToLoad:true,
        }
        case actionTypes.FETCH_ARTICLE_PENDING:
          return {
            ...state,
            loading:true,
          }
        case actionTypes.FETCH_ARTICLE_SUCCEEDED:
          return {
            ...state,
            loading:false,
            selectedArticle: action.payload,
            error:"",
          }
        case actionTypes.FETCH_ARTICLE_FAILED:
          return {
            ...state,
            loading:false,
            selectedArticle:{},
            error:action.payload
          }  

      case actionTypes.ARTICLE_SELECTED:
        return {
          ...state,
          loading:false,
          loadingMore: false,
          selectedArticle: action.payload
        }
      case actionTypes.SOURCE_SELECTED:
        return {
          ...state,
          NoMoreToLoad:false,
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
          error:"",
        }
      case actionTypes.FETCH_SOURCES_FAILED:
        return {
          ...state,
          sources:[],
          error:action.payload
        }
      default: 
      return state;
  }
}

export default reducer;