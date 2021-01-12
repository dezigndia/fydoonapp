import {createStore, combineReducers, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {UtilsReducer} from './reducers/utils-reducers';
import {MessengerReducer} from './reducers/messenger-reducers';
import {UserDetailsReducers} from './reducers/user-details-reducers';
import {ContactReducer} from './reducers/contacts-reducers';
import {InboxReducer} from './reducers/inbox-reducer';
import {DetectChangesReducer} from './reducers/detect-changes-reducer';
import {SocketReducer} from './reducers/socket-reducers';

const persistConfig = {
  key: 'testing-1k',
  storage: AsyncStorage,
  timeout: 100000,
  blacklist: ['utils'],
};
const utilsConfig = {
  key: 'utils',
  storage: AsyncStorage,
  blacklist: ['ws'],
};
let middleware = [thunk];

const rootReducer = combineReducers({
  utils: persistReducer(utilsConfig, UtilsReducer),
  messenger: MessengerReducer,
  userDetails: UserDetailsReducers,
  contacts: ContactReducer,
  inbox: InboxReducer,
  detectChanges: DetectChangesReducer,
  socket: SocketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {store, persistor};
//export {store};
