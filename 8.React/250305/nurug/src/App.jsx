import { Counter, Login } from "./pages";
import { AppProvider } from "./store/study";
function App() {
  return (
    <AppProvider>
      <Counter/>
      <Login/>
    </AppProvider>
  );
}

export default App;
