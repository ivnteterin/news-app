import { combineReducers } from 'redux'
import newsReducer from './newsReducer'
import articleReducer from './articleReducer'
import sourcesReducer from './sourcesReducer'

const rootReducer = combineReducers({
  news: newsReducer,
  article: articleReducer,
  sources: sourcesReducer,
})

export default rootReducer
