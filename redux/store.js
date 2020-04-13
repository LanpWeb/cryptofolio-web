import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware, { END, runSaga } from 'redux-saga'
import getConfig from 'next/config'
import asyncForEach from 'utils/asyncForEach'

import rootSaga from './saga'
import reducer from './reducer'

const { publicRuntimeConfig } = getConfig()

export const initStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [applyMiddleware(sagaMiddleware)]

  const store =
    typeof window !== 'undefined' &&
    publicRuntimeConfig.env === 'development' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? createStore(
          reducer,
          initialState,
          compose(...middlewares, window.__REDUX_DEVTOOLS_EXTENSION__())
        )
      : createStore(reducer, initialState, compose(...middlewares))

  store.runSaga = () => {
    // Avoid running twice
    if (store.saga) return
    store.saga = sagaMiddleware.run(rootSaga)
  }

  store.execSagaTasks = async (isServer, tasks) => {
    // run saga
    store.runSaga()
    // dispatch saga tasks

    // console.log("start");
    await asyncForEach(tasks, async ({ task, options = {} }) => {
      const saga = runSaga(
        {
          dispatch: store.dispatch,
          getState: store.getState,
        },
        task,
        { payload: options }
      )

      await saga.toPromise()
    })
    // console.log("finish");

    // Stop saga if on server
    if (isServer) {
      if (!store.saga) return
      store.dispatch(END)
      store.saga = null
    }
  }

  // Initial run
  store.runSaga()

  return store
}
