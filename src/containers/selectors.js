// sources
const sourcesSelector = (store) => store.sources.sources
const sourcesErrorSelector = (store) => store.sources.error
const selectedSourceSelector = (store) => store.sources.selectedSource
const selectedKeywordSelector = (store) => store.sources.keyword

// news

const newsSelector = (store) => store.news.articles
const newsLoadingSelector = (store) => store.news.loading
const newsErrorSelector = (store) => store.news.error
const newsPageSelector = (store) => store.news.page
const noMoreToLoadNewsSelector = (store) => store.news.NoMoreToLoad
const loadingMoreNewsSelector = (store) => store.news.loadingMore

// single article

const selectedArticleSelector = (store) => store.article.selectedArticle
const articleLoadingSelector = (store) => store.article.loading
const articleErrorSelector = (store) => store.article.error

export default {
  sourcesSelector,
  sourcesErrorSelector,
  selectedSourceSelector,
  selectedKeywordSelector,

  newsSelector,
  newsLoadingSelector,
  newsErrorSelector,
  newsPageSelector,
  noMoreToLoadNewsSelector,
  loadingMoreNewsSelector,

  selectedArticleSelector,
  articleLoadingSelector,
  articleErrorSelector,
}
