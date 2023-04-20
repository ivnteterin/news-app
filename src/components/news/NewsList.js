import React, {  useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "../common/buttons/Buttons.css"
import {fetchArticles, fetchMore, selectArticle, selectKeyword, selectSource } from "../../containers/store/thunks"
import NewsItem from './NewsItem';
import Spinner from "../common/spinner/Spinner"
import Button from '../common/buttons/Button';
import ErrorHandler from '../common/errors/ErrorHandler';

function NewsList(props) {
  console.log('hello world');
  useEffect(()=>
    {props.fetchArticles(props.selectedSource, props.selectedKeyword)}
  ,[props.selectedSource, props.selectedKeyword]) 

  function LoadMoreHandler() {
    props.fetchMore(props.page+1, props.selectedSource,props.selectedKeyword);
  }

  function articleSelectedHandler(id) {
    console.log(id);
    props.selectArticle(props.articles[id]);
  }


  const createFeed = props.articles.map((article,index) =>
  <NewsItem 
    key={index}
    title={article.title}
    id={index+1}
    onClick={()=>articleSelectedHandler(index)}
    publishedAt={article.publishedAt}
    source={article.source.name}
    description={article.description} 
    url={article.url}
    urlToImage = {article.urlToImage}
    />
)

  return (
    <>
    <div>
      {props.loading ?
        <Spinner /> : (props.error ? <ErrorHandler /> : <>
        {createFeed}
        {props.loadingMore ? 
          <Spinner /> : props.NoMoreToLoad ? <div className='no-more-to-load'>No more articles</div> : <Button title={"Load more"} onClick={LoadMoreHandler} />}
      </>)}
    </div>
   
    </>
  )
}


const mapStateToProps = state => {
  return {
    articles: state.articles,
    loading: state.loading,
    error: state.error,
    page: state.page,
    selectedSource: state.selectedSource,
    selectedKeyword: state.keyword,
    NoMoreToLoad: state.NoMoreToLoad,
    loadingMore: state.loadingMore,
  }
}

const mapDispatchToProps =  dispatch => {
  return {
    fetchArticles: (source,keyword) => dispatch(fetchArticles(source,keyword)),
    fetchMore: (page,source,keyword) => dispatch(fetchMore(page, source,keyword)),
    selectArticle: (article) => dispatch(selectArticle(article)),
    selectSource: (source) => dispatch(selectSource(source)),
    selectKeyword: (keyword) => dispatch(selectKeyword(keyword)),
  }
};



NewsList.propTypes = {  
  articles: PropTypes.any,
  NoMoreToLoad: PropTypes.bool,
  page: PropTypes.number,
  loading: PropTypes.any,
  loadingMore: PropTypes.any,
  selectedSource: PropTypes.string,
  selectedKeyword: PropTypes.string,
  error: PropTypes.any,

  passArticle: PropTypes.func,
  fetchArticles: PropTypes.func,
  fetchMore: PropTypes.func,
  selectArticle : PropTypes.func,
  selectSource : PropTypes.func,
  selectKeyword : PropTypes.func,
};

export default connect(mapStateToProps,mapDispatchToProps)(NewsList);