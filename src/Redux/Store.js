import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import appReducer from './Reducers';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
        'dashboard',
    ],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, appReducer);

// Redux: Store
const store = createStore(
    persistedReducer,
    applyMiddleware(ReduxThunk)
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {
    store,
    persistor,
};

//export const store = createStore(appReducer, compose(applyMiddleware(ReduxThunk)));
