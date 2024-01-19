import * as actionCreators from './actions/'
import axios from 'axios'
// const apiKey = 'MFsiGXAMofb21jOwoavGufNcy8bzy9F4suAH5c6d'
const apiKey = 'rIAlt6mAiX4Bkrap4M89vsGAfJLvukdk1ufAX45q'

const excludeDomains = '&exclude_domains=archdaily.com,aljazeera.com,facebook.com,instagram.com;'

const fetchArticles = (source = '', keyword = '') => {
  return (dispatch) => {
    dispatch(actionCreators.fetchNewsPending())
    console.log('source', source)
    const sourceQuery = source ? `&domains=${source}` : ''
    const searchQuery = keyword ? `&search=${keyword}` : ''
    // const url = `https://newsapi.org/v2/top-headlines?${sourceQuery}${searchQuery}&pageSize=5&page=1&apiKey=${apiKey}`
    const url = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}${excludeDomains}${sourceQuery}${searchQuery}`
    axios
      .get(url)
      .then((response) => {
        const articles = response.data.data
        console.log(articles)
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
    const sourceQuery = source ? `&domain=${source}` : ''
    const searchQuery = source && keyword ? `&search=${keyword}` : ''
    const url = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}${sourceQuery}${searchQuery}`
    axios
      .get(url)
      .then((response) => {
        const article = response.data.data[id]
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
    const url = `https://api.thenewsapi.com/v1/news/sources?api_token=${apiKey}&language=en`
    dispatch(actionCreators.fetchSourcesPending())
    axios
      .get(url)
      .then((response) => {
        const sources = response.data.data
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
    const sourceQuery = source ? `&domains=${source}` : ''
    const searchQuery = source && keyword ? `search=${keyword}` : ''
    const url = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}${sourceQuery}${searchQuery}&limit=3&page=${page}`

    axios
      .get(url)
      .then((response) => {
        const articles = response.data.data
        if (articles.length < 1) {
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
