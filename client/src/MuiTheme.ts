import { createTheme } from '@mui/material/styles'

// Create a custom Material-UI theme with dark mode and custom primary and secondary colors
const muiTheme = createTheme({
  palette: {
    // Set the color mode to 'dark'
    mode: 'dark',
    primary: {
      // Define the main primary color
      main: '#426dea', // This color is a shade of blue
    },
    secondary: {
      // Define the main secondary color
      main: '#42eacb', // This color is a shade of green
    },
  },
})

// Export the custom theme for use in the application
export default muiTheme