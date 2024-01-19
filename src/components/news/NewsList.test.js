import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { rest } from 'msw'
import { act } from 'react-dom/test-utils'
import { setupServer } from 'msw/node'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from '../common/header/Header'
import NewsList from './NewsList'

import store from '../../containers/store'
import * as actionCreators from '../../containers/actions/'

const server = setupServer(
  rest.get('/123', (req, res, ctx) => {
    return res(ctx.json({ articles: [{ id: 'bbc-one', name: 'BBC One' }] }))
  }),
)

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

// news tests

test('Spinner appears on loading of the news', async () => {
  render(renderRDXComponent('/', <NewsList />))

  expect(screen.getByText('Loading...')).toBeInTheDocument()
})

test('On loading news,the "Load more" button is hidden', async () => {
  render(renderRDXComponent('/', <NewsList />))
  expect(screen.queryByText('Load more')).not.toBeInTheDocument()
})

test('Spinner disappears on loading of the news and articles load with the "Load more" button', async () => {
  render(renderRDXComponent('/', <NewsList />))
  await act(
    async () =>
      await store.dispatch(
        actionCreators.fetchNewsSuccess([
          {
            source: 'abc-news.com',
            title:
              'Ukrainian forces establish a foothold along Dnipro River as speculation mounts over spring counteroffensive: report - New York Post ',
            description: 'Speculation over Ukraine’s long-awaited spring counter-offensive',
            url: 'https://nypost.com/2023/04/23/ukrainian-forces-establish-a-foothold-along-dnipro-river-as-spring-counteroffensive-speculation-mounts/',
            image_url: '',
            published_at: '2023-04-23T19:28:00Z',
            content:
              'Speculation is growing about Ukraine’s long-awaited spring counter-offensive as its forces on Sunday began establishing a foothold along the eastern side of the Dnipro River, southwest of the key cit… [+3189 chars]',
          },
        ]),
      ),
  )

  const articleImage = document.getElementsByTagName('img')[0]
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  expect(screen.queryByText('abc-news.com')).toBeInTheDocument()
  expect(screen.queryByText('2023-04-23 22:28')).toBeInTheDocument()
  expect(screen.queryByText('abc-news.com')).toBeInTheDocument()
  expect(
    screen.queryByText('Speculation over Ukraine’s long-awaited spring counter-offensive'),
  ).toBeInTheDocument()
  expect(articleImage).toHaveAttribute('src', 'placeholder.jpg')
  expect(screen.queryByText('Load more')).toBeInTheDocument()
})

test('On failure to get articles, error name and message displayed', async () => {
  render(renderRDXComponent('/', <NewsList />))
  await act(
    async () =>
      await store.dispatch(
        actionCreators.fetchNewsFailure({
          name: 'Axios Error',
          message: 'Request failed with status code 401',
        }),
      ),
  )
  expect(screen.queryByText('Sorry, something went terribly wrong :/')).toBeInTheDocument()
  expect(screen.queryByText('Request failed with status code 401')).toBeInTheDocument()
  expect(screen.queryByText('Axios Error')).toBeInTheDocument()
})

test('if no articles match query, "No more articles" message is shown', async () => {
  render(renderRDXComponent('/', <NewsList />))
  await act(async () => await store.dispatch(actionCreators.fetchNewsNoMore()))
  expect(screen.getByText('No more articles')).toBeInTheDocument()
})
