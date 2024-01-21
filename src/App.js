'use client'
import './App.css'
import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/common/header/Header'
import SourceList from './components/sources/SourceList'
import NewsArticle from './components/news/NewsArticle'
import NewsList from './components/news/NewsList'
import NotFound from './components/404/NotFound'
import Footer from './components/common/footer/Footer'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandler from './components/common/errors/ErrorHandler'

function App() {
  return (
    <HashRouter>
      <div className='App'>
        <Header />
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <Routes>
            {['/', 'articles'].map((path) => (
              <Route
                key={path}
                exact='true'
                path={path}
                element={
                  <>
                    <SourceList />
                    <NewsList />
                  </>
                }
              />
            ))}

            <Route exact path='/articles/:id' element={<NewsArticle />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/404' />} />
          </Routes>
          <Footer />
        </ErrorBoundary>
      </div>
    </HashRouter>
  )
}

export default App
