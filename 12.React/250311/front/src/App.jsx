import './App.css';
import { Counter } from "./pages"
import { AppProvider } from "./store"

function App() {
  return (
    <AppProvider>
      <Counter/>
    </AppProvider>
  );
}

export default App;
