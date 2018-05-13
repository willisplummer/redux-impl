const Increment = { type: 'INCREMENT' }
const Decrement = { type: 'DECREMENT' }

const counter = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

const createStore = (r) => {
  const reducer = r
  let state = reducer(undefined, { type: 'INITIALIZE' })
  let subscriptions = []
  return {
    dispatch: (action) => { state = reducer(state, action); subscriptions.forEach(cb => cb(state)) },
    getState: () => state,
    subscribe: (callback) => { subscriptions.push(callback) }
  }
}

const store = createStore(counter)
store.subscribe(console.log)

store.dispatch(Increment)
store.dispatch(Increment)
store.dispatch(Decrement)
