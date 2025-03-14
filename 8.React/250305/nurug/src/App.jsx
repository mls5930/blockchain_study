import { Counter, Login } from "./pages";
import { AppProvider } from "./store/study";
function App() {
  // 전역 상태에 목매지 말고, 전역 컴포넌트에서 상태를 만들고 하위 컴포넌트들에게 상태를 공유하기 위해서
  return (
    <AppProvider>
      <Counter/>
      <Login/>
    </AppProvider>
  );
}

export default App;
