import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
import React from 'react'
import { Provider } from 'react-redux'

import App from './App'

import store from './containers/store'

window.scrollTo = jest.fn()

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

// basic ui tests

test('Header and footer loaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  expect(screen.getByText('DAILY BRIEF')).toBeInTheDocument()
  expect(screen.getByText('ivnteterin')).toBeInTheDocument()
})
