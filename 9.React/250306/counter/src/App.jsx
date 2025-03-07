import React from 'react';
import './App.css';
import {Counter2} from "./pages/Counter2"
import { AppProvider } from "./store/counterProvider"
function App() {
  return (
    <AppProvider>
      <Counter2/>
    </AppProvider>
  );
}

export default App;
