import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DynamicLoader } from "./Loader";

function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route
          path="/"
          element={<DynamicLoader component="./containers/Layout" />}
        >
          <Route
            path="/cat"
            element={<DynamicLoader component="./containers/Cat" />}
          ></Route>

          <Route path="/red">
            <Route
              index
              element={<DynamicLoader component="./containers/Red" />}
            />
            <Route
              path=":id"
              element={<DynamicLoader component="./containers/RedWithParams" />}
            ></Route>
          </Route>

          <Route
            path="/blue"
            element={<DynamicLoader component="./containers/Blue" />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
