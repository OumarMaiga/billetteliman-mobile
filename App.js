import { StyleSheet, Linking } from 'react-native';
import Navigation from './src/navigation/main'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//import reduxStore from "./store/store.js";
import store, { persistor } from "./src/store";
import { useEffect } from 'react';

export default function App() {
  
  //const { store, persistor } = reduxStore();
  
  useEffect(() => {
    const handleDeepLink = (event) => {
      console.log('Deep Link:', event.url);
      // Traitez l'URL ici, par exemple en naviguant vers la bonne page
    };

    Linking.addEventListener('url', handleDeepLink);

    // Vérifiez si l'application a été ouverte via un Deep Link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation/>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
