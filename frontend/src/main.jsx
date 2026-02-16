
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import React from 'react'
import { store } from './redux/store.js'

createRoot(document.getElementById('root')).render(
   
     <BrowserRouter>
      <ChakraProvider>
      <Provider store = {store}>
          <App />
      </Provider>
    </ChakraProvider>
     </BrowserRouter>
    
)
