import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import Router from "./pages/Router"

function App() {
  return(
    <BrowserRouter>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
    
    </BrowserRouter>
  )
}
 

export default App
