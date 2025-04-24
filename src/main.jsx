import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { NotFound, ProtectedRoute } from "./component/index.js";
import Register from "./pages/Register.jsx";
import Signin from "./pages/Signin.jsx";
import AllPost from "./pages/AllPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import EditPost from "./pages/EditPost.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Signin /> },
      { path: "signup", element: <Register /> },
      { path: "all-post", element: <AllPost /> },
      { path: "add-post", element: <AddPost /> },
      { path: "post/:id", element: <Post /> },
      { path: "edit-post/:id", element: <EditPost /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
