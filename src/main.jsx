import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "./store/store.js";
import About from "./component/About.jsx";
import { NotFound } from "./component/index.js";
import Register from "./pages/Register.jsx";
import Signin from "./pages/Signin.jsx";
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import Home from "./pages/Home.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/all-post" element={<AllPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
