import * as actionTypes from './actionsTypes';

const fetchNewsPending = () => { 
  return {
    type: actionTypes.FETCH_NEWS_PENDING,
  }
};
const fetchNewsSuccess = (articles) =>{ 
  return {
    type: actionTypes.FETCH_NEWS_SUCCEEDED,
    payload: articles
  }
};
const fetchNewsFailure = (error) => { 
  return {
    type: actionTypes.FETCH_NEWS_FAILED,
    payload: error
  }
};
const fetchNewsNoMore = () => { 
  return {
    type: actionTypes.FETCH_NEWS_NOMORE,
  }
};

const fetchArticlePending = () => { 
  return {
    type: actionTypes.FETCH_ARTICLE_PENDING,
  }
};
const fetchArticleSuccess = (article) =>{ 
  return {
    type: actionTypes.FETCH_ARTICLE_SUCCEEDED,
    payload: article
  }
};
const fetchArticleFailure = (error) => { 
  return {
    type: actionTypes.FETCH_ARTICLE_FAILED,
    payload: error
  }
};

const selectedArticle = (article) => {
  return {
    type: actionTypes.ARTICLE_SELECTED,
    payload: article,
  }
}

const selectedKeyword = (keyword) => {
  return {
    type: actionTypes.KEYWORD_SELECTED,
    payload: keyword,
  }
}
const fetchMorePending = () => { 
  return {
    type: actionTypes.FETCH_MORE_PENDING,
  }
};
const fetchMoreSuccess = (articles) =>{ 
  return {
    type: actionTypes.FETCH_MORE_SUCCEEDED,
    payload: articles
  }
};
const fetchMoreNoMore = () => { 
  return {
    type: actionTypes.FETCH_MORE_NOMORE,
  }
};
const fetchMoreFailure = (error) => { 
  return {
    type: actionTypes.FETCH_MORE_FAILED,
    payload: error
  }
}
  const fetchSourcesPending = (articles) =>{ 
    return {
      type: actionTypes.FETCH_SOURCES_PENDING,
      payload: articles
    }
  };
const fetchSourcesSuccess = (sources) =>{ 
  return {
    type: actionTypes.FETCH_SOURCES_SUCCEEDED,
    payload: sources
  }
};
const fetchSourcesFailure = (error) => { 
  return {
    type: actionTypes.FETCH_SOURCES_FAILED,
    payload: error
  }
};
const selectedSource = (sourceId) => {
  return {
    type: actionTypes.SOURCE_SELECTED,
    payload: sourceId,
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

  selectedArticle,
  selectedSource,
  selectedKeyword,

  fetchSourcesPending,
  fetchSourcesSuccess,
  fetchSourcesFailure,
  

  fetchArticlePending,
  fetchArticleSuccess,
  fetchArticleFailure,
}