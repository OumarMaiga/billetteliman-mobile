import 'react-native-reanimated';
import Navigation from './src/navigation/main'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from "./src/store";

export default function App() {
    
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation/>
        </PersistGate>
      </Provider>
    // </GestureHandlerRootView> 
  );
}
