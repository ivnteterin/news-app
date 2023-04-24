import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { rest } from 'msw'
import { act } from 'react-dom/test-utils'
import { setupServer } from 'msw/node'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from '../common/header/Header'
import App from '../../App'

import store from '../../containers/store'
import * as actionCreators from '../../containers/actions/'
import NewsArticle from './NewsArticle'
import NewsList from './NewsList'

window.scrollTo = jest.fn()

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

test('On failure to get single article, error name and message displayed', async () => {
  render(renderRDXComponent('/', <NewsArticle />))
  await act(
    async () =>
      await store.dispatch(
        actionCreators.fetchArticleFailure({
          name: 'Axios Error',
          message: 'Request failed with status code 401',
        }),
      ),
  )
  expect(screen.queryByText('Sorry, something went terribly wrong :/')).toBeInTheDocument()
  expect(screen.queryByText('Request failed with status code 401')).toBeInTheDocument()
  expect(screen.queryByText('Axios Error')).toBeInTheDocument()
})

test('Spinner appears on loading of the single article', async () => {
  render(renderRDXComponent('/', <NewsArticle />))
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})

test('On successful load of single article, "description" property is used if "content" is unavailable', async () => {
  render(renderRDXComponent('/', <NewsArticle />))
  await act(
    async () =>
      await store.dispatch(
        actionCreators.fetchArticleSuccess({
          source: {
            id: null,
            name: 'New York Post',
          },
          author: 'Isabel Keane',
          title: 'title',
          description: 'description',
          url: 'url',
          urlToImage: 'url',
          publishedAt: '2023-04-23T19:28:00Z',
          content: '',
        }),
      ),
  )
  expect(screen.queryByText('description')).toBeInTheDocument()
})

test('On Single Article page "Go back" button is shown on page along with a link to click for full article', async () => {
  render(renderRDXComponent('/', <NewsArticle />))
  expect(screen.getByText('Click here to read full story')).toBeInTheDocument()
  expect(screen.getByText('Go Back')).toBeInTheDocument()
})

test('if no articles match query, "No more articles" message is shown', async () => {
  render(renderRDXComponent('/', <NewsList />))
  await act(async () => await store.dispatch(actionCreators.fetchNewsNoMore()))
  expect(screen.getByText('No more articles')).toBeInTheDocument()
})

test('if no article id match query (i.e. less than 100th), and no error was shown, redirect to 404', async () => {
  render(renderRDXComponent('/', <NewsArticle />))
  await act(async () => await store.dispatch(actionCreators.fetchArticleFailure()))
  expect(screen.getByText('404 not found')).toBeInTheDocument()
})

test('On successful load of single article, "description" property is used if "content" is unavailable', async () => {
  render(renderRDXComponent('/', <NewsArticle />))
  await act(
    async () =>
      await store.dispatch(
        actionCreators.fetchArticleSuccess({
          source: {
            id: null,
            name: 'New York Post',
          },
          author: 'Isabel Keane',
          title: 'title',
          description: 'description',
          url: 'url',
          urlToImage: '',
          publishedAt: '2023-04-23T19:28:00Z',
          content: '',
        }),
      ),
  )

  const articleImage = document.getElementsByTagName('img')[0]
  expect(articleImage).toHaveAttribute('src', 'placeholder.jpg')
})

test('on click of "Read more", the article is shown (with author property)', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  await act(
    async () =>
      await store.dispatch(
        actionCreators.fetchNewsSuccess([
          {
            source: {
              id: null,
              name: 'New York Post',
            },
            author: 'Isabel Keane',
            title:
              'Ukrainian forces establish a foothold along Dnipro River as speculation mounts over spring counteroffensive: report - New York Post ',
            description:
              'Speculation over Ukraine’s long-awaited spring counter-offensive continues to grow as forces began establishing a foothold along the eastern side of the Dnipro River, southwest of Kherson cit…',
            url: 'https://nypost.com/2023/04/23/ukrainian-forces-establish-a-foothold-along-dnipro-river-as-spring-counteroffensive-speculation-mounts/',
            urlToImage: '',
            publishedAt: '2023-04-23T19:28:00Z',
            content:
              'Speculation is growing about Ukraine’s long-awaited spring counter-offensive as its forces on Sunday began establishing a foothold along the eastern side of the Dnipro River, southwest of the key cit… [+3189 chars]',
          },
        ]),
      ),
  )
  fireEvent.click(screen.getByText('Read more'))
  expect(screen.queryByText('Isabel Keane')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Go Back'))
  expect(screen.queryByText('Isabel Keane')).not.toBeInTheDocument()
})
