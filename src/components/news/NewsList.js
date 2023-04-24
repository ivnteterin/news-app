import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import selectors from '../../containers/selectors'
import thunks from '../../containers/thunks'

import NewsItem from './NewsItem'
import Spinner from '../common/spinner/Spinner'
import Button from '../common/buttons/Button'
import ErrorHandler from '../common/errors/ErrorHandler'

function NewsList(props) {
  useEffect(() => {
    props.fetchArticles(props.selectedSource, props.selectedKeyword)
  }, [props.selectedSource, props.selectedKeyword])

  function LoadMoreHandler() {
    props.fetchMore(props.page + 1, props.selectedSource, props.selectedKeyword)
  }

  function articleSelectedHandler(id) {
    props.selectArticle(props.articles[id])
  }

  const createFeed = props.articles.map((article, index) => (
    <NewsItem
      key={uuidv4()}
      title={article.title}
      id={index + 1}
      onClick={() => articleSelectedHandler(index)}
      publishedAt={article.publishedAt}
      source={article.source.name}
      description={article.description}
      url={article.url}
      urlToImage={article.urlToImage}
    />
  ))

  return (
    <>
      <div>
        {props.loading ? (
          <Spinner />
        ) : props.error ? (
          <ErrorHandler />
        ) : (
          <>
            {createFeed}
            {props.loadingMore ? (
              <Spinner />
            ) : props.NoMoreToLoad ? (
              <div className='no-more-to-load'>No more articles</div>
            ) : (
              <Button title={'Load more'} onClick={LoadMoreHandler} />
            )}
          </>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    articles: selectors.newsSelector(state),
    loading: selectors.newsLoadingSelector(state),
    error: selectors.newsErrorSelector(state),
    page: selectors.newsPageSelector(state),
    selectedSource: selectors.selectedSourceSelector(state),
    selectedKeyword: selectors.selectedKeywordSelector(state),
    NoMoreToLoad: selectors.noMoreToLoadNewsSelector(state),
    loadingMore: selectors.loadingMoreNewsSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: (source, keyword) => dispatch(thunks.fetchArticles(source, keyword)),
    fetchMore: (page, source, keyword) => dispatch(thunks.fetchMore(page, source, keyword)),
    selectArticle: (article) => dispatch(thunks.selectArticle(article)),
    selectSource: (source) => dispatch(thunks.selectSource(source)),
    selectKeyword: (keyword) => dispatch(thunks.selectKeyword(keyword)),
  }
}

NewsList.propTypes = {
  articles: PropTypes.any,
  NoMoreToLoad: PropTypes.bool,
  page: PropTypes.number,
  loading: PropTypes.bool,
  loadingMore: PropTypes.bool,
  selectedSource: PropTypes.string,
  selectedKeyword: PropTypes.string,
  error: PropTypes.any,

  passArticle: PropTypes.func,
  fetchArticles: PropTypes.func,
  fetchMore: PropTypes.func,
  selectArticle: PropTypes.func,
  selectSource: PropTypes.func,
  selectKeyword: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)
