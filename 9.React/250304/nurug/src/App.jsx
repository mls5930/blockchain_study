import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Header} from "./layouts/Header"
import {Login, Dashboard, Counter, Home} from "./pages"
import { AuthProvider } from "./contexts/AuthContext"
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Header/>}></Route>
        </Routes>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/counter" element={<Counter/>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
