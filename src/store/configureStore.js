import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from '../middlewares/promiseMiddleware';
import reducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware({ promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR'] }),
)(createStore);

/* eslint-disable global-require */

export default function configureStore(initialState) {
    let store = createStoreWithMiddleware(reducer, initialState);
    return store;
}

/* eslint-enable global-require */

