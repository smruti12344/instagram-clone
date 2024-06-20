import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { BrowserRouter } from 'react-router-dom';
//configure style object for styling body
//global is the void function used to set the value according to them
//body is the key of style
//set on light mode use gray.100 / dark mode
//on light mode color gray.800 / on dark mode color whiteAlpha.900
const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "gray.900")(props), // Corrected 'dark' to 'gray.900' as 'dark' is not a valid color
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// 3. Extend the theme
const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* it allow any component to user router comes from dom  */}
   <BrowserRouter>
    {/* overwite the them */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
   </BrowserRouter>
  </React.StrictMode>,
);
