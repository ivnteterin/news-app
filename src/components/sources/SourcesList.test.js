import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import { setupServer } from 'msw/node'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from '../common/header/Header'
import SourceList from './SourceList'

import store from '../../containers/store'
import * as actionCreators from '../../containers/actions/'

const server = setupServer()

const renderRDXComponent = (path, component) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path={path} element={component} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

// basic ui tests

// sources tests

test('Source list appears on load, but disappears if error fetching', () => {
  render(renderRDXComponent('/', <SourceList />))

  expect(screen.getByText('All sources')).toBeInTheDocument()
  expect(screen.queryByPlaceholderText('Search by title..')).not.toBeInTheDocument()
})

test('if error with fetching source list, list not rendered', async () => {
  render(renderRDXComponent('/', <SourceList />))
  expect(screen.getByText('All sources')).toBeInTheDocument()
  await act(
    async () =>
      await store.dispatch(
        actionCreators.fetchSourcesFailure({
          name: 'Axios Error',
          message: 'Request failed with status code 401',
        }),
      ),
  )
  expect(screen.queryByText('All sources')).not.toBeInTheDocument()
})

test('Search Box appears on after source is chosen', async () => {
  render(renderRDXComponent('/', <SourceList />))
  await act(async () => await store.dispatch(actionCreators.selectedSource('bbc-one')))

  expect(screen.getByRole('textbox')).toBeInTheDocument()
  expect(screen.queryByPlaceholderText('Search by title..')).toBeInTheDocument()
})
