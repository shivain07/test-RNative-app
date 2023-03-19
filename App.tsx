import React, { useContext } from 'react';
import { NativeBaseProvider } from 'native-base';
import UserContext, { UserDetailContext } from './src/context/UserContext';
import AppNavigation from './src/navigator/AppNavigation';

function App() {
  const { isLoggedIn } = useContext(UserDetailContext);
  return (
    <NativeBaseProvider>
      <AppNavigation isLoggedIn={isLoggedIn} />
    </NativeBaseProvider>
  );
}

const MainApp = () => {
  return <UserContext>
    <App />
  </UserContext>
}
export default MainApp;