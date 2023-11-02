import 'regenerator-runtime/runtime'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import './index.scss'
import './PhaserGame'
import muiTheme from './MuiTheme'
import App from './App'
import store from './stores'

// Find the root HTML element where the React application will be rendered
const container = document.getElementById('root')

// Create a root for the React application and render the components
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    {/* Provide the Redux store to the application */}
    <Provider store={store}>
      {/* Apply the MuiTheme for Material-UI styling */}
      <ThemeProvider theme={muiTheme}>
        {/* Render the main application component */}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
