import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "./layouts/Header"
import { Login, Dashboard, Counter } from "./pages"
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Header/>}/>
        </Routes>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/counter' element={<Counter/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;