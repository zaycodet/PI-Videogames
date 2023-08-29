import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Opcional, para manejar acciones asincrónicas
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
