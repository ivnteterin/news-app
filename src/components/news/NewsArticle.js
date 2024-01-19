import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../common/buttons/Button'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import placeholder from './placeholder.jpg'
import './NewsArticle.css'

import selectors from '../../containers/selectors'
import thunks from '../../containers/thunks'

import Spinner from '../common/spinner/Spinner'
import NotFound from '../404/NotFound'
import ErrorHandler from '../common/errors/ErrorHandler'

function NewsArticle(props) {
  let { id } = useParams()
  const { search } = useLocation()

  const [searchParams] = useSearchParams()
  const historySource = searchParams.get('domain')
  const isEmpty = (obj) => Object.keys(obj).length === 0

  useEffect(() => {
    if (isEmpty(props.article)) {
      props.fetchArticle(id - 1, props.selectedSource || historySource, props.selectedKeyword)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div>
      {props.loading ? (
        <Spinner />
      ) : !isEmpty(props.article) ? (
        <div className='card-Container'>
          <img
            src={props.article.image_url ? props.article.image_url : placeholder}
            className='card-wrapper'
          />
          <div className='article-card'>
            <div className='article-imgContainer'>
              <img
                className='article-img'
                src={props.article.image_url ? props.article.image_url : placeholder}
                alt={props.article.image_url}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = placeholder
                }}
              />
            </div>
            <div className='article-descContainer'>
              <h4 className='article-source'>{props.article.source}</h4>
              <h1 className='article-heading'>{props.article.title}</h1>
              <h5 className='article-author'>
                {props.article.author?.replaceAll(/<\/?[^>]+(>|$)/gi, '')}
              </h5>
              <p className='article-content'>
                {props.article.content || props.article.description}
              </p>
              <span className='article-published'>
                {new Date(props.article.published_at).toLocaleDateString([], {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <a className='article-readmore' href={props.article.url}>
                Click here to read full story
              </a>
              <div>
                <Link to={`/articles${search}`}>
                  <Button title='Go Back' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : props.error ? (
        <ErrorHandler />
      ) : (
        <NotFound />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    article: selectors.selectedArticleSelector(state),
    loading: selectors.articleLoadingSelector(state),
    error: selectors.articleErrorSelector(state),
    selectedSource: selectors.selectedSourceSelector(state),
    selectedKeyword: selectors.selectedKeywordSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticle: (id, source) => dispatch(thunks.fetchArticle(id, source)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsArticle)

NewsArticle.propTypes = {
  article: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.any,
  selectedSource: PropTypes.string,
  selectedKeyword: PropTypes.string,
  fetchArticle: PropTypes.func,
}
