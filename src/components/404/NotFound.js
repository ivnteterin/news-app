import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/buttons/Button';
import "./NotFound.css"
import placeholder from "../news/placeholder.jpg"


export default function NotFound() {

  return (
    <div className='notfound'>
      <img  className="notfound-img" src={placeholder} />
      <div className="notfound-desc">
        <h1>404 not found</h1>
        <p>Sorry, there is nothing here :/</p>
        <div><Link to={`/`}><Button title="Back to Homepage"/></Link></div>
      </div>
    </div>
  )
}
