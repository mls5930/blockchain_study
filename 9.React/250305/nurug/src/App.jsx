import React from "react";
import {AppProvider} from "./store/study";
import { Counter,Login } from "./pages";
function App () {
    return (
        <AppProvider>
            <Counter/>
            <Login/>
        </AppProvider>
    );
}

export default App;