import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <>
      <div className="headerContainer">
      <Link to="/" onClick={() => window.location = '/'} style={{textDecoration: 'none', color: 'black'}}>
          <h1 className="header">DAILY BRIEF</h1>
      </Link>
        </div>
    </>
  )
}

