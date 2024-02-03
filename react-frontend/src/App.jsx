import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import BlogsPage, {loader as blogsLoader} from "./pages/Blogs";
import BlogDetailsPage from "./pages/BlogDetails";
import BlogNewPage from "./pages/BlogNew";
import BlogEditPage from "./pages/BlogEdit";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blogs",
        element: <BlogsPage />,
        loader: blogsLoader,
      },
      {
        path: "blogs/show/:blogId",
        element: <BlogDetailsPage />,
      },
      {
        path: "blogs/new",
        element: <BlogNewPage />,
      },
      {
        path: "blogs/edit/:blogId",
        element: <BlogEditPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
