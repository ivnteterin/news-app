import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import placeholder from './placeholder.jpg'
import './NewsItem.css'

function NewsItem({ title, description, source, publishedAt, urlToImage, id, onClick }) {
  const { search } = useLocation()

  return (
    <div className='news-card'>
      <div className='news-imgContainer'>
        <img
          className='news-img'
          src={urlToImage ? urlToImage : placeholder}
          alt={urlToImage}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null // prevents looping
            currentTarget.src = placeholder
          }}
        />
      </div>
      <div className='news-descContainer'>
        <h4 className='news-source'>{source}</h4>
        <h3 className='news-heading'>{title}</h3>
        <p className='news-para'>{description?.replace(/<\/?[^>]+(>|$)/gi, '')}</p>
        <NavLink to={`/articles/${id}${search}`} className='news-readmore' onClick={onClick}>
          Read more
        </NavLink>
        <span className='news-published'>
          {new Date(publishedAt).toLocaleTimeString(['lt-LT'], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  )
}

export default NewsItem

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  source: PropTypes.string,
  publishedAt: PropTypes.string,
  urlToImage: PropTypes.string,
  id: PropTypes.number,
  onClick: PropTypes.func,
}
