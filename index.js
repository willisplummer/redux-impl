const INCREMENT = { type: 'INCREMENT' }
const DECREMENT = { type: 'DECREMENT' }
const LOG = { type: 'LOG' }

const noop = () => null

const counter = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return [state + 1, noop]
  case 'DECREMENT':
    return [state - 1, noop]
  case 'LOG':
    return [state, console.log]
  default:
    return [state, noop]
  }
}

const createStore = (r) => {
  const reducer = r
  let state = reducer(undefined, { type: 'INITIALIZE' })[0]
  let subscriptions = []
  return {
    dispatch: (action) => {
      const [newState, eff] = reducer(state, action)
      state = newState
      eff(state)
      subscriptions.forEach(cb => cb(state))
    },
    getState: () => state,
    subscribe: (callback) => { subscriptions.push(callback) }
  }
}

const store = createStore(counter)
store.dispatch(INCREMENT)
store.dispatch(LOG)
store.dispatch(INCREMENT)
store.dispatch(DECREMENT)
store.dispatch(DECREMENT)
store.dispatch(LOG)

