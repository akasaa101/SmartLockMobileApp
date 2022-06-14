import * as React from 'react';
import { ImageBackground } from 'react-native';
import Background from './assets/appBackground.png';
import Links from './Components/Routes';

const App = () => {
  return (
    <ImageBackground source={Background} style={{ flex: 1 }}>
      <Links />
    </ImageBackground>
  );
};

export default App;

// The following line is to disable all warnings (Keys, depreciated packages, etc...)
console.disableYellowBox = true;
