"use client";
import React, {useEffect } from 'react';
import {Link } from 'react-router-dom';
import Button from '../common/buttons/Button';
import "./NewsArticle.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {useParams, useSearchParams, useLocation, } from 'react-router-dom';
import { fetchArticle } from "../../containers/store/thunks"
import placeholder from "./placeholder.jpg"
import Spinner from '../common/spinner/Spinner';
import NotFound from '../404/NotFound';

function NewsArticle(props) {


  let { id } = useParams();
  const { search } = useLocation();

  const [searchParams ] = useSearchParams();
  const historySource = searchParams.get("source");
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  useEffect(()=> {    
    if(isEmpty(props.article)){
      props.fetchArticle(id-1,props.selectedSource || historySource, props.selectedKeyword);}
    },[])

  useEffect(() => {window.scrollTo(0, 0)});   
    
    return (
      <div>{props.loading ? <Spinner /> :
    !isEmpty(props.article) ?
    <div className='card-Container'>
    <img src={props.article.urlToImage ? props.article.urlToImage : placeholder} className="card-wrapper" />
    <div className='article-card'>
      <div className="article-imgContainer">
          <img className='article-img' src={props.article.urlToImage ? props.article.urlToImage : placeholder} alt={props.article.urlToImage} onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src=placeholder;
  }} />
        </div>
        <div className="article-descContainer">
          <h4 className='article-source'>{props.article.source.name}</h4>
          <h1 className='article-heading'>{props.article.title}</h1>
            <h5 className='article-author'>{props.article.author?.replaceAll(/<\/?[^>]+(>|$)/gi, "")}</h5>
          <p className = "article-content">{props.article.content || props.article.description}</p>
            <span className='article-published'>{new Date(props.article.publishedAt).toLocaleDateString([],{year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span>
          <a className="article-readmore" href={props.article.url}>Click here to read full story</a>
      <div><Link to={`/articles${search}`}><Button title="GO Back"/></Link></div>
      </div>
          
      </div>
    </div> : <NotFound />}
</div>
)}

const mapStateToProps = state => {
  return {
    article: state.selectedArticle,
    loading: state.loading,
    selectedSource: state.selectedSource,
    selectedKeyword: state.keyword
  }
}


const mapDispatchToProps =  dispatch => {
  return {
    fetchArticle: (id,source) => dispatch(fetchArticle(id,source))
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(NewsArticle);


NewsArticle.propTypes = {
  article: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.any,
  selectedSource: PropTypes.any,
  selectedKeyword: PropTypes.any,
  fetchArticle: PropTypes.func
}