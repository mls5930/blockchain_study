import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "./layouts/Header"
import { Login, Dashboard, Counter,CounterUseMemo2, CounterUseCallback } from "./pages"
import { AuthProvider } from './hooks/contexts/AuthContext';

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
          <Route path='/counter2' element={<CounterUseMemo2/>}/>
          <Route path='/counter3' element={<CounterUseCallback/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;