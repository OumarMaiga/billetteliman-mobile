import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

export default () => {

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  let store = configureStore ({
    reducer: persistedReducer,
  });
  let persistor = persistStore(store);

  return { store, persistor };
};
