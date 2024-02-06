import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import BlogsPage, { loader as blogsLoader } from "./pages/Blogs";
import BlogDetailsPage, {
  loader as blogLoader,
  action as deleteBlogAction,
} from "./pages/BlogDetails";
import BlogNewPage, { action as newBlogAction } from "./pages/BlogNew";
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
        // element: <BlogDetailsPage />,
        id: "blog-details",
        loader: blogLoader,
        children: [
          {
            index: true,
            element: <BlogDetailsPage />,
            action: deleteBlogAction,
          },
          {
            path: "edit",
            element: <BlogEditPage />,
            // action: manipulateEventAction,
          },
        ],
      },
      {
        path: "new",
        element: <BlogNewPage />,
        action: newBlogAction,

      },
      {
        path: "save",
        action: newBlogAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
