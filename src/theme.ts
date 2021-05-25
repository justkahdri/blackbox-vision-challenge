// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      }
    }
  },
  colors: {
    primary: {
      500: "#44D1B3",
    },
    secondary: {
      500: '#E94F4E'
    }
  },
})

export default theme;

// // 3. Pass the new theme to `ChakraProvider`
// <ChakraProvider theme={theme}>
//   <App />
// </ChakraProvider>

// // 4. Now you can use these colors in your components
// function Usage() {
//   return <Box bg="brand.100">Welcome</Box>
// }
