import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./component/Home.jsx";
import About from "./component/About.jsx";
import { NotFound } from "./component/index.js";
import Register from "./pages/Register.jsx";
import Signin from "./pages/Signin.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
