import React from 'react'
import Navbar from './components/navbar'
import Home from './Pages/Home'
import Focus from './Pages/Focus'
import Groups from './Pages/Groups'
import Notes from './Pages/Notes'
import SharedNote from './Pages/SharedNote'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './Firebase/AuthContext'

const router = createBrowserRouter([
  { path: '/', element: <><Navbar/><Home/></> },
  { path: '/Focus', element: <><Navbar/><Focus/></> },
  { path: '/Groups', element: <Groups/> },
  { path: '/Notes', element: <><Navbar/><Notes/></> },
  { path: '/shared/:id', element: <SharedNote/> }
])

const App = () => (
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
)

export default App
