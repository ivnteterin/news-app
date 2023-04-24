import * as actionCreators from './actions/'
import axios from 'axios'
const apiKey = 'd20ff8e643db42da97400d4c98934586'
// const apiKey = '75dfb038c571485cb0bf4a6cce256af4'

const fetchArticles = (source = '', keyword = '') => {
  return (dispatch) => {
    dispatch(actionCreators.fetchNewsPending())
    const sourceQuery = source ? `sources=${source}` : 'country=us'
    const searchQuery = keyword ? `&q=${keyword}` : ''
    const url = `https://newsapi.org/v2/top-headlines?${sourceQuery}${searchQuery}&pageSize=5&page=1&apiKey=${apiKey}`

    axios
      .get(url)
      .then((response) => {
        const articles = response.data.articles
        if (articles.length < 1) {
          dispatch(actionCreators.fetchNewsNoMore())
        } else {
          dispatch(actionCreators.fetchNewsSuccess(articles))
        }
      })
      .catch((error) => {
        dispatch(actionCreators.fetchNewsFailure(error))
      })
  }
}

const fetchArticle = (id, source = '', keyword = '') => {
  return (dispatch) => {
    dispatch(actionCreators.fetchArticlePending())
    const sourceQuery = source ? `sources=${source}` : 'country=us'
    const searchQuery = source && keyword ? `&q=${keyword}` : ''
    const url = `https://newsapi.org/v2/top-headlines?${sourceQuery}${searchQuery}&pageSize=100&apiKey=${apiKey}`
    axios
      .get(url)
      .then((response) => {
        const article = response.data.articles[id]
        if (!article) {
          dispatch(actionCreators.fetchArticleFailure(''))
        } else {
          dispatch(actionCreators.fetchArticleSuccess(article))
        }
      })
      .catch((error) => {
        dispatch(actionCreators.fetchArticleFailure(error))
      })
  }
}

const fetchSources = () => {
  return (dispatch) => {
    const url = `https://newsapi.org/v2/top-headlines/sources?&apiKey=${apiKey}`
    dispatch(actionCreators.fetchSourcesPending())
    axios
      .get(url)
      .then((response) => {
        const sources = response.data.sources
        dispatch(actionCreators.fetchSourcesSuccess(sources))
      })
      .catch((error) => {
        dispatch(actionCreators.fetchSourcesFailure(error))
      })
  }
}

const fetchMore = (page, source = '', keyword = '') => {
  return (dispatch) => {
    dispatch(actionCreators.fetchMorePending())
    const sourceQuery = source ? `sources=${source}` : 'country=us'
    const searchQuery = source && keyword ? `q=${keyword}` : ''
    const url = `https://newsapi.org/v2/top-headlines?${sourceQuery}${searchQuery}&pageSize=5&page=${page}&apiKey=${apiKey}`
    axios
      .get(url)
      .then((response) => {
        const articles = response.data.articles
        if (response.data.articles.length < 1) {
          dispatch(actionCreators.fetchMoreNoMore())
        } else {
          dispatch(actionCreators.fetchMoreSuccess(articles))
        }
      })
      .catch((error) => {
        dispatch(actionCreators.fetchMoreFailure(error))
      })
  }
}

const selectArticle = (article) => {
  return (dispatch) => {
    dispatch(actionCreators.selectedArticle(article))
  }
}
const selectSource = (sourceId) => {
  return (dispatch) => {
    dispatch(actionCreators.selectedSource(sourceId))
  }
}
const selectKeyword = (keyword) => {
  return (dispatch) => {
    dispatch(actionCreators.selectedKeyword(keyword))
  }
}

export default {
  fetchArticles,
  fetchArticle,
  fetchMore,
  fetchSources,
  selectArticle,
  selectSource,
  selectKeyword,
}
