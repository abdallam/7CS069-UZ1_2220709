import {
  json,
  //  useParams,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";
import BlogItem from "../components/BlogItem";
import { toast } from "react-toastify";

function BlogDetailsPage() {
  // const param = useParams();
  const data = useRouteLoaderData("blog-details");
  return <BlogItem blog={data} />;
}

export default BlogDetailsPage;

export async function loader({ request, params }) {
  const credentials = JSON.parse(sessionStorage.getItem("credentials"));
  if (!credentials)
    throw json(
      { message: "Illegal Access: Please login to view the page." },
      { status: 500 }
    );
  else {
    const id = params.blogId;
    const response = await fetch("http://localhost:8000/api/blog/" + id, {
      method: "GET",

      headers: { Authorization: "Bearer " + credentials.token },
    });
    if (!response.ok) {
      throw json({ message: response.statusText }, { status: 500 });
    } else {
      const res = await response.json();
      if (res.error === 1) {
        throw json({ message: res.message }, { status: 500 });
      } else return res.data;
    }
  }
}

